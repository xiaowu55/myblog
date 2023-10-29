---
title: Redux源码学习
date: 2023-10-23
authors: Viktor
---
# Redux源码学习

## Redux

Redux 是 JavaScript 状态容器，提供可预测化的状态管理。

Redux三大原则

1. 单一数据源：整个应用的 全局 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。
2. State是只读的：唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。
3. 使用纯函数来执行修改：为了描述 action 如何改变 state tree，你需要编写纯的 reducers。

## 从观察者模式及发布订阅模式到Redux

### 设计模式：观察者模式

观察者模式定义了对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知，并自动更新

![img](https://static.vue-js.com/d3a80020-3f7c-11ec-a752-75723a64e8f5.png)

### 消息范式：发布订阅模式

发布-订阅是一种消息范式，消息的发送者（称为发布者）不会将消息直接发送给特定的接收者（称为订阅者）。而是将发布的消息分为不同的类别，无需了解哪些订阅者（如果有的话）可能存在

同样的，订阅者可以表达对一个或多个类别的兴趣，只接收感兴趣的消息，无需了解哪些发布者存在

![img](https://static.vue-js.com/e24d3cd0-3f7c-11ec-8e64-91fdec0f05a1.png)

观察者模式与发布-订阅模式非常相似，两者的主要区别在于观察者模式中通常有一个主题对象（被观察对象）来管理观察者（订阅者），而发布-订阅模式中通常没有中心对象，消息由发布者直接发送给订阅者。

### 写一个发布订阅模式

下面我们来实现一个简单的发布订阅模式，之后我们将把它改造成一个简单的createStore

```ts
/**
 * My-Redux前置学习
 * 发布订阅模式
 */
class PubSub{
    constructor(){
        // 使用一个对象存放所有的订阅消息
        // 每一个消息对应一个数组，数组结果如下
        // {
        //     'event1':[callback1,callback2]
        // }
        this.events = {}
    }
    subscribe(event,callback){
        if(this.events[event]){
            // 如果有人订阅过这个消息，直接往里面加就可以了
            this.events[event].push(callback)
        }else{
            // 没人订阅过就存放进去
            this.events[event]=[callback]
        }
    }

    publish(event,...args){
        //取出所有订阅者的回调执行
        const subscribeEvents = this.events[event]
        if(subscribeEvents&&subscribeEvents.length){
            subscribeEvents.foreach(callback=>{
                callback.call(this,...args)
            })
        }
    }

    unsubscribe(event,callback){
        // 删除某个订阅，保留其他订阅
        const subscribeEvents = this.events[event]

        if(subscribeEvents&&subscribeEvents.length){
            this.events[event] = this.events[event].fillter(callback =>callback!==callback)
        }
    }
}
```

### 写一个createStore

首先我们要理解createStore干了什么

> 创建一个 Redux [store](https://www.redux.org.cn/docs/api/Store.html) 来以存放应用中所有的 state。

那么创建的store上有什么方法呢？

1. getState():返回当前应用的 state 树
2. dispatch(action)：分发 action。这是触发 state 变化的惟一途径。会使用当前 [`getState()`](https://www.redux.org.cn/docs/api/Store.html#getState) 的结果和传入的 `action` 以同步方式的调用 store 的 reduce 函数。返回值会被作为下一个 state。从现在开始，这就成为了 [`getState()`](https://www.redux.org.cn/docs/api/Store.html#getState) 的返回值，同时变化监听器(change listener)会被触发。
3. subscribe(listener)：添加一个变化监听器。每当 dispatch action 的时候就会执行，state 树中的一部分可能已经变化。你可以在回调函数里调用 [`getState()`](https://www.redux.org.cn/docs/api/Store.html#getState) 来拿到当前 state。

我们开始吧，按照上面学会的发布订阅模型，仿造一个createStore要点如下

1. dispatch就是publish
2. subscribe就是subscribe
3. getState返回state即可

```js
export function createStore(reducer,action){
    let state   // state记录所有状态
    let listeners = []  //保存所有注册的回调

    function subscribe(callback){
        listeners.push(callback) //subsribe就是将回调保存下来
    }

    // dispatch就是把所有回调拿出来依次执行
    function dispatch(action){
        state = reducer(state,action)

        for(let i=0;i<listeners.length;i++){
            const listener = listeners[i]
            listener()
        }
    }

    function getState(){
        return state
    }

    const store = {
        subscribe,
        dispatch,
        getState
    }

    return store
}
```

好耶，我们完成了一个createStore的实现，虽然其中还没有实现对enhancer的兼容，但是我们已经走出了第一步。

### 写一个combineReducers

但是我们不可能只定义一个reducer吧，如果我们有了更多的用处。我们就需要把他们整合起来。

这是combineReducers的官方解释

> `combineReducers` 辅助函数的作用是，把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 [`createStore`](https://www.redux.org.cn/docs/api/createStore.html) 方法。

也就是说我们的目的是把多个reducer使用对象的方式传入然后返回一个和reducer对象相同的state对象

我们开始吧

```js
export function combineReducers(reducerMap){
    const reducerKeys = Object.keys(reducerMap)  //获取参数中的键值拿出来

    //  返回值是一个普通的reducer函数
    const reducer = (state={},action)=>{
        const newState = {}

        for(let i=0;i<reducerKeys.length;i++){
            // reducerMap里面每个键的值都是一个reducer，我们把它拿出来运行下就可以得到对应键新的state值
            // 然后将所有reducer返回的state按照参数里的可以组装好
            // 最后再返回组装好点newState就行
            
            const key = reducerKeys[i] //获取reducer的键
            const currentReducer = reducerMap[key] //获得reducer这个函数
            const prevState = state[key]  // 获取原先state的值
            newState[key] = currentReducer(prevState,action)  // 组装并放入之前新建的对象中
        }

        return newState //返回为reducer

    }
    return reducer
}
```

太好了，我们又进了一步，现在你可以将多个reducer合并起来了

### 写一个applyMiddleware

applyMiddleware出现了是为了使用包含自定义功能的 middleware 来扩展 Redux。

> Middleware 可以让你包装 store 的 [`dispatch`](https://www.redux.org.cn/docs/api/Store.html#dispatch) 方法来达到你想要的目的。同时， middleware 还拥有“可组合”这一关键特性。多个 middleware 可以被组合到一起使用，形成 middleware 链。

我们直接用官方给的一个中间件来测试我们的appplyMiddleware

```
function logger(store) {
  return function(next) {
    return function(action) {
      console.group(action.type);
      console.info('dispatching', action);
      let result = next(action);
      console.log('next state', store.getState());
      console.groupEnd();
      return result
    }
  }
}

// 在createStore的时候将applyMiddleware作为第二个参数传进去
const store = createStore(
  reducer,
  applyMiddleware(logger)
)
```

我们可以看到applyMiddleware函数的执行结果作为createStore的第二个参数传进去了，所以我们得升级一下之前的createStore，别想太多，我们之前写的没什么问题。

既然要传入参数，那我们最好先知道传入这个参数，这个参数会做什么。

> `enhancer` *(Function)*: Store enhancer 是一个组合 store creator 的高阶函数，返回一个新的强化过的 store creator。这与 middleware 相似，它也允许你通过复合函数改变 store 接口。

也就是说，我们传入的这个参数会取得storeCreate，并增强storeCreate后返回

```js
export default function createStore(reducer, enhancer) {
    // 先处理enhancer   
    // 如果enhancer存在并且是函数
    // 我们将createStore作为参数传给他
    // 他应该返回一个新的createStore给我
    // 我再拿这个新的createStore执行，应该得到一个store
    // 直接返回这个store就行
    if (typeof enhancer !== 'undefined') {
        if (typeof enhancer === 'function') {
            const newCreateStore = enhancer(createStore);
            const newStore = newCreateStore(reducer);
            return newStore;
        }
    }

    let state
    let listeners = []

    function subscribe(callback) {
        listeners.push(callback)
    }

    function dispatch(action) {
        state = reducer(state, action)

        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i]
            listener()
        }
    }

    function getState() {
        return state
    }

    const store = {
        subscribe,
        dispatch,
        getState
    }

    return store


}
```

前面我们提到第二个参数是appleMiddleware的返回值，所以appleMiddleware会返回一个enhancer

> 1. 一个中间件接收`store`作为参数，会返回一个函数
> 2. 返回的这个函数接收老的`dispatch`函数作为参数，会返回一个新的函数
> 3. 返回的新函数就是新的`dispatch`函数，这个函数里面可以拿到外面两层传进来的`store`和老`dispatch`函数

```js
export default function applyMiddleware(middleware) {
    function enhancer(createStore) {
      function newCreateStore(reducer) {
        const store = createStore(reducer);
        
        // 将middleware拿过来执行下，传入store
        // 得到第一层函数
        const func = middleware(store);
        
        // 解构出原始的dispatch
        const { dispatch } = store;
        
        // 将原始的dispatch函数传给func执行
        // 得到增强版的dispatch
        const newDispatch = func(dispatch);
        
        // 返回的时候用增强版的newDispatch替换原始的dispatch
        return {...store, dispatch: newDispatch}
      }
      
      return newCreateStore;
    }
    
    return enhancer;
  }
```

### 总结

1. 这是我第一次试着去学习源码，感受颇深。不仅学习了一些用法，更加重要的是了解了设计模式。state
2. store单纯的Redux只是一个状态机，store里面存了所有的状态state，要改变里面的状态state，只能dispatch action。
3. Redux其实就是一个发布订阅模式

### 参考资料

中文官方文档：https://www.redux.org.cn/

手写一个Redux：https://juejin.cn/post/6845166891682512909#heading-7

Github源码：https://github.com/reduxjs/redux

理解【观察者模式】和【发布订阅】的区别：https://juejin.cn/post/6978728619782701087