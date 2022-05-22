
# 如何发布我的插件？

1. fork本仓库

![](/doc/img/1.png)
![](/doc/img/2.png)

2. clone项目到本地

![](/doc/img/3.png)

``` bash
git clone https://github.com/{你的用户名}/nilbridge-module-center.git
```

3. 关联仓库

在clone下来的文件夹执行

```bash
git submodule add <你的仓库git地址> <文件夹路径>
```

注意：
- 仓库地址为后缀有`.git`的地址
- 文件夹路径为`modules/{模块名称}`

4. 构建并推送

执行`build_and_push.bat`

5. 发起pr，等待合并

进入你的仓库的`Pull requests`界面

![](/doc/img/4.png)

发起新的合并请求，等待合并

![](/doc/img/5.png)

注意事项
1. 在构建时需要您的服务器能访问**api.github.com**
2. 如果您发现您的模块没有被模块中心所收录，请查看您的`package.json`是否填写了`repository`项