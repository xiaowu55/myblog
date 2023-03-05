---
slug: component
title: 组件
date: 2022-10-28
authors: Victor
tags: [react]
keywords: [react]
---
<!-- truncate -->
## 组件Components

React中组件有两种创建方式:

1. 函数式组件 函数组件就是一个返回JSX的普通组件的首字母必须是大写
2. 类组件

### 函数式组件的创建

App.js

```js
const App = () => {
  return <div>我是App组件！</div>
};

// 导出App
export default App;
```

index.js

```js
const root = ReactDOM.createRoot(document.getElementById('root'));
//React组件可以直接通过JSX渲染
root.render(<App/>);
```

### 类式组件的创建

App.js

```js
import React from "react";

/*
*   类组件必须要继承React.Component
*       相较于函数组件，类组件的编写要麻烦一下，
*           但是他俩的功能是一样的
* */
class App extends React.Component{

    // 类组件中，必须添加一个render()方法，且方法的返回值要是一个jsx
    render() {
        return <div>我是一个类组件</div>;
    }
}

// 导出App
export default App;

```

index.js

```js
import ReactDOM from "react-dom/client";
import App from "./App";


const root = ReactDOM.createRoot(document.getElementById('root'));

// React组件可以直接通过JSX渲染
root.render(<App/>);

```

### 类组件的三个方法

#### props

类组件的props是存储到类的实例对象中，
 可以直接通过实例对象访问  this.props

#### state

类组件中state统一存储到了实例对象的state属性中

* 可以通过 this.state来访问，通过this.setState()对其进行修改，当我们通过this.setState()修改state时，React只会修改设置了的属性
函数组件中，响应函数直接以函数的形式定义在组件中，但是在类组件中，响应函数是以类的方法来定义，之前的属性都会保留但是这你仅限于直接存储于state中的属性

#### ref

获取DOM对象

1. 创建一个属性，用来存储DOM对象

   ```js
   divRef = React.createRef();
   ```

2. 将这个属性设置为指定元素的ref值
