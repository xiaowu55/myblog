## 移除Effect依赖

当编写 Effect 时，linter 会验证是否已经将 Effect 读取的每一个响应式值（如 props 和 state）包含在 Effect 的依赖中。这可以确保 Effect 与组件的 props 和 state 保持同步。不必要的依赖可能会导致 Effect 运行过于频繁，甚至产生无限循环。请按照本指南审查并移除 Effect 中不必要的依赖。

### 依赖应该和代码保持一致 

当你编写 Effect 时，无论这个 Effect 要做什么，你首先要明确其 [生命周期](https://react.docschina.org/learn/lifecycle-of-reactive-effects#the-lifecycle-of-an-effect)：

### 当要移除一个依赖时，请证明它不是一个依赖 

注意，你不能“选择” Effect 的依赖。每个被 Effect 所使用的响应式值，必须在依赖中声明。依赖是由 Effect 的代码决定的

[响应式值](https://react.docschina.org/learn/lifecycle-of-reactive-effects#all-variables-declared-in-the-component-body-are-reactive) 包括 props 以及所有你直接在组件中声明的变量和函数。**移除一个依赖，你需要向 linter 证明其不需要这个依赖**。

### 要改变依赖，请改变代码

你可能已经注意到工作流程中有一个模式：

1. 首先，你 **改变 Effect 的代码** 或响应式值的声明方式。
2. 然后，你采纳 linter 的建议，调整依赖，以 **匹配你所改变的代码**。
3. 如果你对依赖不满意，你可以 **回到第一步**（并再次修改代码）。

最后一部分很重要。**如果你想改变依赖，首先要改变所涉及到的代码**。你可以把依赖看作是 [Effect的代码所依赖的所有响应式值的列表](https://react.docschina.org/learn/lifecycle-of-reactive-effects#react-verifies-that-you-specified-every-reactive-value-as-a-dependency)。你不要 **选择** 把什么放在这个列表上。该列表 **描述了** 代码。要改变依赖，请改变代码。

#### 为什么抑制 linter 对依赖的检查如此危险？ 

抑制 linter 会导致非常不直观的 bug，这将很难发现和修复。**我们建议将依赖性 lint 错误作为一个编译错误来处理。如果你不抑制它，你将永远不会遇到像上面这样的错误**。

### 移除非必需的依赖 

每当你调整 Effect 的依赖以适配代码时，请注意一下当前的依赖。当这些依赖发生变化时，让 Effect 重新运行是否有意义？有时，答案是“不”：

- 你可能想在不同的条件下重新执行 Effect 的 **不同部分**。
- 你可能想只读取某个依赖的 **最新值**，而不是对其变化做出“反应”。
- 依赖可能会因为它的类型是对象或函数而 **无意间** 改变太频繁。

为了找到正确的解决方案，你需要回答关于 Effect 的几个问题。

### 这段代码应该移到事件处理程序中吗？

你应该考虑的第一件事是，这段代码是否应该成为 Effect。特定的交互请将该逻辑直接放到相应的事件处理程序中

### Effect 是否在做几件不相关的事情？

下一个应该问自己的问题是，Effect 是否在做几件不相关的事情。

### 是否在读取一些状态来计算下一个状态？ 

应该将一个 [state 更新函数](https://react.docschina.org/reference/react/useState#updating-state-based-the-previous-state) ，**注意 Effect 现在根本不读取 `messages` 变量**。你只需要传递一个更新函数，比如 `msgs => [...msgs, receivedMessage]`。React [将更新程序函数放入队列](https://react.docschina.org/learn/queueing-a-series-of-state-updates) 并将在下一次渲染期间向其提供 `msgs` 参数。这就是 Effect 本身不再需要依赖 `messages` 的原因。修复后，接收聊天消息将不再使聊天重新连接。

### 你想读取一个值而不对其变化做出“反应”吗？ 

需要将不应该响应式的逻辑从 Effect 中抽取出来。你不希望此 Effect 对 `isMuted` 中的更改做出“反应”。[将这段非响应式逻辑移至 Effect Event 中](https://react.docschina.org/learn/separating-events-from-effects#declaring-an-effect-event)：Effect Events 让你可以将 Effect 分成响应式部分（应该“反应”响应式值，如 `roomId` 及其变化）和非响应式部分（只读取它们的最新值，如 `onMessage` 读取 `isMuted`）。**现在你在 Effect Event 中读取了 `isMuted`，它不需要添加到 Effect 依赖中**。

### 包装来自 props 的事件处理程序 

当组件接收事件处理函数作为 props 时，你可能会遇到类似的问题：假设父组件在每次渲染时都传递了一个 **不同的** `onReceiveMessage` 函数：由于 `onReceiveMessage` 是依赖，它会导致 Effect 在每次父级重新渲染后重新同步。这将导致聊天重新连接。要解决此问题，请用 Effect Event 包裹之后再调用：

#### 分离响应式和非响应式代码 

在此示例中，你希望在每次 `roomId` 更改时记录一次。你希望在每个日志中包含当前的 `notificationCount`，但你 **不** 希望通过更改 `notificationCount` 来触发日志事件。解决方案还是将非响应式代码拆分，将其放到 Effect Event 内：

### 一些响应式值是否无意中改变了？ 

有时，你 **确实** 希望 Effect 对某个值“做出反应”，但该值的变化比你希望的更频繁——并且可能不会从用户的角度反映任何实际变化。例如，假设你在组件中创建了 `options` 对象，然后从 Effect 内部读取该对象：该对象在组件中声明，因此它是 [响应式值](https://react.docschina.org/learn/lifecycle-of-reactive-effects#effects-react-to-reactive-values)。当你在 Effect 中读取这样的响应式值时，你将其声明为依赖。这可确保 Effect 对其更改做出“反应”：

**此问题仅影响对象和函数。在 JavaScript 中，每个新创建的对象和函数都被认为与其他所有对象和函数不同。即使他们的值相同也没关系**！

**对象和函数作为依赖，会使 Effect 比你需要的更频繁地重新同步**。

### 将动态对象和函数移动到 Effect 中 

如果对象依赖于一些可能因重新渲染而改变的响应式值，例如 `roomId` props，那么你不能将它放置于组件 **外部**。你可以在 Effect **内部** 创建它：