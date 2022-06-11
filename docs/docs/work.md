# 本站实现方法

## GitSubmodule

![](/img/7.png)

在github仓库中可以看到`modules`文件夹中均为`submodule`

## GitHub Action

![](/img/8.png)

定时Action会在北京时间**5时**和**17时**自动构建模块，并推送到github-page

保证模块及时与release同步

## 构建流程

1. 初始化submodule，使用当前时间字符串生成临时文件夹id
2. 遍历modules文件夹，解析package.json
3. 若填写了`repository`项，则进行github检查，获取最新release_tag，否则跳到步骤5
4. 若package.json中的`version`与最新的release_tag不一致，则执行`git pull`
5. 执行`npm i`装载模块到文件夹中
6. 打包文件夹为`.tar`，然后使用`gzip`压缩为`.nbpack`文件
7. 移动`.nbpack`文件到临时文件夹
8. 生成`info.json`
9. 推送临时文件夹到[`gh-pages`](https://github.com/NilBridge/nilbridge-module-center/tree/gh-pages/)分支

## 模块市场

使用js动态加载网页中的数据

1. 请求[info.json](http://modules.nilbridge.site/info.json)
2. 根据作者和仓库名称请求github API
3. 获取数据后，动态加载网页

*卡片样式来自[hexo-github-repo-tag](https://github.com/JoJoJotarou/hexo-github-repo-tag)*