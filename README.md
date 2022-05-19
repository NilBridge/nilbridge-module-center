# nilbridge-module-center

这里是NilBridge的插件中心

需要发布的插件位于`modules`文件夹

# 如何发布我的插件？

1. fork本仓库
2. clone项目到本地
3. 在项目根目录执行`pip install -r requirements. txt`安装依赖
4. 把要发布的模块放到`modules`文件夹
5. 执行`python main.py`进行构建
6. push到你的仓库，发起pr，等待合并

**注意：在构建时需要您的服务器能访问api.github.com**