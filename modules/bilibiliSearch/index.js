/*
http://api.bilibili.com/archive_stat/stat?aid=797486918&type=jsonp

http://api.bilibili.com/x/web-interface/view?bvid=BV1jy4y1r74k
*/
const { segment } = require("oicq")
const http = require('http');

function Start(api) {
    api.listen('onMainMessageReceived', e => {
        let res = e.raw_message.match(/(bv|BV)(.+)/);
        if (res == null) return;
        let bv = res[2];
        if(bv.includes('/')) bv = bv.split('/')[0];
        if(bv.includes('?')) bv = bv.split('?')[0];
        parseBid(bv,(err2,dt)=>{
            if(err2){
                e.reply('没有这个bv的说，检查一下吧',true);
            }else{
                e.reply([`${dt.title}\n上传者：${dt.owner.name}\n观看：${dt.stat.view}\n投币：${dt.stat.coin}`,segment.image(dt.pic)],true);
            }
        });
    });
    api.listen('onMainMessageReceived', e=>{
        let test = e.raw_message.match(/^(av|AV)([0-9]*)$/);
        if (test == null) return;
        http.get(`http://api.bilibili.com/x/web-interface/archive/stat?aid=${test[2]}`, res =>{
            let result = '';
            res.on("data", (gdata) => {
                result += gdata;
                //console.log(gdata);
            });
            res.on('end', () => {
                //console.log(result);
                let re = JSON.parse(result);
                if(re.code != 0){
                    e.reply('没有这个AV号的说，检查一下吧',true);
                    return;
                }
            
                e.reply(`对${test[0]}的查询结果：\nhttps://bilibili.com/video/${re.data.bvid}`,true);
            });
        }).on('error',()=>{});
    });
}
function parseBid(bid, callback) {
    http.get(`http://api.bilibili.com/x/web-interface/view?bvid=${bid}`, res => {
        let result = '';
        res.on("data", (gdata) => {
            result += gdata;
            //console.log(gdata);
        });
        res.on('end', () => {
            //console.log(result);
            let re = JSON.parse(result);
            if(re.code != 0){
                callback(re.message,null);
                return;
            }
            callback(null, re.data);
        });
    }).on('error', err => {
        callback(err, null);
    });
}

class bilibiliSearch extends NIL.ModuleBase{
    onStart(api){
        Start(api);
    }
}

module.exports = new bilibiliSearch;