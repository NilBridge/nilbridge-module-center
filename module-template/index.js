
class template extends NIL.ModuleBase{
	onStart(api){
		/*
		api.listen('onMainMessageReceived',(e)=>{
			e.reply(e.raw_message,true);  // 自动回复来自主群的信息
		})
		*/
		api.logger.info('模块模板加载成功！！');
	}
}

module.exports = new template;
