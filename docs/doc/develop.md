# 如何使用本仓库

您需要访问`http://modules.nilbridge.site/info.json`

为了方便访问**未开启**强制https

里面记录着本站的构建情况和模块收录

``` json
{
     "build_time": "2022-05-19 19:15:47",  //上一次构建时间
     "modules": {  //收录的模块
          "backuphelper": {
               "version": "1.0.0",  //站内版本
               "author": "Lition",  //作者
               "github_check": {  //git自动检查
                    "success": true,  //是否成功
                    "need_update": true,  //是否与github最新release版本不一致（可能github新也可能站内是新的，不一定）
                    "new": "1.1.2"  //github上的release版本号
               },
               "build": {
                    "success": true,  //.nbpack文件是否构建成功
                    "path": "/1f64751306ed76c15995fbfc79fbf78d/backuphelper.nbpack"  //路径
               }
          },
          "bilibilisearch": {
               "version": "1.0.0",
               "author": "Lition",
               "github_check": {
                    "success": false,  //false意味着git自动检查失败了
                    "err_code": 404   //404意味着找不到最新release或者git仓库地址有误
               },
               "build": {
                    "success": true,
                    "path": "/1f64751306ed76c15995fbfc79fbf78d/bilibilisearch.nbpack"
               }
          }
     },
     "id": "1f64751306ed76c15995fbfc79fbf78d"  //总路径
}
```

# 下载模块

有了上面的信息后，我们就可以进行下载模块了

在`build`项的`success`为`true`的前提下，访问`path`项

比如上边`bilibilisearch`的`path`是`/1f64751306ed76c15995fbfc79fbf78d/bilibilisearch.nbpack`

直接访问`http://modules.nilbridge.site/1f64751306ed76c15995fbfc79fbf78d/bilibilisearch.nbpack`就可以下载了

但是`github.io`在国内的访问速度不尽人意，不过我们可以用jsdelivr提供的加速服务进行全球加速

虽然jsdelivr的缓存很难绕过，但是我们可以用更新访问路径的方式来跳过缓存

拼接url：`https://fastly.jsdelivr.net/gh/NilBridge/nilbridge-module-center@master/docs{path}`

这里的`path`就是上面`build`中的`path`，直接访问就可以通过jsdelivr提供的高速cdn获取到文件

# 解压模块

模块下载下来之后是`.nbpack`格式，其实就是`.tar.gz`

用`tgz`的方式进行解压就可以用了

具体可以使用`compressing`模块来解压

具体详见[npm](https://www.npmjs.com/package/compressing)

# 如何发布我的插件？

1. fork本仓库
2. clone项目到本地
3. 在项目根目录执行`pip install -r requirements.txt`安装依赖
4. 把要发布的模块放到`modules`文件夹
5. 执行`python main.py`进行构建
6. push到你的仓库，发起pr，等待合并

**注意：在构建时需要您的服务器能访问api.github.com**