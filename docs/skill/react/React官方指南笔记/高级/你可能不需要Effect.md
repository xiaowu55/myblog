## react你可能不需要 Effect

Effect 是 React 范式中的一个逃脱方案。它们让你可以 “逃出” React 并使组件和一些外部系统同步，比如非 React 组件、网络和浏览器 DOM。如果没有涉及到外部系统（例如，你想根据 props 或 state 的变化来更新一个组件的 state），你就不应该使用 Effect。移除不必要的 Effect 可以让你的代码更容易理解，运行得更快，并且更少出错。

### 如何移除不必要的 Effect 

有两种不必使用 Effect 的常见情况：

* **你不必使用 Effect 来转换渲染所需的数据**。
* **你不必使用 Effect 来处理用户事件**。

### 根据 props 或 state 来更新 state 

**如果一个值可以基于现有的 props 或 state 计算得出，[不要把它作为一个 state](https://react.docschina.org/learn/choosing-the-state-structure#avoid-redundant-state)，而是在渲染期间直接计算这个值**。这将使你的代码更快（避免了多余的 “级联” 更新）、更简洁（移除了一些代码）以及更少出错（避免了一些因为不同的 state 变量之间没有正确同步而导致的问题）。

### 缓存昂贵的计算

你可以使用 [`useMemo`](https://react.docschina.org/reference/react/useMemo) Hook 缓存（或者说 [记忆（memoize）](https://en.wikipedia.org/wiki/Memoization)）一个昂贵的计算。你传入 [`useMemo`](https://react.docschina.org/reference/react/useMemo) 的函数会在渲染期间执行，所以它仅适用于 [纯函数](https://react.docschina.org/learn/keeping-components-pure) 场景。

#### 如何判断计算是昂贵的？ 

一般来说只有你创建或循环遍历了成千上万个对象时才会很耗费时间。`useMemo` 不会让 **第一次** 渲染变快。它只是帮助你跳过不必要的更新。

### 当 props 变化时重置所有 state 

通常，当在相同的位置渲染相同的组件时，React 会保留状态。

**通过将 `userId` 作为 `key` 传递给 `Profile` 组件，使  React 将具有不同 `userId` 的两个 `Profile` 组件视为两个不应共享任何状态的不同组件**。(利用了props变化)

### 当 prop 变化时调整部分 state 

有时候，当 prop 变化时，你可能只想重置或调整部分 state ，而不是所有 state。
**虽然这种方式比 Effect 更高效，但大多数组件也不需要它**。无论你怎么做，根据 props 或其他 state 来调整 state 都会使数据流更难理解和调试。总是检查是否可以通过添加 [key 来重置所有 state](https://react.docschina.org/learn/you-might-not-need-an-effect#resetting-all-state-when-a-prop-changes)，或者 [在渲染期间计算所需内容](https://react.docschina.org/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state)。

### 在事件处理函数中共享逻辑 

当你不确定某些代码应该放在 Effect 中还是事件处理函数中时，先自问 为什么 要执行这些代码。Effect **只用来执行那些显示给用户时组件 需要执行** 的代码。

### 发送 POST 请求 

当你决定将某些逻辑放入事件处理函数还是 Effect 中时，你需要回答的主要问题是：从用户的角度来看它是 **怎样的逻辑**。如果这个逻辑是由某个特定的交互引起的，请将它保留在相应的事件处理函数中。如果是由用户在屏幕上 **看到** 组件时引起的，请将它保留在 Effect 中。

### 链式计算 

有时候你可能想链接多个 Effect，每个 Effect 都基于某些 state 来调整其他的 state，更好的做法是：尽可能在渲染期间进行计算，以及在事件处理函数中调整 state

请记住，在事件处理函数内部，[state 的行为类似快照](https://react.docschina.org/learn/state-as-a-snapshot)。例如，即使你调用了 `setRound(round + 1)`，`round` 变量仍然是用户点击按钮时的值。如果你需要使用下一个值进行计算，则需要像这样手动定义它：`const nextRound = round + 1`。

在某些情况下，你 **无法** 在事件处理函数中直接计算出下一个 state。例如，试想一个具有多个下拉菜单的表单，如果下一个下拉菜单的选项取决于前一个下拉菜单选择的值。这时，Effect 链是合适的，因为你需要与网络进行同步。

### 初始化应用 

有些逻辑只需要在应用加载时执行一次。

尽管在实际的生产环境中它可能永远不会被重新挂载，但在所有组件中遵循相同的约束条件可以更容易地移动和复用代码。如果某些逻辑必须在 **每次应用加载时执行一次**，而不是在 **每次组件挂载时执行一次**，可以添加一个顶层变量来记录它是否已经执行过了：

```react
let didInit = false;

function App() {
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      // ✅ 只在每次应用加载时执行一次
      loadDataFromLocalStorage();
      checkAuthToken();
    }
  }, []);
  // ...
}
```

你也可以在模块初始化和应用渲染之前执行它：

```react
if (typeof window !== 'undefined') { // 检测我们是否在浏览器环境

   // ✅ 只在每次应用加载时执行一次

  checkAuthToken();

  loadDataFromLocalStorage();

}



function App() {

  // ...

}
```

### 通知父组件有关 state 变化的信息 

和之前一样，这不太理想。`Toggle` 首先更新它的 state，然后 React 会更新屏幕。然后 React 执行 Effect 中的代码，调用从父组件传入的 `onChange` 函数。现在父组件开始更新它自己的 state，开启另一个渲染流程。更好的方式是在单个流程中完成所有操作。

删除 Effect，并在同一个事件处理函数中更新 **两个** 组件的 state：

```react
function Toggle({ onChange }) {
  const [isOn, setIsOn] = useState(false);

  function updateToggle(nextIsOn) {
    // ✅ 非常好：在触发它们的事件中执行所有更新
    setIsOn(nextIsOn);
    onChange(nextIsOn);
  }

  function handleClick() {
    updateToggle(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      updateToggle(true);
    } else {
      updateToggle(false);
    }
  }

  // ...
}
```

### 将数据传递给父组件 

在 React 中，数据从父组件流向子组件。当你在屏幕上看到了一些错误时，你可以通过一路追踪组件树来寻找错误信息是从哪个组件传递下来的，从而找到传递了错误的 prop 或具有错误的 state 的组件。当子组件在 Effect 中更新其父组件的 state 时，数据流变得非常难以追踪。既然子组件和父组件都需要相同的数据，那么可以让父组件获取那些数据，并将其 **向下传递** 给子组件

### 订阅外部 store 

有时候，你的组件可能需要订阅 React state 之外的一些数据。这些数据可能来自第三方库或内置浏览器 API。由于这些数据可能在 React 无法感知的情况下发变化，你需要在你的组件中手动订阅它们。这经常使用 Effect 来实现，

尽管通常可以使用 Effect 来实现此功能，但 React 为此针对性地提供了一个 Hook 用于订阅外部 store。删除 Effect 并将其替换为调用 [`useSyncExternalStore`](https://react.docschina.org/reference/react/useSyncExternalStore)：

### 获取数据 

许多应用使用 Effect 来发起数据获取请求。