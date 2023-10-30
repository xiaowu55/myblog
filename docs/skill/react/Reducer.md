---
slug: react-reducer
title: React-Reducer
date: 2022-10-28
authors: Viktor
tags: [react]
keywords: [react]
---
## Reducer

### 什么是Reducer

reducer中文翻译为减少，可以把同一个state相关的函数整合到一起方便组件调用

### 为什么使用Reducer

在React的函数组件中，我们可以通过useState()来创建state。这种创建state的方式会给我们返回两个东西state和setState()。state用来读取数据，而setState()用来设置修改数据。但是这种方式也存在着一些不足，因为所有的修改state的方式都必须通过setState()来进行，如果遇到一些复杂度比较高的state时，这种方式似乎就变得不是那么的优雅。

### 在哪使用Reducer

Reducer也不例外，它只适用于那些比较复杂的state，对于简单的state使用Reducer只能是徒增烦恼。

### 怎么使用Reducer

useState相同useReducer也是一个钩子函数，语法如下：

```jsx
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

和useState()类似，第一个参数是state用来读取state的值，第二个参数同样是一个函数，不同于setState()这个函数我们可以称它是一个“派发器”，通过它可以向reducer()发送不同的指令，控制reducer()做不同的操作。

它的参数有三个，第三个我们暂且忽略，只看前两个。reducer()是一个函数，也是我们所谓的“整合器”。它的返回值会成为新的state值。当我们调用dispatch()时，dispatch()会将消息发送给reducer()，reducer()可以根据不同的消息对state进行不同的处理。initialArg就是state的初始值，和useState()参数一样。

```jsx
import {useReducer, useState} from 'react';

const reducer = (state, action) => {
    switch(action.type){
        case 'add':
            return state + 1;
        case 'sub':
            return state - 1;
    }
};

function App() {

    const [count, countDispath] = useReducer(reducer,1);

    return (
        <div className="App">
            {count}
            <div>
                <button onClick={()=>countDispath({type:'sub'})}>-</button>
                <button onClick={()=>countDispath({type:'add'})}>+</button>
            </div>
        </div>
    );
}

export default App;
```
