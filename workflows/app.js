const axios = require('axios').default;
const info = require('../docs/info.json');
const https = require('https');
const agent = new https.Agent({  
    rejectUnauthorized: false
  });
var sessionKey;

axios.post('http://mc.lition.online:3999/verify',{qq:2837945976,verifyKey:'114514'}).then(dt=>{
    sessionKey = dt.data.sessionKey;
    //sendMessage('认证成功：获取到工作ID ： '+sessionKey);
}).catch(res=>{
    throw new Error('无法认证');
})

async function check(v,owner,repo){
    let options = {
        url: `https://api.github.com/repos/${owner}/${repo}/releases/latest`,
        method: 'GET',
        headers: {
            'Authorization':'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',
            'User-Agent': 'Lition802',
            'Content-Type': 'application/json',
            'accept': 'application/vnd.github.v3+json',
        }
    };
    await axios.get(options.url,{headers:options.headers, httpsAgent: agent }).then(dt=>{
        if(dt.status == 200){
            console.log(`[${repo}]`,dt.data.name,'->>',v)
            //sendMessage(`模块[${repo}] 有新版本->[${dt.data.name}] !`);
        }else{
            sendMessage(`模块[${repo}] 检测失败->[${dt.status}] !`)
        }
    }).catch(err=>{
        console.log(err);
    });
    console.log(repo,'检测完毕');
}

function sendMessage(raw){
    axios.post('http://mc.lition.online:3999/sendGuildMessage',{
        sessionKey,
        "messageChain": [{"type": "text","raw": '[ActionBot] '+raw}],
	    "guild_id": '41929441648861097',
        "channel_id":'7008946'
    }).catch(err=>console.log);
}


for(let mod in info.modules){
    let tmp = info.modules[mod];
    if(tmp.github_check){
        //console.log(mod,tmp.version);
        check(tmp.version,tmp.github_check.owner,tmp.github_check.repo_name);
    }
}