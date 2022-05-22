const request = require("sync-request");

function onStart(api){
    api.regCMD('motdpe','查询基岩板服务器',(arg)=>{
        let obj = request('GET',`http://motdbe.blackbe.xyz/api?host=${arg[0]}`);
        if(obj.statusCode == 200){
            let data = JSON.parse(obj.getBody('utf8'));
            if(data.status == 'online'){
                return [
                    `[MCBE服务器信息]`,
                    `协议版本：${data.agreement}`,
                    `游戏版本：${data.version}`,
                    `描述文本：${data.motd}`,
                    `在线人数：${data.online}/${data.max}`,
                    `存档名称：${data.level_name}`,
                    'motdapi来自motd.blackbe.xyz'
                ]
            }else{
                return '服务器离线';
            }
        }else{
            return '云黑api连接失败，经检查motdbe.blackbe.xyz是否可以访问';
        }
    });
}

function onStop(){
}

module.exports = {
    onStart,
    onStop
};
