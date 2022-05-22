
# 如何发布我的插件？

1. fork本仓库
2. clone项目到本地
3. 在项目根目录执行`pip install -r requirements.txt`安装依赖
4. 把要发布的模块放到`modules`文件夹
5. 执行`python main.py`进行构建
6. push到你的仓库，发起pr，等待合并

注意事项
1. 在构建时需要您的服务器能访问**api.github.com**
2. 如果您发现您的模块没有被模块中心所收录，请查看您的`package.json`是否填写了`repository`项