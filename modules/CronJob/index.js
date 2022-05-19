const buffer = require("buffer");
const CronJob=require('cron').CronJob;
const SELF_ID=NIL._vanilla.cfg.self_id;//配置文件中的QQ
const MAIN_GROUP_ID=NIL._vanilla.cfg.group.main;//配置文件中的主群QQ
const DIR_PATH='./Data/CronJob'//插件文件夹
const DATA_PATH='./Data/CronJob/data.json';//数据文件
const TIME_ZONE='Asia/Hong_Kong';//默认时区
const TYPE_GROUP='GROUP';//类型
const TYPE_JOB='JOB';
const ENCODE="utf8";//编码
const LOGGER = new NIL.Logger("CronJob");//日志对象
const INIT_DATA= {
    "定时开关服": {
        "enable":true,
        "type":"GROUP",
        "description":"定时开关服,并在开关服前进行文字提示",
        "jobs": {
            "发消息": {
                "enable": true,
                "type":"JOB",
                "severName": "",
                "cronEx": "*/20 * * * * *",
                "chatJob": {
                    "enable": true,
                    "chatMsg": "测试"
                },
                "cmdJob": {
                    "enable": false,
                    "cmd": ""
                },
                "serverJob": {
                    "enable": false,
                    "type": 1
                }
            },
            "开服": {
                "enable": false,
                "type":"JOB",
                "severName": "生存服务器",
                "cronEx": "0 13 * * * *",
                "chatJob": {
                    "enable": true,
                    "chatMsg": "服务器即将开启..."
                },
                "cmdJob": {
                    "enable": false,
                    "cmd": ""
                },
                "serverJob": {
                    "enable": true,
                    "type": 1
                }
            },
            "关服": {
                "enable": false,
                "type":"JOB",
                "severName": "生存服务器",
                "cronEx": "0 15 * * * *",
                "chatJob": {
                    "enable": true,
                    "chatMsg": "服务器即将关闭..."
                },
                "cmdJob": {
                    "enable": false,
                    "cmd": ""
                },
                "serverJob": {
                    "enable": true,
                    "type": -1
                }
            },
            "执行list": {
                "enable": true,
                "type":"JOB",
                "severName": "生存服务器",
                "cronEx": "*/30 * * * * *",
                "chatJob": {
                    "enable": true,
                    "chatMsg": "即将执行命令..."
                },
                "cmdJob": {
                    "enable": true,
                    "cmd": "list"
                },
                "serverJob": {
                    "enable": false,
                    "type": -1
                }
            }
        }

    }
}

let cronJobData=null;//数据文件读取的data
let cronGroupMap=new Map();//任务组map



function main(){//启动函数
    try{
        init();
        configFileParsing();
        loadGroupFromCronData();
        pluginsLoadingLog();
    }catch (err){
        LOGGER.error("定时任务加载失败:"+err);
    }
}

function pluginsLoadingLog(){
    LOGGER.info("插件加载完毕");
    LOGGER.info("author:Stranger");
    LOGGER.info("Version:1.0.3");
}

/**
 * @description IO操作
 */

function init(){//初始化配置文件
    if (!NIL.IO.exists(DIR_PATH))
        NIL.IO.createDir(DIR_PATH);
    if (!NIL.IO.exists(DATA_PATH))
        NIL.IO.WriteTo(DATA_PATH,JSON.stringify(INIT_DATA));
}

function configFileParsing(){
    let buffer=NIL.IO.readFrom(DATA_PATH,ENCODE);
    if (!buffer)return;
    cronJobData=JSON.parse(buffer);
}


/**
 * @description 定时任务分配
 */

function loadGroupFromCronData(){//加载所有的定时任务组
    if (!cronJobData){
        LOGGER.error("插件启动失败!请检查./Data/CronJob/data.json路径是否完整/数据文件格式是否正确");
        return;
    }
    let groupNames=Object.keys(cronJobData);
    groupNames.forEach(groupName=>{
        let group = cronJobData[groupName];
        if (!group.enable || group.type !== TYPE_GROUP)return;

        let jobs = group.jobs;
        let cronGroup = assignJobGroup(groupName,jobs);

        if (!cronGroup || !jobs){
            LOGGER.error(`定时任务组 ${groupName} 加载失败:数据异常!`);
        }else {
            cronGroupMap.set(groupName,cronGroup);
            LOGGER.info(`定时任务组 ${groupName} 成功加载! 共读取 ${Object.keys(jobs).length} 个 定时任务,成功加载 ${Object.keys(cronGroup).length} 个定时任务`);
        }
    })
    LOGGER.info(`共读取 ${groupNames.length} 个 任务组,成功加载 ${cronGroupMap.size} 个`);
}


function assignJobGroup(groupName,jobs){//根据任务组返回分配定时任务组对象
    if (!jobs)return null;
    let jobNames = Object.keys(jobs);
    let cronGroup={};

    jobNames.forEach(jobName=>{
        let job = jobs[jobName];
        if (!job.enable || job.type !== TYPE_JOB)return;
        let cronJob = createCronJob(//创建定时任务
            jobName,
            job.cronEx,
            job.severName,
            job.chatJob,
            job.cmdJob,
            job.serverJob
        );
        if (cronJob)
            cronGroup[jobName]=cronJob;//将定时任务分配至定时任务组
    });

   return cronGroup;
}

function createCronJob(jobName,cronEx,serverName,chatJob,cmdJob,serverJob) {//创建定时任务
    if (isConflictJobs(chatJob,cmdJob,serverJob)){
        LOGGER.error(`定时任务 ${jobName} 分配失败:任务功能冲突!`);
        return null;
    }
    let cronJob =  new CronJob(cronEx, () => {//创建新的定时任务
        LOGGER.info(`定时任务 ${jobName} 已触发, 正在执行回调...`);
        executeChatJob(chatJob);
        executeCmdJob(serverName,cmdJob);
        executeServerJob(serverName,serverJob);
    }, null, false, TIME_ZONE);

    if (cronJob){
        LOGGER.info(`定时任务 ${jobName} 分配成功,已加载至任务组!`);
        return cronJob;
    }else {
        LOGGER.error(`定时任务 ${jobName} 分配失败:数据异常!`);
        return null;
    }
}

function startJobInCronGroup(key,cronGroup){
    if (!cronGroup){
        LOGGER.error(`定时任务组 ${key} 启动失败!`);
        return;
    }

    LOGGER.info(`定时任务组 ${key} 启动中...`);
    for (let jobName in cronGroup){
        let cronJob = cronGroup[jobName];
        if (cronJob){
            cronJob.start();
            LOGGER.info(`定时任务 ${jobName} 启动 成功 `);
        }
    }
}

function startAllJobs(){//将所有添加至任务列表中的任务开启
    let keys = [...cronGroupMap.keys()];
    keys.forEach(key=>{
        let cronGroup = cronGroupMap.get(key);
        startJobInCronGroup(key,cronGroup);
    })
}

/**
 * @description 底层操作封装
 */

function isConflictJobs(chatJob,cmdJob,serverJob){//判断任务之间是否相互冲突
    return (cmdJob && serverJob ) && (cmdJob.enable && serverJob.enable);//命令任务与服务器任务不能同时执行
}

function executeChatJob(chatJob){//执行聊天任务
    if (!chatJob || !chatJob.enable)return;
    LOGGER.info(`正在向主群 发送消息 ${chatJob.chatMsg}`);
    sendMsgToMainGroup(chatJob.chatMsg);
}

function executeCmdJob(serverName,cmdJob){//执行命令任务
    if (!cmdJob || !cmdJob.enable)return;
    LOGGER.info(`正在向服务器 ${serverName} 发送命令 ${cmdJob.cmd}`);
    sendCmdToServer(serverName,cmdJob.cmd);
}

function executeServerJob(serverName,serverJob){//执行服务器任务
    if (!serverJob || !serverJob.enable)return;
    LOGGER.info(`正在向服务器 ${serverName} 发送操作 ${serverJob.type>0?'开启': '关闭' }`);
    sendOperationToServer(serverName,serverJob.type);
}

function sendMsgToMainGroup(msg){//向主群发送消息
    NIL.bots.getBot(SELF_ID).sendGroupMsg(MAIN_GROUP_ID,msg);
}

function sendCmdToServer(serverName,cmd){//向服务器发送一条命令并将运行结果发送主群
    NIL.SERVERS.get(serverName).sendCMD(cmd,sendMsgToMainGroup);
}

function sendOperationToServer(serverName,type){//向服务器发送开关服操作
    let server=NIL.SERVERS.get(serverName);
    type>0?server.sendStart():server.sendStop();
}

/**
 * @description 初始化数据并执行
 */

main();
module.exports = {
    onStart(api){api.listen('onRobotOnline',startAllJobs)},//机器人登陆成功后才会开启任务
    onStop(){}
}
