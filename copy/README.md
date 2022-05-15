本仓库是NilBridge的更新仓库，采用jsdelivr进行全球加速

本仓库使用完全免费

# 使用方法

仓库有以下几个接口

```
[GET] /lastest_build.json
```

``` json
{
     {
     "success": true,  // 是否构建成功
     "Date": "2022-05-15T03:44:01.542Z",  // 最后构建时间
     "modules": {
          "BackupHelper": {
               "succees": true
          },
          "bilibiliSearch": {
               "succees": true
          },
          "succees": true
     }
}
}
```
如果有模块构建失败，会显示这样的内容

``` json
{
     "success": true,
     "Date": "2022-05-15T03:46:13.885Z",
     "modules": {
          "BackupHelper": {
               "succees": false,  //构建失败
               "err": {  //错误信息
                    "errno": -4058,
                    "syscall": "open",
                    "code": "ENOENT",
                    "path": "C:\\Users\\Lition\\Desktop\\ModuleShop\\modules_publish\\BackupHelper\\package.json"
               }
          },
          "bilibiliSearch": {
               "succees": true
          }
     }
}
```