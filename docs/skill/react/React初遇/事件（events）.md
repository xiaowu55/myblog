---
slug: react-event
title: 事件
date: 2022-10-28
authors: Viktor
tags: [react, js]
keywords: [react, js]
---
<!-- truncate -->

### 事件（events）

在React中事件需要通过元素的属性来设置，

​    和原生JS不同，在React中事件的属性需要使用驼峰命名法：

​      onclick -> onClick

​      onchange -> onChange

​    属性值不能直接执行代码，而是需要一个回调函数：

​     onclick="alert(123)"

​     onClick={()=>{alert(123)}}

```js
<div
        onClick={() => {
            alert('div');
        }}
        style={{width: 200, height: 200, margin: '100px auto', backgroundColor:'#bfa'}}>
        <button onClick={() => {
            alert(123);
        }}>点我一下
        </button>
        <button onClick={clickHandler}>哈哈</button>
        <br/>
        <a href="https://www.baidu.com" onClick={clickHandler}>超链接</a>
    </div>
```

#### 取消默认行为

 在React中，无法通过return false取消默认行为

#### 事件对象

React事件中同样会传递事件对象，可以在响应函数中定义参数来接收事件对象React中的事件对象同样不是原生的事件对象，是经过React包装后的事件对象由于对象进行过包装，所以使用过程中我们无需再去考虑兼容性问题

```js
    event.preventDefault(); // 取消默认行为
    event.stopPropagation(); // 取消事件的冒泡
```
