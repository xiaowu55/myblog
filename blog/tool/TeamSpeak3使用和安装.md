# TeamSpeak3使用和安装

**TeamSpeak** 是一款 VoIP 语言通话软件，使用者可以用耳机和麦克风，通过客户端软件连线到指定的服务器，与在服务器内频道的其他使用者进行通话。是一种很像电话会议的方式。 通常 TeamSpeak 的使用者大多为多人连线游戏的玩家，与同队伍的玩家进行通讯。在游戏的对战方面，具有低内存占用、低延迟、高清晰度、高可靠性等优点，是一种非常好的游戏交流方式。可以类比于yy，但是更加纯净。

由于朋友的麦在KooK中总是电流麦，且kook越发臃肿，遂准备集体迁入TeamSpeak。

## 该怎么加入

多数人都只需要了解到这一步，加入到别人已经搭建好的服务器中即可。

### 1. 下载TeamSpeak客户端

首先，我们需要下载 TeamSpeak 客户端，以便于您可以连接到服务器。您可以在这里下载 TeamSpeak  3.6.1客户端安装包。

[Windows 64位]: https://teamspeak-mirror.wevg.org/releases/client/3.6.1/TeamSpeak3-Client-win64-3.6.1.exe
[MacOS 下载链接]: https://teamspeak-mirror.wevg.org/releases/client/3.6.1/TeamSpeak3-Client-macosx-3.6.1.dmg
[Linux 64位 下载链接]: https://teamspeak-mirror.wevg.org/releases/client/3.6.1/TeamSpeak3-Client-linux_amd64-3.6.1.run

### 2. 下载汉化包（可选）

下面是汉化包的下载链接，在你安装好TeamSpeak的客户端并且打开后双击即可

[汉化包下载链接]: https://dl.tmspk.wiki/https:/github.com/VigorousPro/TS3-Translation_zh-CN/releases/download/snapshot/Chinese_Translation_zh-CN.ts3_translation

### 3. 连接到服务器

如果是我的朋友的话我已经搭建好了服务器，只需要点击左上角的连接，在服务器别名或地址下输入我搭建好的服务器voice.wujiaze.cn即可，服务器密码暂时没有设置，昵称设置为你心怡的昵称即可

## 该如何搭建服务器

如果你也想搭建一个属于自己的TS3服务器请继续看下去

### 1. 购买一个服务器

首先需要一个服务器，可以从云服务商(腾讯云，阿里云，华为云等)购买，也可以自建NAS内网穿透，但后者太过复杂。如果只想快速搭建，使用云服务商购入即可，新客优惠或者蹲双11等活动都不算太贵。

### 2. 系统的安装

我是用的个人博客的服务器，用的宝塔系统

### 3. 准备阶段

teamspeak不推荐使用root用户所以我们新建一个用户

```shell
useradd teamspeak
```

去下载最新的teamspeak版本（很重要，有些版本无法连接服务器）

https://www.teamspeak.com/en/downloads/#server

选择你系统的版本，我用的是宝塔所以下载Linux SERVER 64-BIT 3.13.7，后面把文件传上去解压即可

也可以使用命令行

```shell
wget https://files.teamspeak-services.com/releases/server/3.13.7/teamspeak3-server_linux_amd64-3.13.7.tar.bz2 && tar -xjvf teamspeak3-server_linux_amd64-3.13.7.tar.bz2 && rm teamspeak3-server_linux_amd64-3.13.7.tar.bz2
```

赋予teamspeak这个用户权限，并进入

```shell
chown -R teamspeak:teamspeak teamspeak3-server_linux_amd64 && cd ./teamspeak3-server_linux_amd64 && su teamspeak
```

同意许可条款

```shell
echo "accept" > .ts3server_license_accepted
```

自动配置数据库并启动

```shell
./ts3server_startscript.sh start
```

配置完后会出现一段消息，保存下来，token之后会用到

![image-20231209173908405](E:/my-blog/my-blog/blog/tool/assets/image-20231209173908405.png)

完成了