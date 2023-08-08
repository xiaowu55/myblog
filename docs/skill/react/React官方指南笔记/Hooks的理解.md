## Hooks的理解

### 何为Hooks

"hooks" 直译是 “钩子”。通常指

> 系统运行到某一时期时，会调用被注册到该时机的回调函数。

#### 前端中的Hooks

在react@16之后，引入了一系列以“use”作为开头的方法

**Hook** 让你可以在组件中使用不同的 React 功能。这是react的官方文档的定义

React官方内置hooks可以分类为

* 状态Hook
	* [`useState`](https://react.docschina.org/reference/react/useState) 声明了一个你可以直接更新的 state 变量。
	* [`useReducer`](https://react.docschina.org/reference/react/useReducer) 声明了一个带有更新逻辑的 state 变量在一个 [reducer 函数](https://react.docschina.org/learn/extracting-state-logic-into-a-reducer) 中。
* Context Hook
	* [`useContext`](https://react.docschina.org/reference/react/useContext) 读取并订阅一个 context。
* Ref Hook
	* [`useRef`](https://react.docschina.org/reference/react/useRef) 声明一个 ref。你可以在其中保存任何值，但最常见的是它用来保存一个 DOM 节点。
	* [`useImperativeHandle`](https://react.docschina.org/reference/react/useImperativeHandle) 可以让你自定义组件所暴露的 ref。一般很少使用。
* Effect Hook
	* [`useEffect`](https://react.docschina.org/reference/react/useEffect) 将一个组件连接到外部系统。
	* [`useLayoutEffect`](https://react.docschina.org/reference/react/useLayoutEffect) 在浏览器重新绘制屏幕前执行。在这里，你可以测量布局。
	* [`useInsertionEffect`](https://react.docschina.org/reference/react/useInsertionEffect) 在 React 对 DOM 进行更改之前触发。在这里，库可以插入动态的 CSS。
* 性能Hook
	* [`useMemo`](https://react.docschina.org/reference/react/useMemo) 让你缓存一个代价非常高的计算结果。
	* [`useCallback`](https://react.docschina.org/reference/react/useCallback) 让你在将一个函数定义传递给一个优化的组件之前缓存它。
	* [`useTransition`](https://react.docschina.org/reference/react/useTransition) 让你把一个状态转换标记为非阻塞，并允许其他更新中断它。
	* [`useDeferredValue`](https://react.docschina.org/reference/react/useDeferredValue) 让你推迟更新用户界面的一个非关键部分，让其他部分更新。
* 其他Hook
	* [`useDebugValue`](https://react.docschina.org/reference/react/useDebugValue) 允许你在 React 开发者工具中为自定义 Hook 添加一个标签。
	* [`useId`](https://react.docschina.org/reference/react/useId) 允许组件绑定一个唯一 ID。通常与可访问性 API 一起使用。
	* [`useSyncExternalStore`](https://react.docschina.org/reference/react/useSyncExternalStore) 允许一个组件订阅一个外部 store。
* 自定义Hook

在React中，每个被命名为use+大写字母的函数就是一个hook，只能在函数组件中调用，只能在最顶层使用

### 为什么我们需要使用Hook

#### 没有Hook之前的日子

在拥有Hooks之前，多用mixin来解决状态逻辑的复用

#### 使用Hook进行状态的复用

相比于mixins，hook的优点在于

1. 方法和属性好追溯
2. 没有重名、覆盖的问题
3. 多次使用

#### 比class组件更加容易理解

在class组件中，this的绑定问题。代码量更少。

### 结尾

这里鸣谢

[^浅谈：为啥vue和react都选择了Hooks🏂？]: https://juejin.cn/post/7066951709678895141
[^React官方文档]: https://react.docschina.org/reference/react

