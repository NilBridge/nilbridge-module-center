这里是NilBridge的模块中心，为开发者方便更新而建立，您也可以在这里下载模块

# 如何使用本仓库

您需要访问`module.nilbridge.site/info,json`

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
