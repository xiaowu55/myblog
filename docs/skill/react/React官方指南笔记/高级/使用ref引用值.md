## 使用 ref 引用值

当你希望组件“记住”某些信息，但又不想让这些信息 [触发新的渲染](https://react.docschina.org/learn/render-and-commit) 时，你可以使用 **ref** 。

在你的组件内，调用 `useRef` Hook 并传入你想要引用的初始值作为唯一参数。

```react
const ref = useRef(0);
```

`useRef` 返回一个这样的对象:

```
{ 

  current: 0 // 你向 useRef 传入的值

}
```

你可以用 `ref.current` 属性访问该 ref 的当前值。这个值是有意被设置为可变的，意味着你既可以读取它也可以写入它。就像一个 React 追踪不到的、用来存储组件信息的秘密“口袋”。（这就是让它成为 React 单向数据流的“应急方案”的原因 —— 详见下文！）

请注意，**组件不会在每次递增时重新渲染。** 与 state 一样，React 会在每次重新渲染之间保留 ref。但是，设置 state 会重新渲染组件，更改 ref 不会！

当一条信息用于渲染时，将它保存在 state 中。当一条信息仅被事件处理器需要，并且更改它不需要重新渲染时，使用 ref 可能会更高效。

#### useRef 内部是如何运行的？ 

收起

尽管 `useState` 和 `useRef` 都是由 React 提供的，原则上 `useRef` 可以在 `useState` **的基础上** 实现。 你可以想象在 React 内部，`useRef` 是这样实现的：

```
// React 内部

function useRef(initialValue) {

  const [ref, unused] = useState({ current: initialValue });

  return ref;

}
```

第一次渲染期间，`useRef` 返回 `{ current: initialValue }`。 该对象由 React 存储，因此在下一次渲染期间将返回相同的对象。 请注意，在这个示例中，state 设置函数没有被用到。它是不必要的，因为 `useRef` 总是需要返回相同的对象！

React 提供了一个内置版本的 `useRef`，因为它在实践中很常见。 但是你可以将其视为没有设置函数的常规 state 变量。 如果你熟悉面向对象编程，ref 可能会让你想起实例字段 —— 但是你写的不是 `this.something`，而是 `somethingRef.current`。

### 何时使用 ref 

通常，当你的组件需要“跳出” React 并与外部 API 通信时，你会用到 ref —— 通常是不会影响组件外观的浏览器 API。以下是这些罕见情况中的几个：

- 存储 [timeout ID](https://developer.mozilla.org/docs/Web/API/setTimeout)
- 存储和操作 [DOM 元素](https://developer.mozilla.org/docs/Web/API/Element)，我们将在 [下一页](https://react.docschina.org/learn/manipulating-the-dom-with-refs) 中介绍
- 存储不需要被用来计算 JSX 的其他对象。

如果你的组件需要存储一些值，但不影响渲染逻辑，请选择 ref。

### ref 的最佳实践 

遵循这些原则将使你的组件更具可预测性：

- **将 ref 视为应急方案。** 当你使用外部系统或浏览器 API 时，ref 很有用。如果你很大一部分应用程序逻辑和数据流都依赖于 ref，你可能需要重新考虑你的方法。
- **不要在渲染过程中读取或写入 `ref.current`。** 如果渲染过程中需要某些信息，请使用 [state](https://react.docschina.org/learn/state-a-components-memory) 代替。由于 React 不知道 `ref.current` 何时发生变化，即使在渲染时读取它也会使组件的行为难以预测。（唯一的例外是像 `if (!ref.current) ref.current = new Thing()` 这样的代码，它只在第一次渲染期间设置一次 ref。）

React state 的限制不适用于 ref。例如，state 就像 [每次渲染的快照](https://react.docschina.org/learn/state-as-a-snapshot)，并且 [不会同步更新](https://react.docschina.org/learn/queueing-a-series-of-state-updates)。但是当你改变 ref 的 current 值时，它会立即改变：

```
ref.current = 5;

console.log(ref.current); // 5
```

这是因为 **ref 本身是一个普通的 JavaScript 对象，** 所以它的行为就像对象那样。

当你使用 ref 时，也无需担心 [避免变更](https://react.docschina.org/learn/updating-objects-in-state)。只要你改变的对象不用于渲染，React 就不会关心你对 ref 或其内容做了什么。

### ref 和 DOM 

你可以将 ref 指向任何值。但是，ref 最常见的用法是访问 DOM 元素。例如，如果你想以编程方式聚焦一个输入框，这种用法就会派上用场。当你将 ref 传递给 JSX 中的 `ref` 属性时，比如 `<div ref={myRef}>`，React 会将相应的 DOM 元素放入 `myRef.current` 中。你可以在 [使用 ref 操作 DOM](https://react.docschina.org/learn/manipulating-the-dom-with-refs) 中阅读更多相关信息。