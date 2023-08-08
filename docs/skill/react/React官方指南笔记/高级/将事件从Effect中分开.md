## 将事件从 Effect 中分开

事件处理函数只有在你再次执行同样的交互时才会重新运行。Effect 和事件处理函数不一样，它只有在读取的 props 或 state 值和上一次渲染不一样时才会重新同步。有时你需要这两种行为的混合体：即一个 Effect 只在响应某些值时重新运行，但是在其他值变化时不重新运行。

### 在事件处理函数和 Effect 中做选择

首先让我们回顾一下事件处理函数和 Effect 的区别。

假设你正在实现一个聊天室组件，需求如下：

1. 组件应该自动连接选中的聊天室。
2. 每当你点击“Send”按钮，组件应该在当前聊天界面发送一条消息。

假设你已经实现了这部分代码，但是还没有确定应该放在哪里。你是应该用事件处理函数还是 Effect 呢？每当你需要回答这个问题时，请考虑一下 [为什么代码需要运行](https://react.docschina.org/learn/synchronizing-with-effects#what-are-effects-and-how-are-they-different-from-events)。

### 事件处理函数只在响应特定的交互操作时运行 

事件处理函数是让你处理特定的交互操作的。从用户角度出发，发送消息是 **因为** 他点击了特定的“Send”按钮。

### 每当需要同步，Effect 就会运行 

运行这个代码的 **原因** 不是特定的交互操作。既然用户正在看它并且能够和它交互，组件就要和选中的聊天服务器保持连接。即使聊天室组件显示的是应用的初始屏幕，用户根本还没有执行任何交互，仍然应该需要保持连接。这就是这里用 Effect 的原因：

**无论** 用户是否执行指定交互操作，这段代码都可以保证当前选中的聊天室服务器一直有一个活跃连接。

## 响应式值和响应式逻辑 

直观上，你可以说事件处理函数总是“手动”触发的，例如点击按钮。另一方面， Effect 是自动触发：每当需要保持同步的时候他们就会开始运行和重新运行。

有一个更精确的方式来考虑这个问题。

组件内部声明的 state 和 props 变量被称为  **响应式值**。

- **事件处理函数内部的逻辑是非响应式的**。除非用户又执行了同样的操作（例如点击），否则这段逻辑不会再运行。事件处理函数可以在“不响应”他们变化的情况下读取响应式值。
- **Effect 内部的逻辑是响应式的**。如果 Effect 要读取响应式值，[你必须将它指定为依赖项](https://react.docschina.org/learn/lifecycle-of-reactive-effects#effects-react-to-reactive-values)。如果接下来的重新渲染引起那个值变化，React 就会使用新值重新运行 Effect 内的逻辑。

### 事件处理函数内部的逻辑是非响应式的 

从用户角度出发，**`message` 的变化并不意味着他们想要发送消息**。它只能表明用户正在输入。换句话说，发送消息的逻辑不应该是响应式的。它不应该仅仅因为 响应式值 变化而再次运行。这就是应该把它归入事件处理函数的原因：

事件处理函数是非响应式的，所以 `sendMessage(message)` 只会在用户点击“Send”按钮的时候运行。

### Effect 内部的逻辑是响应式的 

从用户角度出发，**`roomId` 的变化意味着他们的确想要连接到不同的房间**。换句话说，连接房间的逻辑应该是响应式的。你 **需要** 这几行代码和响应式值“保持同步”，并在值不同时再次运行。这就是它被归入 Effect 的原因：

Effect 是响应式的，所以 `createConnection(serverUrl, roomId)` 和 `connection.connect()` 会因为 `roomId` 每个不同的值而运行。Effect 让聊天室连接和当前选中的房间保持了同步。

### 从 Effect 中提取非响应式逻辑 

当你想混合使用响应式逻辑和非响应式逻辑时，事情变得更加棘手。

你需要一个将这个非响应式逻辑和周围响应式 Effect 隔离开来的方法。

### 声明一个 Effect Event 

使用 [`useEffectEvent`](https://react.docschina.org/reference/react/experimental_useEffectEvent) 这个特殊的 Hook 从 Effect 中提取非响应式逻辑：

```react
import { useEffect, useEffectEvent } from 'react';

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
  });
  // ...
```

这里的 `onConnected` 被称为 **Effect Event**。它是 Effect 逻辑的一部分，但是其行为更像事件处理函数。它内部的逻辑不是响应式的，而且能一直“看见”最新的 props 和 state。

现在你可以在 Effect 内部调用 `onConnected` Effect Event：

```react
function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      onConnected();
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ 声明所有依赖项
  // ...
```

这个方法解决了问题。注意你必须从 Effect 依赖项中 **移除** `onConnected`。**Effect Event 是非响应式的并且必须从依赖项中删除**。

### Effect Event 的局限性 

Effect Event 的局限性在于你如何使用他们：

- **只在 Effect 内部调用他们**。
- **永远不要把他们传给其他的组件或者 Hook**。