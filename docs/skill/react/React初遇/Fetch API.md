---
slug: fetch
title: Fetch API
date: 2022-10-28
authors: Viktor
tags: [react]
keywords: [react]
---
<!-- truncate -->
## Fetch API

### 什么是Fetch

Fetch是浏览器中自带的一种发送请求的方式，它是Ajax的升级版，相较于Ajax来说它使用起来更加方便，代码也更加简洁清晰。

### 为什么使用Fetch

向服务器中发送请求的方法

### 怎么使用Fetch

发送get请求

```jsx
fetch(resource)
```

使用fetch发送get请求时，只需要将请求地址作为参数即可。

```jsx
fetch('http://localhost:1337/api/students')
```

API地址是我们前边课程中通过Strapi定义的地址。和传统的Ajax不同，fetch返回的是一个promise，所以我们不需要再去监听响应返回的事件只需在fetch后调用`then()`方法即可。

```jsx
fetch('http://localhost:1337/api/students')
    .then(res => //res是响应信息 )
```

当请求发送成功后，fetch会自动调用then中的回调函数，回调函数的第一个参数就是服务器返回的响应信息，这里我们用res表示（response的简写）。res中包含了全部的响应信息，这些信息中我们比较关心的是服务器返回的json数据，所以我们还需调用res的`json()`方法来获取res中的json数据，`json()`方法同样会返回一个promise，所以我们还需要接着then，像是这样：

```jsx
fetch('http://localhost:1337/api/students')
    .then(res => res.json())
    .then(data => console.log(data))
```

第二个then中的data，便是从res中解析到的数据，也就是服务器所发送的数据，它已经直接转换为了JS对象，数据结构和服务器中返回的数据一致：

```jsx
{
    "data": [
        {
            "id": 1,
            "attributes": {
                "name": "孙悟空",
                "gender": "男",
                "age": 18,
                "address": "花果山",
                "createdAt": "2022-05-16T10:05:10.538Z",
                "updatedAt": "2022-05-16T10:05:34.201Z"
            }
        },
        {
            "id": 2,
            "attributes": {
                "name": "猪八戒",
                "gender": "男",
                "age": 28,
                "address": "高老庄",
                "createdAt": "2022-05-16T10:07:01.140Z",
                "updatedAt": "2022-05-16T10:07:01.140Z"
            }
        },
        {
            "id": 3,
            "attributes": {
                "name": "沙和尚",
                "gender": "男",
                "age": 38,
                "address": "流沙河",
                "createdAt": "2022-05-16T10:15:51.303Z",
                "updatedAt": "2022-05-16T10:15:51.303Z"
            }
        }
    ],
    "meta": {
        "pagination": {
            "page": 1,
            "pageSize": 25,
            "pageCount": 1,
            "total": 3
        }
    }
}
```

从服务器中加载到的数据比较多，我们使用时还需要对数据进行调整，使其变成我们需要的数据结构，我们还需要在最后调用catch，并在catch处理异常：

```jsx
        fetch('http://localhost:1337/api/students')
            .then(
                res => res.json())
            .then(
                data => {
                    const formatData = data.data.map(item => ({
                        id:item.id,
                        name:item.attributes.name,
                        age:item.attributes.age,
                        gender:item.attributes.gender,
                        address:item.attributes.address,
                    }));

                    console.log(formatData);
                })
            .catch(err => console.log(err));
```

### 其他类型请求

发送其他类型请求时，除了要指定请求地址外，还要传递第二个参数来设置请求的信息：

```jsx
fetch(resource, init)
```

init对象就是用来设置请求信息的，常用的属性有method用来设置请求方法，headers用来设置请求头，body用来设置请求体。

例子：

发送delete请求：

```jsx
fetch('http://localhost:1337/api/students/3',{
        method:'delete'
    })
        .then(
            res => res.json())
        .then(
            data => console.log(data))
        .catch(err => console.log(err));
};
```

发送post请求：

```jsx
fetch('http://localhost:1337/api/students', {
    method: 'post',
    headers: {
        "Content-Type": 'application/json'
    },
    body: JSON.stringify({
        data: {
            name: '沙和尚',
            age: 38,
            gender: '男',
            address: '流沙河'
        }
    })
})
    .then(
        res => res.json())
    .then(
        data => console.log(data))
    .catch(err => console.log(err));
```

发送put请求：

```jsx
    fetch('http://localhost:1337/api/students/5', {
        method: 'put',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            data: {
                age: 48,
            }
        })
    })
        .then(
            res => res.json())
        .then(
            data => console.log(data))
        .catch(err => console.log(err));
```
