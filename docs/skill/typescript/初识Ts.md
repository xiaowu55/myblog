---
id: start-ts
slug: /start-ts
title: Typescript入门
date: 2023-03-07
authors: Viktor
tags: [ts]
keywords: [ts]
---
<!--truncate-->

## 什么是TS

TS是js的超集，W它可以编译成普通干净的js代码

* 支持JS拥有的所有特性，且紧随ECMAScript的标准
* 在实现新特性上甚至领先于JS
* 添加了类型约束以外还包括一些语法的扩展，如枚举、元组等
* 会被编译成JS代码，不需要关心兼容性，也可以不借助babel这类工具（但是大多时候还是用Babel这类工具）

使用TS的项目有Angular、Vue3、Vscode、ant-design等

## 大前端的趋势

jQuery > AngularJS > 三大框架 > RN \ flutter

### TS的编译环境

安装编译环境

    npm install -g typescript

查看版本

    tsc --version

运行Ts代码
    1. 编译ts代码
        tsc XXX.ts

    简化运行代码

    方式一
        * 通过webpack，配置本例的ts编译环境斌且开启一个本地服务器可以直接运行在浏览器上
  
    方式二
        * 通过ts-node库，为ts的运行提供环境

### 变量的声明

声明了类型后ts就会进行类型检查，声明的类型可以称之为类型注解（**Type Annotation**）,一般定义一个函数时，都要明确定义参数类型

    var/let/const 标识符:数据类型 = 变量

#### 数据类型

TS-JS数据类型的关系
TS是JS的一个超集

<!-- ![Alt text](../../../%E5%9B%BE%E5%BA%8A/js-ts%E7%B1%BB%E5%9E%8B.png) -->

* number类型
* boolean类型
* string类型
* Array类型 与JS不同两种写法

        let name:string[] = ['aaa','bbb','ccc']

        let name1:Array<number> =[123,321]

* Object类型

        let info:={
            name:'wujiaze',
            name:20
        }

* Symbol类型
* null类型
* undefined类型

* any类型 **ts特有类型**
    any类型表示不限制标识符的任意类型并且可以在该标识符上面进行任意的操作也就是回到js中

* unknown类型 **ts特有类型**
    用于描述类型不确定的变量，与any类型不同是，在类型缩小（类型校验）前，unknown类型上不允许任何操作

* viod类型 **ts特有类型**
    用来指定一个函数没有返回值
        1. 在ts中如果一个函数没有任何返回值，那么返回值就是void类型
        2. 如果返回值是void类型，那么我们也可以返回undefined类型

* never类型 **ts特有类型**
    表示永远不会发生值的类型
    1. 很少实际去定义never类型，某些情况下会推导出nver
    2. 开发框架或者工具的时候可能会用到never
    3. 封装一些类型工具的时候可以使用never类型体操

* tuple类型 **ts特有类型**
    元组：在函数中的使用是最多的，特别是返回值
    介于对象与数值之间的.数组中多建议放相同类型的数据，元组数据结构中可以存放不同的数据类型，取出来的item也是有明确的类型

### 变量的类型推断

我们并不用总是写类型检查

变量的类型推断:当声明一个标识符的时候直接进行赋值，会根据赋值的类型推导出标识符的类型注解

#### 匿名函数尽量不要自己添加类型注解，会自己推断上下文注解
