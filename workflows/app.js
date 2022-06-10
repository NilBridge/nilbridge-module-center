const axios = require('axios').default;
const info = require('../docs/info.json');
var sessionKey;

axios.post('http://mc.lition.online:3999/verify',{qq:2837945976,verifyKey:'114514'}).then(dt=>{
    sessionKey = dt.data.sessionKey;
    sendMessage('认证成功：获取到工作ID ： '+sessionKey);
}).catch(res=>{
    throw new Error('无法认证');
})

function check(v,owner,repo){
    axios(`https://api.github.com/repos/${owner}/${repo}/releases/latest`).then(dt=>{
        if(dt.status == 200){
            if(dt.data.name == v)return
            sendMessage(`模块[${repo}] 有新版本->[${dt.data.name}] !`);
        }else{
            // send
        }
    }).catch(err=>{
        console.log(err);
    })
}

function sendMessage(raw){
    axios.post('http://mc.lition.online:3999/sendGuildMessage',{
        sessionKey,
        "messageChain": [{"type": "text","raw": '[ActionBot]'+raw}],
	    "guild_id": '41929441648861097',
        "channel_id":'7008946'
    }).catch(err=>console.log);
}


for(let mod in info.modules){
    let tmp = info.modules[mod];
    if(info.github_check){
        check(tmp.version,tmp.github_check.owner,tmp.github_check.repo_name);
    }
}