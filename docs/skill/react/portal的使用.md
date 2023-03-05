---
slug: react-portal
title: React-Portal
date: 2022-10-28
authors: Victor
tags: [react]
keywords: [react]
---
<!-- truncate -->
## Portal

### 为什么使用Portal

### 项目确认框的理解

不使用portal*会出现层叠问题*

要使页面确认框能实现应该有一个遮罩层,遮罩层原理与实现

> <https://blog.csdn.net/qq_42068550/article/details/88947754?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522166834623816782428691798%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=166834623816782428691798&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-1-88947754-null-null.142^v63^opensearch_v2>

记得返回要在覆盖层前面的元素

遮罩层代码：

```jsx
import React from 'react';
import './BackDrop.css';

const BackDrop = (props) => {
    return (
        <div className="backDrop">
            {props.children}
        </div>
    );
};

export default BackDrop;

```

确认框代码：

```jsx
import './ComfirmModal.css';
import Card from "../Card/Card";
import BackDrop from "../BackDrop/BackDrop";

const ConfirmModal = props => {

    return <BackDrop>
        <Card className="confirmModal">
            <div className="confirmText">
                <p>{props.confirmText}</p>
            </div>
            <div className="confirmButton">
                <button onClick={props.onOk} className="okButton">确认</button>
                <button onClick={props.onCancel}>取消</button>
            </div>
        </Card>;
    </BackDrop>

};

export default ConfirmModal;

```

### Portal是什么

在React中，父组件引入子组件后，子组件会直接在父组件内部渲染。换句话说，React元素中的子组件，在DOM中，也会是其父组件对应DOM的后代元素。

但是，在有些场景下如果将子组件直接渲染为父组件的后代，在网页显示时会出现一些问题。比如，需要在React中添加一个会盖住其他元素的Backdrop组件，Backdrop显示后，页面中所有的元素都会被遮盖。很显然这里需要用到定位，但是如果将遮罩层直接在当前组件中渲染的话，遮罩层会成为当前组件的后代元素。如果此时，当前元素后边的兄弟元素中有开启定位的情况出现，且层级不低于当前元素时，便会出现盖住遮罩层的情况。

```jsx
const Backdrop = () => {
  return <div
           style={
      {
        position:'fixed',
        top:0,
        bottom:0,
        left:0,
        right:0,
        background:'rgba(0,0,0,.3)',
        zIndex:9999
      }
    }
           >
    
  </div>
};

const Box = props => {
  return <div
           style={
      {
        width:100,
        height:100,
        background:props.bgColor
      }
    }
           >
             {props.children}
           </div>
};

const App = () => {
  return <div>
    
    <Box bgColor='yellowgreen'>
    <Backdrop/>
    </Box>
    <Box bgColor='orange' />
    
  </div>;
};


ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
```

上例代码中，App组件中引入了两个Box组件，一个绿色，一个橙色。绿色组件中引入了Backdrop组件，Backdrop组件是一个遮罩层，可以在覆盖住整个网页。

现在三个组件的关系是，绿色Box是橙色Box的兄弟元素，Backdrop是绿色Box的子元素。如果Box组件没有开启定位，遮罩层可以正常显示覆盖整个页面。

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/04/20220426194142167.png)

Backdrop能够盖住页面

但是如果为Box开启定位，并设置层级会出现什么情况呢？

```jsx
const Box = props => {
  return <div
           style={
      {
        width:100,
        height:100,
        background:props.bgColor,
        position:'relative',
        zIndex:1
      }
    }
           >
             {props.children}
           </div>
};
```

现在修改Box组件，开启相对定位，并设置了z-index为1，结果页面变成了这个样子：

![img](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/04/20220426194732930.png)

和上图对比，显然橙色的box没有被盖住，这是为什么呢？首先我们来看看他们的结构：

```jsx
<App>
    <绿色Box>
            <遮罩/>
    </绿色Box>
    <橙色Box/>
</App>
```

绿色Box和橙色Box都开启了定位，且z-index相同都为1，但是由于橙色在后边，所以实际层级是高于绿色的。由于绿色是遮罩层的父元素，所以即使遮罩的层级是9999也依然盖不住橙色。

问题出在了哪？遮罩层的作用，是用来盖住其他元素的，它本就不该作为Box的子元素出现，作为子元素了，就难免会出现类似问题。所以我们需要在Box中使用遮罩，但是又不能使他成为Box的子元素。怎么办呢？React为我们提供了一个“传送门”可以将元素传送到指定的位置上。

通过ReactDOM中的createPortal()方法，可以在渲染元素时将元素渲染到网页中的指定位置。这个方法就和他的名字一样，给React元素开启了一个传送门，让它可以去到它应该去的地方。

### Portal的用法

1. 在index.html中添加一个新的元素
2. 在组件中中通过ReactDOM.createPortal()将元素渲染到新建的元素中

在index.html中添加新元素：

```jsx
<div id="backdrop"></div>
```

修改Backdrop组件：

```jsx
const backdropDOM = document.getElementById('backdrop');

const Backdrop = () => {
  return ReactDOM.createPortal(
  <div
           style={
      {
        position:'fixed',
        top:0,
        bottom:0,
        left:0,
        right:0,
        zIndex:9999,
        background:'rgba(0,0,0,.3)'
      }
    }
           >
  </div>,
      backdropDOM
  );
};
```

> 来源：
>
> <https://www.lilichao.com/index.php/2022/03/22/portal/>
