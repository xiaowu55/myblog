---
id: css-learn
slug: /css-learn
title: 字节训练营css笔记
date: 2023-4-20
authors: Victor
tags: [css]
keywords: [css]
---
<!--truncate-->

## 基础知识

CSS 层叠样式表

层叠样式表三大规则

1. 样式表来源
2. 选择器优先级
3. 源码位置

good practice

* 选择器尽量少用id
* 尽量少用！ important
* 自己的样式加载在引用库样式的后面

### 继承

* 大部分具有继承属性和文本相关
* 可以使用inherit关键字显式指定一个属性值从其父元素继承

### CSS的值和单位

CSS是选择器，属性，值组成

值大概分为三大类：
    1. 文字类：比如initial这类关键字，颜色，位置等等
    2. 数值类：比如z-index：1这种数值或者带有单位的数值、百分比等
    3. 函数生成：比如calc(),min(),max()等

值中有单位：
    1. 绝对长度：px，pt，cm，in
    2. 相对长度：em，rem，ex，rex，vw，vh，vmin
    3. 角度：deg，grad，turn，rad
    4. 时间：s，ms
    5. 分辨率：dpi，dpcm，dppx

## 布局和定位

### 盒模型

控制盒子类型：  display：block、inline、inline-block、flex
控制盒子大小&计算方式： width，height...    box-sizing：content-box、border-box
控制盒中内容流：    overflow：auto、scroll、hidden
控制定位：  position：static、relative、absolute、fixed、sticky
是否可见：  visibility：visible、hidden...

任意盒子的display：

    1. 外部显示类型：规定了该盒子如何与统一格式上下文中的其他元素一起显示
    2. 内部显示类型：规定了该盒子内部的布局方式

### Normal Flow 常规流

默认的布局方式，有块级格式化上下问和内联格式化上下文

1. 块级盒子 ：display：block|flex|grid|table|flow-root 参与块级格式化上下文 BFC(block formatting context)
2. 内联级盒子： display： inline|inline-block|inline-flex|inline-grid|inline-table 参与内联级格式化上下文 IFC(inline formatting context)

外边距塌陷

### Float 浮动流

用float属性控制，脱流，做横向布局

### Positioning 定位流

用position属性控制，fixed和absolute脱离文档流可以自由定位、覆盖等

### Flex 弹性布局

一维空间布局

相关属性分为两类:
    1. 作用于父元素（flex container）
    2. 作用于子元素（flex items）

### Grid  网格布局

二维空间布局

相关属性分为两类:
    1. 作用于父元素（flex container）
    2. 作用于子元素（flex items）

### Multicol 多列布局

文本、内容的多列显示

## 层叠上下文

对HTML元素的三维构想

形成新的层叠上下文

层叠顺序

使用z-index的建议：
    1. 使用css变量或者预处理语言的变量，管理z-index的值
    2. 将预设间隔设置为10或者100，方便后续的插入

## 变形、过渡、动画

transform 2D变形
          3D变形

transition 相对于上面那个是动态的

animation 动画

动画性能：布局->绘制->合成

## 响应式设计

* 优先使用流式布局，如百分比、flex、grid等
* 使用响应式图片，匹配尺寸，节省带宽
* 使用媒体查询为不同的设备做适配
* 给移动端设备设置简单、统一的视口
* 使用相对长度，em、rem、vw作为长度度量

使用媒体查询的Tips
    1. 媒体查询同样遵守cascading层叠覆盖原则，min-和max-选择一个
    2. 由于设备的多样化逐渐不可枚举，断点的选择尽量根据内容选择
    3. 由于断点的增加会增加样式处理的复杂度，尽量减少断点

设备像素、参考像素和移动设备视口
    1. 设备像素（物理像素），和硬件相关，在屏幕从工厂出来的那一天就不变了 dpi：每英寸多少点 ppi：每英寸多少像素数
    2. 参考像素（CSS像素），其实是一个视角单位。浏览器根据硬件设备能够直接获取css像素 DPR（设备像素比）：描述的式未缩放的状态下，设备像素和CSS像素的初始比例关系
    3. viewport 默认情况下window.document.documentElement.clientWidth就是viewport宽度

常见的移动端viewport的设置
    1. 保持scale为1
    2. 保持scale放缩参数为1/dpr

相对长度的使用
    1. em在非font-size属性中使用相对于自身的字体大小
    2. rem 根元素的字体大小，比较适合在响应中使用
    3. vw和vh 视口宽度的1%

## CSS生态相关

语言增强：CSS预处理器 SCSS、less、Stylus

预处理器如何提高研发效率：
    1. 自定义变量
    2. 嵌套、作用域
    3. mixins、继承
    4. 操作符、条件/循环语句、自定义函数

### CSS后处理器

postcss

### CSS模块化：为了解决全局污染问题出现的方案，本质上是保证样式集合对应的选择器是唯一的，目前主流的单纯针对于防止全局污染的的方案大概有

    1. BEM命名规范通过
    2. vue-loader的scoped方案
    3. css Modules

#### css-in-js

styled-component机制浅析

1. 生成第一个classname作为componentID
2. 生成第二个classname作为唯一类名，使用stylis生成和唯一类名关联的CSS字符串
3. 唯一类名对印度css样式insert到head的style中
4. 将两个类名写道目标节点的class中

优点：

      1. 有效避免全局污染
      2. 复杂交互可以更加灵活的编写
      3. 首屏渲染无多余css阻塞

缺点：

      1. 学习成本
      2. 存在运行时的消耗
      3. css-in-js的库导致打包体积增大
      4. 代码可读性降低

#### 原子化CSS

倾向于小巧且用途单一的class，并以视觉效果命名

现有的库or框架
Tailwind、windicss、Tachyons

优点：

    1. 减少css体积
    2. 原子类复用率高
    3. 移动和删除节点变得容易
    4. 减少classname的命名复杂度

缺点：

    1. 增加html类名长度
    2. 初始使用时有学习和记忆成本
    3. 样式库的定义成本（并不完全是缺点）
