---
slug: react-redux
title: React-Redux
date: 2022-10-28
authors: Viktor
tags: [react]
keywords: [react]
---
## Redux

### 什么是Redux

A Predictable State Container for JS Apps是Redux官方对于Redux的描述，这句话可以这样翻译“一个专为JS应用设计的可预期的状态容器”，简单来说Redux是一个可预测的状态容器

### 为什么要使用Redux

Redux可以理解为是reducer和context的结合体，使用Redux即可管理复杂的state，又可以在不同的组件间方便的共享传递state。当然，Redux主要使用场景依然是大型应用，大型应用中状态比较复杂，如果只是使用reducer和context，开发起来并不是那么的便利，此时一个有一个功能强大的状态管理器就变得尤为的重要。

### 怎么使用Redux

使用Redux之前，你需要先明确一点Redux是JS应用的状态容器，它并不是只能在React使用，而是可以应用到任意的JS应用中（包括前端JS，和服务器中Node.js）。总之，凡是JS中需要管理的状态的Redux都可以胜任。

### 在网页中使用

网页中使用redux的步骤：

#### 简单例子：实现数字的加减以及显示

1. 引入redux核心包

    ```html
    <script src="https://unpkg.com/redux@4.2.0/dist/redux.js"></script>
    ```

2. 创建reducer整合函数

    ```js
    function reducer(state, action) {
            /*
            *   state 表示当前state，可以根据这个state生成新的state
            *   action 是一个js对象，它里边会保存操作的信息
            * */
            switch (action.type) {
                case 'ADD':
                    return state + 1;
                case 'SUB':
                    return state - 1;
                default:
                    return state;
            }
        }
    ```

3. 通过reducer对象创建store

    ```js
    const store = Redux.createStore(reducer, 1);
    ```

4. 对store中的state进行订阅

    ```js
    store.subscribe(() => {
            // 打印state的值
            // console.log(store.getState());
            countSpan.innerText = store.getState();
        });
    ```

5. 通过dispatch派发state的操作指令

    ```js
    subBtn.addEventListener('click', () => {
            store.dispatch({type: 'SUB'});
        });

        addBtn.addEventListener('click', () => {
            store.dispatch({type: 'ADD'});
        });

    ```
