---
slug: react-memo
title: React-Memo
date: 2022-10-28
authors: Viktor
tags: [react]
keywords: [react]
---
## React.Memo

### 什么是React.Memo

是一个给组件缓存，但父组件重新渲染，但子组件的props没有发生变化时他不会重新渲染。

### 为什么使用React.Memo

该方法是一个高阶函数，可以用来根据组件的props对组件进行缓存，当一个组件的父组件发生重新渲染，而子组件的props没有发生变化时，它会直接将缓存中的组件渲染结果返回而不是再次触发子组件的重新渲染，这样一来就大大的降低了子组件重新渲染的次数。

### 怎么使用React.Memo

可以再暴露的时候使用

例子

三个组件的引用关系为，A组件是App的子组件、B组件是A组件的子组件：App –> A –> B

当App组件发生重新渲染时，A和B组件都会发生重渲染。当A组件重新渲染时，B组件也会重新渲染。B组件中没有state，甚至连props都没有设置。

App.js

```jsx
const App = () => {
    const [count, setCount] = useState(1);

    const clickHandler = () => {
        setCount(prevState => prevState + 1);
    };

    return (
        <div>
            <h2>App -- {count}</h2>
            <button onClick={clickHandler}>增加</button>

            <A/>
        </div>
    );
};
```

A.js

```jsx
const A = () => {
    const [count, setCount] = useState(1);

    const clickHandler = () => {
      setCount(prevState => prevState + 1);
    };

    return (
        <div>
            <h2>组件A -- {count}</h2>
            <button onClick={clickHandler}>增加</button>
            <B/>
        </div>
    );
};

export default A;
```

B.js

```jsx
const B = () => {
    return (
        <div>
            <h2>组件B</h2>
        </div>
    );
};

export default B;
```

现在对上述案例中的B组件进行如下修改：

```jsx
const B = () => {
    console.log('B渲染');
    return (
        <div>
            <h2>组件B</h2>
        </div>
    );
};

export default React.memo(B);
```

修改后的代码中，并没有直接将B组件向外导出，而是在B组件外层套了一层函数`React.memo()`，这样一来，返回的B组件就增加了缓存功能，只有当B组件的props属性发生变化时，才会触发组件的重新渲染。memo只会根据props判断是否需要重新渲染，和state和context无关，state或context发生变化时，组件依然会正常的进行重新渲染。
