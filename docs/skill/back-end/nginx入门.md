---
id: Getting-Started-with-nginx
slug: /Getting-Started-with-nginx
title: nginx入门
date: 2020-09-08
authors: Victor
tags: [工具,后端]
keywords: [工具，后端]
---
## Nginx

### 什么是Nginx

Nginx 是一款 http 服务器 （或叫web服务器）

### 安装Nginx

如果使用的是宝塔，直接在后台的应用管理中就可以下载配置。

Mac系统使用Homebrew

安装

$ brew install nginx

卸载

$ brew uninstall nginx

验证是否安装成功

$ nginx -v

Windows系统安装可参见

<http://nginx.org/en/docs/windows.html>

### 使用Nginx

启动

    sudo nginx

停止

    sudo nginx -s stop

热启动

    sudo nginx -s reload

强制停止

    sudo pkill -9 ngix

### Nginx配置

1. /usr/local/etc/nginx/nginx.conf(默认配置文件路径)
2. /usr/local/var/www (默认的根目录)
3. /usr/local/Cellar/nginx/1.17.9 （安装路径）
4. /usr/local/var/log/nginx/error.log (默认的日志路径)

### 配置文件介绍

    server {  
            # 当nginx接到请求后，会匹配其配置中的service模块
            # 匹配方法就是将请求携带的host和port去跟配置中的server_name和listen相匹配
            listen       8080;        
            server_name  localhost; # 定义当前虚拟主机（站点）匹配请求的主机名

            location / {
                root   html; # Nginx默认值
                # 设定Nginx服务器返回的文档名
                index  index.html index.htm; # 先找根目录下的index.html，如果没有再找index.htm
            }
            }

server{ } 其实是包含在 http{ } 内部的。每一个 server{ } 是一个虚拟主机（站点）。

详情参见
>英文文档：<nginx.org/en/docs/>
>
>中文文档：<www.nginx.cn/doc/>

## 应用

[完全解答]<https://juejin.cn/post/6844904129987526663>
