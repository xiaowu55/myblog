---
slug: reacthook
title: React自定义Hook
date: 2022-10-28
authors: Viktor
tags: [react]
keywords: [react]
---
<!-- truncate -->
## HOOK

### 什么是Hook

中文翻译叫做钩子，用来增强函数组件的功能，例如useState/useEffect都是钩子函数，钩子函数只能运行在函数组件或自定义钩子中.

### 怎么自定义Hook

自定钩子就是一个普通的函数。普通函数怎么定义，它就怎么定义。但是它又不那么普通，因为钩子函数的名字必须以use开头，使用use开头后，React就能自动识别出它是一个钩子函数，这样才会以钩子函数的方式去处理它。

### 怎么使用Hook

1. 创建一个函数，命名为useXxx
2. 在函数中正常调用React中的各种钩子
3. 在组件中引用钩子

### 例子

```jsx
const [stuData, setStuData] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);\
useEffect(()=>{
    const fetchData = async () => {
        try{
            setLoading(true);
            setError(null);
            const res = await fetch('http://localhost:1337/api/students');
            if(res.ok){
                const data = await res.json();
                setStuData(data.data);
            }else{
                throw new Error('数据加载失败！');
            }
        }catch (e){
            setError(e);
        }finally {
            setLoading(false);
        }
    };
    fetchData();
}, []);
```

使用自定义Hook优化之后

src/hooks/useFetch.js

```jsx
import {useEffect, useState} from "react";

const useFetch = (url) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchData(){
        try{
            setLoading(true);
            setError(null);

            const res = await fetch('http://localhost:1337/api/students');
            if(!res.ok){
                throw new Error('数据加载失败！');
            }
            const data = await res.json();
            setData(data.data);
        }catch (e){
            setError(e);
        }finally {
            setLoading(false);
        }
    }
    return {data, loading, error, fetchData};
};

export default useFetch;
```

App.js

```jsx
const {data:stuData, loading, error, fetchData} = useFetch();

useEffect(()=>{
    fetchData();
}, [])
```

这样一来，将App.js中发送请求相关的钩子都编写到useFetch中，并将App中会用到的变量作为返回值返回，而作为App来说，只需要调用useFetch，即可获取到stuData、loading、error等数据以及fetchData函数，这样一来大大简化了App中的代码，同时使得其他组件也可以通过useFetch来发送请求加载数据。
