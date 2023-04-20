---
id: linux-frontend
slug: /linux-frontend
title: 字节训练营linux笔记
date: 2023-4-20
authors: Victor
tags: [linux]
keywords: [linux]
---
<!--truncate-->

## Linux

### 计算机硬件

五大基本单元

### 操作系统 OS

管理计算机资源，用于用户与系统硬件之间交互

操作系统启动流程

1. BIOS->BIOS自检->Bootloader->OS
2. UEFI->Bootloader->OS

### Linux概论

#### linux版本

* 内核版本
* 发行版本 = 常用软件+Linux内核

查看内核版本：

1. uname -a
2. cat /proc/version

查看发行版本：

cat /etc/os-release

#### Linux应用领域

* 服务器
* 嵌入式和智能设备

#### 基本组成

1. 内核
2. shell
3. 文件系统
4. 应用程序

#### 体系结构

1. 用户空间
2. 内核空间

### 进程管理

* 进程是正在执行的一个程序或命令
* 进程有自己的地址空间，占用一定的系统资源
* 一个CPU核同一时间只能运行一个进程
* 进程由它的进程ID(PID)和它父进程的ID（PPID）唯一识别

--- shell

    #查看启动的nginx进程
    ps -ef | grep nginx

    #查看某个进程
    top -p 

    #关闭指定进程
    kill 

    #全部进程动态实时视图
    top

---

#### 进程调度

进程调度是指操作系统按某种策略或则跪着选择进程占用CPU进行运行的过程

### 文件系统

文件系统是操作系统中负责管理持久数据的子系统，负责把用户的文件存到磁盘硬件中，持久化的保存文件

#### 树状的目录结构

虚拟文件系统（VFS）

---shell

df -t

mount

---

### 用户权限

* 用户账户
* 组账户

---shell

w

groups

id

---

#### 文件权限

所有者
所在组
其他人

不同权限 读R 写W 执行X
