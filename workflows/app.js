const axios = require('axios').default;
const info = require('../docs/info.json');


axios.post('http://mc.lition.online:3999/verify',{qq:2837945976,verifyKey:'114514'}).then(dt=>{
    let sessionKey = dt.data.sessionKey;
    axios.post('http://mc.lition.online:3999/sendGuildMessage',{
        sessionKey,
        "messageChain": [{
		"type": "text",
		"raw": "[NilBridge-module-center] 构建已开始"
	    }],
	    "guild_id": '41929441648861097',
        "channel_id":'7008946'
    }).then(re=>{
        console.log(re.data);
    });
}).catch(res=>{

})