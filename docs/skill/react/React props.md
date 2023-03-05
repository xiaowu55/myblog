---
slug: react-props
title: React-Props
date: 2022-10-28
authors: Victor
tags: [react]
keywords: [react]
---
<!-- truncate -->

## React props

- 在父组件中可以直接在子组件中设置属性
- props是只读的不能修改

## 为什么用Props

如果将组件中的数据全部写死，将会导致组件无法动态设置，不具有使用价值。我们希望组件数据可以由外部设置，在组件间，父组件可以通过props（属性）向子组件传递数据

```jsx
<LogItem date={new Date()} desc={"学习前端"} time={"50"} />
<LogItem date={new Date()} desc={"哈哈"} time={"30"} />
```

```jsx
<h2 className="desc">{props.desc}</h2>
<div className="time">{props.time}分钟</div>
```

props是只读的不能修改

```jsx
 props.desc = '嘻嘻'; // 不能修改props中的属性
 console.log(props.desc);
```
