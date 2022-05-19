# CronJob
QQ machine group server timing task system plug-in based on node-cron

需要 Nilbrige2 和 node-cron 前置



## 安装教程

### GitHub安装

```
downloadZip，得到的文件夹放入机器人的modules目录即可
```

### Minebbs安装

```
将得到的压缩包解压,其中文件直接放入机器人根目录即可
```

## 对象类型

此插件的定时任务主要依赖于用户自己写json和cron表达式来构建，下面将会有简单的教学.

在此之前你需要基本掌握json和cron

### 属性释义

| 对象属性               | 释义             | 参数    | 示例               |
| ---------------------- | ---------------- | ------- | ------------------ |
| type(组合任务对象中)   | 组合任务对象类型 | String  | "GROUP"/"JOB"      |
| description            | 功能描述         | String  | "这是一段功能描述" |
| enable                 | 是否启用某功能   | Boolean | true/false         |
| cronEx                 | cron表达式       | String  | "* * * * * *"      |
| serverName             | 服务器名称       | String  | "生存服务器"       |
| chatMsg                | 聊天信息         | String  | "这是一段聊天信息" |
| cmd                    | BDS指令          | String  | "list"             |
| type(服务器任务对象中) | 表示开关服操作   | int     | -1是关服 1是开服   |

### 组合任务对象

#### 任务组对象

```json
"定时消息":{
    "enable": true,
    "type": "GROUP",
    "description": "让玩家爬去学习",
    "jobs": {}
}
```

####  任务对象

```json
"发消息": {
	"enable": true,
	"type":"JOB",
	"severName": "服务器名称",
	"cronEx": "*/20 * * * * *",
}
```



### 基本任务对象

#### 消息任务对象

```json
"chatJob":{
	"enable":true,
	"chatMsg":"好好学习，天天向上"
}
```

#### 命令任务对象

```json
"cmdJob":{
	"enable":true,
	"cmd":"title @a title 好好学习，天天向上"
}
```

#### 服务器任务对象

```json
"serverJob":{
	"enable":true,
	"type":-1 
}
```

### 总结:

```
任务组对象>单任务对象>基本任务对象
```





## 使用教程

### 单功能任务组

任务组可以涵盖许多任务组合执行，也可以只包含一个任务。无论如何，在创建任务之前必须先创建一个任务组。

接下来我们创建一个基本的任务组

```json
"定时消息": {
    "enable": true,
    "type": "GROUP",
    "description": "定时通知玩家注意休息",
    "jobs": {}
}
```

接下来可以创建任务对象了,

```json
"发消息": {
	"enable": false,
	"type":"JOB",
	"severName": "生存服务器",
	"cronEx": "*/20 * * * * *",
}
```

接下来创建一个聊天任务对象

```json
"chatJob": {
    "enable": true,
    "chatMsg": "游玩时间不要太长哦~,注意休息"
}
```

将聊天任务对象放至任务对象中

```json
"发消息": {
	"enable": false,
	"type":"JOB",
	"severName": "生存服务器",
	"cronEx": "*/20 * * * * *",
	"chatJob": {
        "enable": true,
        "chatMsg": "游玩时间不要太长哦~,注意休息"
    }
}
```

将任务对象放至jobs中

```json
"定时消息": {
    "enable": true,
    "type": "GROUP",
    "description": "定时通知玩家注意休息",
    "jobs": {
        "发消息": {
        "enable": false
        "type":"JOB",
        "severName": "生存服务器"
        "cronEx": "*/20 * * * * *",
        "chatJob": {
            "enable": true,
            "chatMsg": "游玩时间不要太长哦~,注意休息"
        }
    	}
    }
}
```

这样便创建了一个基本的定时任务组,此任务组的功能是每间隔20秒向群中发送消息:游玩时间不要太长哦~,注意休息，配合机器人的群服聊天互通功能，可以达到通知服务器玩家的效果。



### 多功能任务组

为了达到更多的功能，需要对更多的任务进行组合使用，这就需要用到了多功能任务组

#### 多功能单任务组

多功能单任务组的区别只是在任务对象中增加了更多的基本任务对象。

例如 在一个任务对象中同时存在聊天任务对象和服务器任务对象，表示于凌晨一点关闭服务器

```json
"关服发消息": {
	"enable": true,
	"type":"JOB",
	"severName": "生存服务器",
	"cronEx": "0 0 1 * * *",
	"chatJob": {
        "enable": true,
        "chatMsg": "服务器正在关闭,下次将于3分钟后开启"
    },
    "serverJob":{
        "enable":true,
        "type":-1
    }
}
```

表示于凌晨1点零三分开启服务器

```json
"开服发消息": {
	"enable": true,
	"type":"JOB",
	"severName": "生存服务器",
	"cronEx": "0 3 1 * * *",
	"chatJob": {
        "enable": true,
        "chatMsg": "服务器正在开启,下次将于次日凌晨1点关闭"
    },
    "serverJob":{
        "enable":true,
        "type":1
    }
}
```

#### 多功能多任务组

即在一个任务组中存在多个任务对象，每个任务执行的时间不同，组合起来即可达到不同的效果

将以上两个任务对象放入jobs中

```json
"定时重启": {
    "enable": true,
    "type": "GROUP",
    "description": "定时通知玩家注意休息",
    "jobs": {
        "关服发消息": {
            "enable": true,
            "type":"JOB",
            "severName": "生存服务器",
            "cronEx": "0 0 1 * * *",
            "chatJob": {
                "enable": true,
                "chatMsg": "服务器正在关闭,下次将于3分钟后开启"
            },
            "serverJob":{
                "enable":true,
                "type":-1
            }
        },
        "开服发消息": {
            "enable": true,
            "type":"JOB",
            "severName": "生存服务器",
            "cronEx": "0 3 1 * * *",
            "chatJob": {
                "enable": true,
                "chatMsg": "服务器正在开启,下次将于次日凌晨1点关闭"
            },
            "serverJob":{
                "enable":true,
                "type":1
            }
        }
    }
}
```

以上组合便实现了服务器在每天凌晨1点自动定时重启的功能。

当然以上任务组合能做的事不止这些，还请自己探索。

## 注意事项

**1.在以上的对象中，如果enable为false,则无论其他项是否填写，都不会执行**

**2.在一个任务对象中,服务器任务对象和命令任务对象不能同时存在**

**3.如果你实在不会，可以进机器人频道交流**
