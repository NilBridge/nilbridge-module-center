<script>
axios('https://api.iyk0.com/ysxw/').then(
    dt=>{
        dt.data.data.forEach(item=>{
            document.getElementById('news').innerHTML+=`<br><a href="${item.url}">${item.title}</a><br>`
        })
    }
).catch(err=>{
    document.getElementById('news').innerHTML = `<div id="err_box">API调用失败</div>`;
})
</script>
<div id="news">

</div>
