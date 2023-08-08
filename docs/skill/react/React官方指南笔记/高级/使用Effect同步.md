## 使用Effect同步

有些组件需要与外部系统同步。例如，你可能希望根据 React state 控制非 React 组件、设置服务器连接或在组件出现在屏幕上时发送分析日志。Effects 会在渲染后运行一些代码，以便可以将组件与 React 之外的某些系统同步。

### 什么是 Effect，它与事件（event）有何不同？ 

在谈到 Effect 之前，你需要熟悉 React 组件中的两种逻辑类型：

- **渲染逻辑代码**（在 [描述 UI](https://react.docschina.org/learn/describing-the-ui) 中有介绍）位于组件的顶层。你将在这里接收 props 和 state，并对它们进行转换，最终返回你想在屏幕上看到的 JSX。[渲染的代码必须是纯粹的](https://react.docschina.org/learn/keeping-components-pure)——就像数学公式一样，它只应该“计算”结果，而不做其他任何事情。
- **事件处理程序**（在 [添加交互性](https://react.docschina.org/learn/adding-interactivity) 中介绍）是嵌套在组件内部的函数，而不仅仅是计算函数。事件处理程序可能会更新输入字段、提交 HTTP POST 请求以购买产品，或者将用户导航到另一个屏幕。事件处理程序包含由特定用户操作（例如按钮点击或键入）引起的“副作用”（它们改变了程序的状态）。

有时这还不够。考虑一个 `ChatRoom` 组件，它在屏幕上可见时必须连接到聊天服务器。连接到服务器不是一个纯计算（它包含副作用），因此它不能在渲染过程中发生。然而，并没有一个特定的事件（比如点击）导致 `ChatRoom` 被显示。

**Effect 允许你指定由渲染本身，而不是特定事件引起的副作用**。在聊天中发送消息是一个“事件”，因为它直接由用户点击特定按钮引起。然而，建立服务器连接是 Effect，因为它应该发生无论哪种交互导致组件出现。Effect 在屏幕更新后的 [提交阶段](https://react.docschina.org/learn/render-and-commit) 运行。这是一个很好的时机，可以将 React 组件与某个外部系统（如网络或第三方库）同步。

### 如何编写 Effect

编写Effect需要遵守以下三个规则：

1. **声明Effect**。默认情况下，Effect会在每次渲染后都会执行。
2. **指定Effect依赖**。大多数 Effect 应该按需执行，而不是在每次渲染后都执行。
3. **必要时添加清理（cleanup）函数**。有时 Effect 需要指定如何停止、撤销，或者清除它的效果。每次重新执行 Effect 之前，React 都会调用清理函数；组件被卸载时，也会调用清理函数。

一般来说，Effect 会在  **每次** 渲染后执行，**而以下代码会陷入死循环中**：

```react
const [count, setCount] = useState(0);

useEffect(() => {

  setCount(count + 1);

});
```

每次渲染结束都会执行 Effect；而更新 state 会触发重新渲染。但是新一轮渲染时又会再次执行 Effect，然后 Effect 再次更新 state……如此周而复始，从而陷入死循环。

Effect 通常应该使组件与 **外部** 系统保持同步。如果没有外部系统，你只想根据其他状态调整一些状态，那么 [你也许不需要 Effect](https://react.docschina.org/learn/you-might-not-need-an-effect)。

### 如何处理在开发环境中 Effect 执行两次？ 

在开发环境中，React 有意重复挂载你的组件，以查找像上面示例中的错误。**正确的态度是“如何修复 Effect 以便它在重复挂在后能正常工作”，而不是“如何只运行一次 Effect”**。

通常的解决办法是实现清理函数。清理函数应该停止或撤销 Effect 正在执行的任何操作。简单来说，用户不应该感受到 Effect 只执行一次（如在生产环境中）和执行“挂载 → 清理 → 挂载”过程（如在开发环境中）之间的差异。

### 控制非 React 组件 

有时需要添加不是使用 React 编写的 UI 小部件。请注意，在这种情况下不需要清理。在开发环境中，React 会调用 Effect 两次，但这两次挂载时依赖项 `setZoomLevel` 都是相同的，所以会跳过执行第二次挂载时的 Effect。开发环境中它可能会稍微慢一些，但这问题不大，因为它在生产中不会进行不必要的重复挂载。

### 订阅事件 

如果 Effect 订阅了某些事件，清理函数应该退订这些事件：

### 触发动画

如果 Effect 对某些内容加入了动画，清理函数应将动画重置：

### 获取数据 

如果 Effect 将会获取数据，清理函数应该要么 [中止该数据获取操作](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController)，要么忽略其结果：

```react
useEffect(() => {
  let ignore = false;

  async function startFetching() {
    const json = await fetchTodos(userId);
    if (!ignore) {
      setTodos(json);
    }
  }

  startFetching();

  return () => {
    ignore = true;
  };
}, [userId]);
```

我们无法撤消已经发生的网络请求，但是清理函数应当确保获取数据的过程以及获取到的结果不会继续影响程序运行。如果 `userId` 从 `'Alice'` 变为 `'Bob'`，那么请确保 `'Alice'` 响应数据被忽略，即使它在 `'Bob'` 之后到达。

**在开发环境中，浏览器调试工具的“网络”选项卡中会出现两个 fetch 请求**。这是正常的。使用上述方法，第一个 Effect 将立即被清理，而 `ignore` 将被设置为 `true`。因此，即使有额外的请求，由于有 `if (!ignore)` 判断检查，也不会影响程序状态。

**在生产环境中，只会显示发送了一条获取请求**。如果开发环境中，第二次请求给你造成了困扰，最好的方法是使用一种可以删除重复请求、并缓存请求响应的解决方案：

```
function TodoList() {

  const todos = useSomeDataLibrary(`/api/user/${userId}/todos`);

  // ...
```

这不仅可以提高开发体验，还可以让你的应用程序速度更快。例如，用户按下按钮时，如果数据已经被缓存了，那么就不必再次等待加载。你可以自己构建这样的缓存，也可以使用很多在 Effect 中手动加载数据的替代方法。

### 发送分析报告 

**不过我们建议不必修改此处代码**，与前面的示例一样，从用户的角度来看，运行一次和运行两次之间不会 **感知** 到行为差异。从实际的角度来看，`logVisit` 不应该在开发环境中做任何影响生产事情。由于每次保存代码文件时都会重新挂载组件，因此在开发环境中会额外记录访问次数。

### 初始化应用时不需要使用 Effect 的情形 

某些逻辑应该只在应用程序启动时运行一次。比如，验证登陆状态和加载本地程序数据。你可以将其放在组件之外：

```react
if (typeof window !== 'undefined') { // 检查是否在浏览器中运行

  checkAuthToken();

  loadDataFromLocalStorage();

}



function App() {

  // ……

}
```

这保证了这种逻辑在浏览器加载页面后只运行一次。

### 不要在 Effect 中执行购买商品一类的操作 

有时，即使编写了一个清理函数，也不能避免执行两次 Effect。例如，Effect 包含会发送 POST 请求以执行购买操作：

```
useEffect(() => {

  // 🔴 错误：此处的 Effect 会在开发环境中执行两次，这在代码中是有问题的。

  fetch('/api/buy', { method: 'POST' });

}, []);
```

一方面，开发环境下，Effect 会执行两次，这意味着购买操作执行了两次，但是这并非是预期的结果，所以不应该把这个业务逻辑放在 Effect 中。另一方面，如果用户转到另一个页面，然后按“后退”按钮回到了这个界面，该怎么办？Effect 会随着组件再次挂载而再次执行。所以，当用户重新访问某个页面时，不应当执行购买操作；当只有用户点击“购买”按钮时，才执行购买操作。

因此，“购买”的操作不应由组件的挂载、渲染引起的；它是由特定的交互作用引起的，它应该只在用户按下按钮时运行。因此，**它不应该写在 Effect 中，应当把 `/api/buy` 请求操作移动到购买按钮事件处理程序中**：

```
  function handleClick() {

    // ✅ 购买商品应当在事件中执行，因为这是由特定的操作引起的。

    fetch('/api/buy', { method: 'POST' });

  }
```

**这个例子说明如果重新挂载破坏了程序的逻辑，则通常含有未被发现的错误**。从用户的角度来看，访问这个页面的效果，与访问该页面时单击和页面中其他链接并按下后退没有什么不同。React 通过在开发环境中重复挂载组件来验证组件是否遵守此原则。

#### 每一轮渲染都有自己的 Effect 

你可以将 `useEffect` 认为其将一段行为“附加”到渲染输出。考虑这种情况：

```
export default function ChatRoom({ roomId }) {

  useEffect(() => {

    const connection = createConnection(roomId);

    connection.connect();

    return () => connection.disconnect();

  }, [roomId]);



  return <h1>欢迎来到 {roomId}！</h1>;

}
```

让我们看看当用户在应用程序中切换页面时到底发生了什么。

#### 初始渲染 

用户访问 `<ChatRoom roomId="general" />`，在这里让我们 [假设](https://react.docschina.org/learn/state-as-a-snapshot#rendering-takes-a-snapshot-in-time) `roomId` 的值为 `'general'` ：

```
  // 首次渲染时的 JSX（roomId 为 "general"）

  return <h1>欢迎来到 general！</h1>;
```

**Effect 也是渲染输出的一部分**。首次渲染的 Effect 变为：

```
  //首先渲染时的 Effect（roomId 为 "general"）

  () => {

    const connection = createConnection('general');

    connection.connect();

    return () => connection.disconnect();

  },

  // 首次渲染时的依赖项（roomId 为 "general"）

  ['general']
```

React 将会执行用于连接到 `'general'` 聊天室的 Effect。

#### 依赖项相同时的重新渲染 

让我们探讨下 `<ChatRoom roomId="general" />` 的重复渲染。JSX 的输出结果仍然相同：

```
  // 第二次渲染时的 JSX（roomId 为 "general"）

  return <h1>Welcome to general!</h1>;
```

React 看到渲染输出没有改变，所以它不会更新 DOM 。

第二次渲染的 Effect 如下所示：

```
  // 第二次渲染时的 Effect（roomId 为 "general"）

  () => {

    const connection = createConnection('general');

    connection.connect();

    return () => connection.disconnect();

  },

  // 第二次渲染时的依赖项（roomId 为 "general"）

  ['general']
```

React 将第二次渲染时的 `['general']` 与第一次渲染时的 `['general']` 进行比较。**因为所有的依赖项都是相同的，React 会忽略第二次渲染时的 Effect**。所以此时 Effect 不会被调用。

#### 依赖项不同时的重新渲染 

接下来，用户开始访问 `<ChatRoom roomId="travel" />`。注意这里 `roomId` 的属性值改为了 `'travel'`，返回的是不同的 JSX 输出结果：

```
  // 第三次渲染时的 JSX（roomId 为 "travel"）

  return <h1>欢迎来到 travel！</h1>;
```

这时的 React 会更新 DOM ，将 `"欢迎来到 general"` 更新为 `"欢迎来到 travel"`。

第三次渲染的 Effect 如下所示：

```
  // 第三次渲染时的 Effect（roomId 为 "travel"）

  () => {

    const connection = createConnection('travel');

    connection.connect();

    return () => connection.disconnect();

  },

  // 第三次渲染时的依赖项（roomId 为 "travel"）

  ['travel']
```

React 将第三次渲染时的 `['travel']` 与第二次渲染时的 `['general']` 相互比较。会发现依赖项不同：`Object.is('travel', 'general')` 为 `false`：所以这次的 Effect 不能跳过。

**在 React 执行第三次渲染的 Effect 之前，它需要清理最近渲染的 Effect**。第二次渲染的 Effect 被跳过了。所以 React 需要清理第一次渲染时的 Effect。如果你回看第一次渲染的 Effect，你可以看到第一次渲染时的清理函数需要执行的内容，是在 `createConnection('general')` 所创建的连接上调用 `disconnect()`。也就是从 `'general'` 聊天室断开连接。

之后，React 执行第三次渲染的 Effect。它连接到 `'travel'` 聊天室。

#### 组件卸载 

最后，假设用户离开了当前页面，`ChatRoom` 组件将被卸载时，React 会执行最近的 Effect 的清理函数，也就是第三次渲染时 Effect 的清理函数。第三次渲染后再清理时，清理函数破坏了 `createConnection('travel')` 方法创建的连接。因此，该应用程序与 `travel` 房间断开了连接。

#### 仅开发环境下的行为 

在 [严格模式](https://react.docschina.org/reference/react/StrictMode) 下，React 在每次卸载组件后都会重新挂载组件（但是组件的 state 与 创建的 DOM 都会被保留）。[它可以帮助你找出需要添加清理函数的 Effect](https://react.docschina.org/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed)，以及早暴露出像条件竞争那样的问题。此外，每当你在开发环境中保存更新代码文件时，React 也会重新挂载 Effect，不过这两种行为都仅限于开发环境。