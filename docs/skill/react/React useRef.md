---
slug: react-useref
title: React-useRef
date: 2022-10-28
authors: Victor
tags: [react]
keywords: [react]
---
## React useRef

### 引入useRef的原因

获得DOM，便于之后对DOM进行操作

### DOM的获取方法

1. 可以使用传统的document来对DOM进行操作
2. 直接从React处获取DOM对象  
    步骤：

    1. 使用 useRef() 钩子函数,创建一个存储DOM对象的容器
       * 钩子函数的注意事项：
         1. React中的钩子函数只能用于函数组件或自定义钩子
         2. 钩子函数只能直接在函数组件中调用

    2.将容器设置为想要获取DOM对象元素的ref属性

    ```jsx
    <h1 ref={xxx}>....</h1>
    ```

    React会自动将当前元素的DOM对象，设置为容器current属性

### useRef()简介

返回的就是一个普通的JS对象

{current:undefined}

所以我们直接创建一个js对象，也可以代替useRef()

区别：

1. 我们创建的对象，组件每次重新渲染都会创建一个新对象
2. useRef()创建的对象，可以确保每次渲染获取到的都是同一个对象

tip:当你需要一个对象不会因为组件的重新渲染而改变时，就可以使用useRef()
