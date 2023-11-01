---
slug: react-State
title: React-state
date: 2022-10-28
authors: Viktor
tags: [react]
keywords: [react]
---
<!-- truncate -->
## React state

### state的意义

- 在React中，当组件渲染完毕后，再修改组件中的变量，不会使组件重新渲染,要使得组件可以收到变量的影响，必须在变量修改后对组件进行重新渲染这里我们就需要一个特殊变量，当这个变量被修改使，组件会自动重新渲染

- state相当于一个变量，只是这个变量在React中进行了注册，

- React会监控这个变量的变化，当state发生变化时，会自动触发组件的重新渲染，使得我们的修改可以在页面中呈现出来

tip：当需要组件发生变化的时候就需要用到state

### state的使用

在函数组件中，我们需要通过钩子函数，获取state。

  ```js
  import {useState} from "react";
  ```

它需要一个值作为参数，这个值就是state的初始值，该函数会返回一个数组，数组中第一个元素，是初始值，初始值只用来显示数据，直接修改不会触发组件的重新渲染，数组中的第二个元素，是一个函数，通常会命名为setXxx， 这个函数用来修改state，调用其修改state后会触发组件的重新渲染，并且使用函数中的值作为新的state值。

### state注意点

state实际就是一个被React管理的变量，当我们通过setState()修改变量的值时，会触发组件的自动重新渲染

- 只有state值发生变化时，组件才会重新渲染

  ```jsx
  const updateUserHandler = () => {
          // setUser({name:'猪八戒'});
  
          // 如果直接修改旧的state对象，由于对象还是那个对象（对象的引用是使用堆的地址，内容的改变不会改变堆的地址），所以不会生效
          // user.name = '猪八戒';
          // console.log(user);
          // setUser(user);
  
          // const newUser = Object.assign({}, user);
          // newUser.name = '猪八戒';
          // setUser(newUser);
  
          setUser({...user, name: '猪八戒'});
  
  
      };
  ```

当state的值是一个对象时，修改时是使用新的对象去替换已有对象
当通过setState去修改一个state时，并不表示修改当前的state
。它修改的是组件下一次渲染时state值setState()会触发组件的重新渲染，它是异步的，所以当调用setState()需要用旧state的值时，一定要注意有可能出现计算错误的情况，为了避免这种情况，可以通过为setState()传递回调函数的形式来修改state值。

  ```jsx
  const addHandler = () => {
          setTimeout(() => {
              // setCounter(counter + 1); // 将counter值修改为2
              setCounter((prevCounter)=>{
  
                  /*
                  *   setState()中回调函数的返回值将会成为新的state值
                  *       回调函数执行时，React会将最新的state值作为参数传递
                  * */
                  return prevCounter + 1;
              });
  
              // setCounter(prevState => prevState + 1);
          }, 1000);
  
          // setCounter(2);
          // setCounter(3);
          // setCounter(4);
          // setCounter(5);
          // setCounter(6);
      };
  ```

  在之后我们可以复习一下Promise与异步的知识点

### 动态显示组件

state

```jsx
{showConfirm && <confirmModal/>} //重点是&&的短路行为
        //前面为true才显示组件
```
