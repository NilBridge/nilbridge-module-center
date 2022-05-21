const {segment} = require('oicq');
const request = require('sync-request');
const cfg = require("../../modules/vanilla/config.json");
const cron = require('node-cron');
const cmd = '今日60s';

const api60s="https://api.03c3.cn/zb/api.php";
const loafJob='https://api.j4u.ink/proxy/remote/moyu.json';
//以下直接返回图片
const api60s2="https://api.qqsuu.cn/api/60s";
const api60s3="";

function getImgData(apiUrl){
    var img = request('GET',apiUrl);
    var getUrl=JSON.parse(img.getBody('utf8'));
    return getUrl.imageUrl;
}
function returnMoyu(apiurl){
    var img = request('GET',apiurl);
    var returnData = JSON.parse(img.getBody());
    let moyu=segment.image(returnData.data.moyu_url);
    return moyu;
}

function returnImg(){  
    //let img60s=segment.image(api60s2);            
    //若发送不出图片请删掉上面那一行代码前面的“//”  并把下面那行代码前面加上“//”  若还是发不出来请在nb2频道找phj233
    let img60s=segment.image(getImgData(api60s));  
    return img60s;
}
class readWorldWith60s extends NIL.ModuleBase{
    onStart(api){
        api.logger.info('60s读世界 加载成功 ');
        api.listen('onGroupMessageReceived',(e)=>{
            if(e.raw_message==cmd){
                e.reply([`今日60s看世界:`,returnImg()],`~~`);
            }
        });
        cron.schedule('5 30 8 * * *', () => {
            NIL.bots.getBot(cfg.self_id).sendGroupMsg(cfg.group.chat,[`今日60s看世界:`,returnImg()]);
        });
        cron.schedule('5 30 15 * * *', () => {
            NIL.bots.getBot(cfg.self_id).sendGroupMsg(cfg.group.chat,[`今日摸鱼人日历:`,returnMoyu(loafJob)]);
        });
    }
    onStop(){
   
    }
   }
module.exports = new readWorldWith60s;