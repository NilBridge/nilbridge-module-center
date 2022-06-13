<div id="news"></div>

<script>
window.callbackcontentdtos= (res)=>{
    window.news = res;
    window.page = 0;
    document.getElementById('news').innerHTML+=res[window.page].abs;
    /*res.forEach(k=>{
        console.log(k);
        document.getElementById('news').innHTML+=k.abs;
    })*/
}
window.nextPage = ()=>{
    window.page+=1;
    document.getElementById('news').innerHTML=window.news[window.page].abs;
}
axios('https://cdn.mdeer.com/contentdtos.js?callback=callbackcontentdtos&t='+new Date()).then(
    dt=>{
        eval(dt.data);
    }
).catch(console.log);
</script>
<style>
.button {
  display: inline-block;
  border-radius: 4px;
  background-color: #f4511e;
  border: none;
  color: #FFFFFF;
  text-align: center;
  font-size: 28px;
  padding: 20px;
  width: 200px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
  vertical-align:middle;
}

.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.button span:after {
  content: '»';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.button:hover span {
  padding-right: 25px;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
}
</style>

<button class="button" onclick="nextPage()"><span>下一页 </span></button>
