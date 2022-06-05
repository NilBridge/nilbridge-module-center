
# 如何发布我的模块？

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