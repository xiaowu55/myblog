---
slug: react-context
title: React-Context
date: 2022-10-28
authors: Victor
tags: [react]
keywords: [react]
---
<!-- truncate -->

## Context

### 什么是Context

Context为我们提供了一种在不同组件间共享数据的方式，它不再拘泥于props刻板的逐层传递，而是在外层组件中统一设置，设置后内层所有的组件都可以访问到Context中所存储的数据。换句话说，Context类似于JS中的全局作用域，可以将一些公共数据设置到一个同一个Context中，使得所有的组件都可以访问到这些数据。

### 为什么用Context

在React中组件间的数据通信是通过props进行的，父组件给子组件设置props，子组件给后代组件设置props，props在组件间自上向下（父传子）的逐层传递数据。但并不是所有的数据都适合这种传递方式，有些数据需要在多个组件中共同使用，如果还通过props一层一层传递，麻烦自不必多说。

### 怎么用Context

1.创建Context

```jsx
/* const MyContext = React.createContext(defaultValue); */ //示例

import React from "react";

const TestContext = React.createContext({
    name:'孙悟空',
    age:18,
    gender:'男',
    sayHello:()=>{
        alert(this.name);    
    }
});

export default TestContext;



```

`React.createContext(defaultValue)`用来创建一个Context对象，它需要一个初始值作为参数，这个初始值可以是一个原始值，也可以是一个JS对象。调用以后，方法将会返回一个Context对象，这个对象非常关键，当我们想在其他组件中访问Context中的数据时，必须要通过这个对象。

2.调用Context对象中的数据

### 第一种方式，可以通过Consumer标签来访问到Context中的数据

```jsx
import React from 'react';
import TestContext from '../store/test-context';//引入之前创建的Context

const MyComponent = () => {

    return (
        <TestContext.Consumer>
            {(ctx)=>{
                return (
                    <ul>
                        <li>{ctx.name}</li>
                        <li>{ctx.age}</li>
                        <li>{ctx.gender}</li>
                    </ul>
                );
            }}
        </TestContext.Consumer>

    );
};

export default MyComponent;
```

方法二：钩子函数useContext()调用（常用）

```jsx
import React, {useContext} from 'react';
import TestContext from '../store/test-context';

const MyComponent = () => {

    const ctx = useContext(TestContext);

    return (
        <ul>
            <li>{ctx.name}</li>
            <li>{ctx.age}</li>
            <li>{ctx.gender}</li>
        </ul>
    );
};

export default MyComponent;
```

3.provider-consumer模式

## provider

### 什么是provider

​ React提供用来给组件指定Context值

```jsx
import React from "react";
import MyComponent from "./component/MyComponent";
import TestContext from "./store/test-context";

const App = () => {


    return <TestContext.Provider value={{name:'猪八戒', age:28, gender:'男'}}>//Privider组件中访问的是Provider提供的数据
        <MyComponent/>
    </TestContext.Provider>;
};

export default App;
```

### Provider设置信息

Provider会设置在外层组件中，通过value属性来指定Context的值。这个Context值在所有的Provider子组件中都可以访问。

### Context的信息使用流程

Context的搜索流程和JS中函数作用域类似，当我们获取Context时，React会在它的外层查找最近的Provider，然后返回它的Context值。如果没有找到Provider，则会返回Context模块中设置的默认值。
