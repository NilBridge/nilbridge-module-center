
# 如何发布我的模块？

本仓库用于收集 nilbridge 相关社区插件以及使用了其他语言 SDK 的项目

如果您有这类项目，欢迎提交 Pull request 将您的项目添加到这里

**注意：本仓库仅接受开源项目的仓库地址, 如 https://github.com/nilbridge/bilibiliSearch**

**注意：请遵守开源协议并将你的项目开源许可证设置为AGPL-3.0**

## 准备工作

- git客户端
- python`v3.7.10`或更高
- node`v16.15`或更高
- 梯子/加速器/魔法

## fork本仓库

![](/img/1.png)
![](/img/2.png)

## clone项目到本地

![](/img/3.png)

``` bash
git clone --recursive https://github.com/{你的用户名}/nilbridge-module-center.git
```

## 关联仓库

在clone下来的文件夹执行

```bash
git submodule add <你的仓库git地址> <文件夹路径>
```

注意：
- 仓库地址为后缀有`.git`的地址
- 文件夹路径为`modules/{模块名称}`

此步骤一旦输入错误，回退非常麻烦。

如果您输入了错误的文件路径，请参考[这篇文章](https://www.cnblogs.com/Akkuman/p/10911779.html)来移除子模块。

## 构建并推送

执行`build_and_push.bat`

## 发起pr，等待合并

进入你的仓库的`Pull requests`界面

![](/img/4.png)

发起新的合并请求，等待合并

![](/img/5.png)

## 注意事项

1. 在构建时需要您的服务器能访问**api.github.com**
2. 如果您发现您的模块没有被模块中心所收录，请查看您的`package.json`是否填写了`repository`项
3. 您的模块主分支务必设置为`main`