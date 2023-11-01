---
slug: react-fragment
title: React-Fragment
date: 2022-10-28
authors: Viktor
tags: [react]
keywords: [react]
---
<!-- truncate -->
## Fragment

### 什么是Fragment

是一个专门用来作为父容器的组件它只会将它里边的子元素直接返回，不会创建任何多余的元素（代替之前的&lt;div&gt;&lt;/div&gt;)

- 当我们希望有一个父容器但同时又不希望父容器在网页中产生多余的结构时就可以使用Fragment

#### 自己手写Fragment

```jsx
import React from 'react';

const Out = (props) => {
    return props.children;
};

export default Out;

```

#### 官方实现

```jsx
import React from 'react';

const App = () => {

    /*
    *   React.Fragment
    *       - 是一个专门用来作为父容器的组件
    *           它只会将它里边的子元素直接返回，不会创建任何多余的元素
    *       - 当我们希望有一个父容器
    *           但同时又不希望父容器在网页中产生多余的结构时
    *           就可以使用Fragment
    * */

    return (
        <>
           <div>第一个组件</div>
           <div>第二个组件</div>
           <div>第三个组件</div>
        </>
    );
};

export default App;

```
