---
slug: react-data
title: React-数据传递
date: 2022-10-28
authors: Victor
tags: [react]
keywords: [react]
---
## React中数据的传递

### 父组件传递给子组件

父组件可以通过向⼦组件传 **props** 的⽅式来实现父到子的通讯。

```jsx
return <div className="app">
        <Logs logsData={logsData}/>
    </div>;
```

### 子组件传递给父组件

**可以采用 props + 回调 的方式**。

当父组件向⼦组件传递 props 进行通讯时，可在该 props 中传递一个回调函数，当⼦组件调⽤该函数时，可将⼦组件中想要传递给父组件的信息作为参数传递给该函数。由于 props 中的函数作用域为父组件⾃身，因此可以通过该函数内的 setState 更新到⽗组件上。

```jsx
const saveLogHandler = (newLog) => {
        // 向新的日志中添加id
        newLog.id = Date.now() + '';

        // console.log('App.js -->',newLog);

        // 将新的数据添加到数组中
        // logsData.push(newLog);
        setLogsData([newLog, ...logsData]);

    };
return <div className="app">
        {/*引入LogsFrom*/}
        <LogsForm onSaveLog={saveLogHandler}/>
        <Logs logsData={logsData}/>
    </div>;
};


//子组件中调用
props.onSaveLog(newLog)
```

### 兄弟组件的通信

先传递给兄弟节点共同的父节点然后再使用父组件传递给子组件

待看

> <https://segmentfault.com/a/1190000023585646>
