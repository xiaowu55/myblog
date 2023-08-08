## 响应式 Effect 的生命周期

Effect 与组件有不同的生命周期。组件可以挂载、更新或卸载。Effect 只能做两件事：开始同步某些东西，然后停止同步它。如果 Effect 依赖于随时间变化的 props 和 state，这个循环可能会发生多次。React 提供了代码检查规则来检查是否正确地指定了 Effect 的依赖项，这能够使 Effect 与最新的 props 和 state 保持同步。

### Effect 的生命周期 

每个 React 组件都经历相同的生命周期：

- 当组件被添加到屏幕上时，它会进行组件的 **挂载**。
- 当组件接收到新的 props 或 state 时，通常是作为对交互的响应，它会进行组件的 **更新**。
- 当组件从屏幕上移除时，它会进行组件的 **卸载**。

**这是一种很好的思考组件的方式，但并不适用于 Effect**。相反，尝试从组件生命周期中跳脱出来，独立思考 Effect。Effect 描述了如何将外部系统与当前的 props 和 state 同步。随着代码的变化，同步的频率可能会增加或减少

你可能会直观地认为当组件挂载时 React 会 **开始同步**，而当组件卸载时会 **停止同步**。然而，事情并没有这么简单！有时，在组件保持挂载状态的同时，可能还需要 **多次开始和停止同步**。

有些 Effect 根本不返回清理函数。[在大多数情况下](https://react.docschina.org/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development)，可能希望返回一个清理函数，但如果没有返回，React 将表现得好像返回了一个空的清理函数。

### 为什么同步可能需要多次进行 

### 从 Effect 的角度思考 

让我们总结一下从 `ChatRoom` 组件的角度所发生的一切：

1. `ChatRoom` 组件挂载，`roomId` 设置为 `"general"`
2. `ChatRoom` 组件更新，`roomId` 设置为 `"travel"`
3. `ChatRoom` 组件更新，`roomId` 设置为 `"music"`
4. `ChatRoom` 组件卸载

在组件生命周期的每个阶段，Effect 执行了不同的操作：

1. Effect 连接到了 `"general"` 聊天室
2. Effect 断开了与 `"general"` 聊天室的连接，并连接到了 `"travel"` 聊天室
3. Effect 断开了与 `"travel"` 聊天室的连接，并连接到了 `"music"` 聊天室
4. Effect 断开了与 `"music"` 聊天室的连接

现在让我们从 Effect 本身的角度来思考所发生的事情：

```react
  useEffect(() => {
    // Effect 连接到了通过 roomId 指定的聊天室...
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      // ...直到它断开连接
      connection.disconnect();
    };
  }, [roomId]);
```

这段代码的结构可能会将所发生的事情看作是一系列不重叠的时间段：

1. Effect 连接到了 `"general"` 聊天室（直到断开连接）
2. Effect 连接到了 `"travel"` 聊天室（直到断开连接）
3. Effect 连接到了 `"music"` 聊天室（直到断开连接）

之前，你是从组件的角度思考的。当你从组件的角度思考时，很容易将 Effect 视为在特定时间点触发的“回调函数”或“生命周期事件”，例如“渲染后”或“卸载前”。这种思维方式很快变得复杂，所以最好避免使用。

**相反，始终专注于单个启动/停止周期。无论组件是挂载、更新还是卸载，都不应该有影响。只需要描述如何开始同步和如何停止。如果做得好，Effect 将能够在需要时始终具备启动和停止的弹性**。

这可能会让你想起当编写创建 JSX 的渲染逻辑时，并不考虑组件是挂载还是更新。描述的是应该显示在屏幕上的内容，而 React 会 [解决其余的问题](https://react.docschina.org/learn/reacting-to-input-with-state)。

### React 如何验证 Effect 可以重新进行同步 

https://react.docschina.org/learn/lifecycle-of-reactive-effects#how-react-verifies-that-your-effect-can-re-synchronize

### React 如何知道需要重新进行 Effect 的同步 

你可能想知道 React 是如何知道在 `roomId` 更改后需要重新同步 Effect。这是因为 **你告诉了 React** 它的代码依赖于 `roomId`，通过将其包含在 [依赖列表](https://react.docschina.org/learn/synchronizing-with-effects#step-2-specify-the-effect-dependencies) 中。

下面是它的工作原理：

1. 你知道 `roomId` 是 prop，这意味着它可能会随着时间的推移发生变化。
2. 你知道 Effect 读取了 `roomId`（因此其逻辑依赖于可能会在之后发生变化的值）。
3. 这就是为什么你将其指定为 Effect 的依赖项（以便在 `roomId` 发生变化时重新进行同步）。

每次在组件重新渲染后，React 都会查看传递的依赖项数组。如果数组中的任何值与上一次渲染时在相同位置传递的值不同，React 将重新同步 Effect。

例如，如果在初始渲染时传递了 `["general"]`，然后在下一次渲染时传递了 `["travel"]`，React 将比较 `"general"` 和 `"travel"`。这些是不同的值（使用 [`Object.is`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 进行比较），因此 React 将重新同步 Effect。另一方面，如果组件重新渲染但 `roomId` 没有发生变化，Effect 将继续连接到相同的房间。

### 每个 Effect 表示一个独立的同步过程。 

抵制将与 Effect 无关的逻辑添加到已经编写的 Effect 中，仅仅因为这些逻辑需要与 Effect 同时运行。**代码中的每个 Effect 应该代表一个独立的同步过程。.**

删除一个 Effect 不会影响另一个 Effect 的逻辑。这表明它们同步不同的内容，因此将它们拆分开是有意义的。另一方面，如果将一个内聚的逻辑拆分成多个独立的 Effects，代码可能会看起来更加“清晰”，但 [维护起来会更加困难](https://react.docschina.org/learn/you-might-not-need-an-effect#chains-of-computations)。这就是为什么你应该考虑这些过程是相同还是独立的，而不是只考虑代码是否看起来更整洁。

## Effect 会“响应”于响应式值 

**在组件内部声明的 props、state 和其他值都是 响应式 的，因为它们是在渲染过程中计算的，并参与了 React 的数据流**。

### 没有依赖项的 Effect 的含义 

从组件的角度来看，空的 `[]` 依赖数组意味着这个 Effect 仅在组件挂载时连接到聊天室，并在组件卸载时断开连接。（请记住，在开发环境中，React 仍会 [额外执行一次](https://react.docschina.org/learn/lifecycle-of-reactive-effects#how-react-verifies-that-your-effect-can-re-synchronize) 来对逻辑进行压力测试。）

然而，如果你 [从 Effect 的角度思考](https://react.docschina.org/learn/lifecycle-of-reactive-effects#thinking-from-the-effects-perspective)，根本不需要考虑挂载和卸载。重要的是，你已经指定了 Effect 如何开始和停止同步。

### 在组件主体中声明的所有变量都是响应式的 

Props 和 state 并不是唯一的响应式值。从它们计算出的值也是响应式的。如果 props 或 state 发生变化，组件将重新渲染，从中计算出的值也会随之改变。这就是为什么 Effect 使用的组件主体中的所有变量都应该在依赖列表中。

**组件内部的所有值（包括 props、state 和组件体内的变量）都是响应式的。任何响应式值都可以在重新渲染时发生变化，所以需要将响应式值包括在 Effect 的依赖项中**

#### 全局变量或可变值可以作为依赖项吗？ 

可变值（包括全局变量）不是响应式的。

例如，像 [`location.pathname`](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/pathname) 这样的可变值不能作为依赖项。它是可变的，因此可以在 React 渲染数据流之外的任何时间发生变化。**另外，像 [`ref.current`](https://react.docschina.org/reference/react/useRef#reference) 或从中读取的值也不能作为依赖项。`useRef` 返回的 ref 对象本身可以作为依赖项**，但其 `current` 属性是有意可变的。它允许 [跟踪某些值而不触发重新渲染](https://react.docschina.org/learn/referencing-values-with-refs)。但由于更改它不会触发重新渲染，它不是响应式值，React 不会知道在其更改时重新运行 Effect。

### React 会验证是否将每个响应式值都指定为了依赖项 

在某些情况下，React **知道** 一个值永远不会改变，即使它在组件内部声明。例如，从 `useState` 返回的 `set` 函数和从 `useRef` 返回的 ref 对象是 **稳定的** ——它们保证在重新渲染时不会改变。稳定值不是响应式的，因此可以从列表中省略它们。包括它们是允许的：它们不会改变，所以无关紧要。

### 当你不想进行重新同步时该怎么办 

可以通过向检查工具“证明”这些值不是响应式值，即它们 **不会** 因为重新渲染而改变。也可以将它们 **移动到 Effect 内部**。它们不是在渲染过程中计算的，因此它们不是响应式的：