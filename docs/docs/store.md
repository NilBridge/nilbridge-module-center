*排序不分先后，根据api响应速度排序*

<div id="Modules">
    <p>加载中...</p>
</div>


<script>
axios('/info.json').then((dt)=>{
    document.getElementById("Modules").innerHTML = '';
    for(let i in dt.data.modules){
        let tmp = dt.data.modules[i];
        if(tmp.github_check != undefined){
            getGithub(tmp.github_check.owner,tmp.github_check.repo_name);
        }
    }
}).catch(err=>{
    let tg = TGTool();
    tg.error('获取API失败！');
    document.getElementById("Modules").innerHTML = `<div id="err_box">${err}</div>`;
})
</script>
<html>
  
