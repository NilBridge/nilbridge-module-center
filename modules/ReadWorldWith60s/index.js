const {segment} = require('oicq');
const api60s='http://api.qemao.com/api/60s/';
const cmd='今日60s';

class ReadWorldWith60s extends NIL.ModuleBase{
    onStart(api){
        api.logger.info('60s读世界加载成功 by phj233~~');
        api.listen('onMainMessageReceived',(e)=>{
            if(e.raw_message==cmd){
                let imgurl = api60s;
                let img60s=segment.image(imgurl);
                e.reply([`今日60s读懂世界:`,img60s],`~`);
            }
        
        });
    }
    onStop(){
   
    }
   }
   
   module.exports = new ReadWorldWith60s