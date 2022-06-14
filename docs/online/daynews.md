<script>
axios('https://api.iyk0.com/60s/').then(
dt=>{
    document.getElementById('pic').src = dt.data.imageUrl;
}
).catch(err=>{
    console.log(err);
    document.getElementById('news').innerHTML = `<div id="err_box">API调用失败</div>`;
})
</script>

<img id="pic" src="https://lition.online/img/loading.gif"></img>

<div id="news">

</div>