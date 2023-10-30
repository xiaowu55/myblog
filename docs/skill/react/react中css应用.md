---
slug: react-css-module
title: react中css应用
date: 2022-10-28
authors: Viktor
tags: [react, css]
keywords: [react,css]
---
<!-- truncate -->
CSS模块使用步骤：

1. 创建一个xxx.module.css

2. 在组件中引入css

    ```js
    import classes from './App.module.css';
    ```

3. 通过classes来设置类

    ```js
    className={classes.p1}
    ```

4. CSS模块可以动态的设置唯一的class值

    ```jsx
    import React, {useState} from 'react';
    import classes from './App.module.css';
    import A from "./A";

    const App = () => {

        /*
        *   CSS模块
        *       使用步骤：
        *           1.创建一个xxx.module.css
        *           2.在组件中引入css
        *               import classes from './App.module.css';
        *           3.通过classes来设置类
        *               className={classes.p1}
        *       CSS模块可以动态的设置唯一的class值
        *           App_p1__9v2n6
        * */

        const [showBorder, setShowBorder] = useState(false);

        const clickHandler = () => {
            setShowBorder(true);
        };

        return (
            <div>
                <A/>
                <p className={`${classes.p1} ${showBorder ? classes.Border : ''}`}>我是一个段落</p>
                <button onClick={clickHandler}>点我一下</button>
            </div>
        );
    };

    export default App;

    ```

5. **App.module.css**

    ```css
    .p1{
        color: red;
        background-color: #bfa;
    }

    .Border{
        border: 1px red solid;
    }

    ```
