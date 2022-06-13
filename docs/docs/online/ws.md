<script>
swal("输入您要连接的Url:", {
		content: "input",
	})
	.then((value) => {
		ws = new WebSocket(value);
		ws.onopen = () => {
			in_ws = true;
			let t = TGTool();
			t.success('连接成功');
			show(value + ' 连接成功');
		};
		ws.onmessage = (evt) => {
			show('<< ' + evt.data);
		}
		ws.onclose = () => {
			let t = TGTool();
			t.error('连接已断开');
			in_ws = false;
		}
	});
var in_ws = false;
var ws;

window.send = function(event){
    if(event.keyCode == 13){
        let value = document.getElementById('input-data').value;
        document.getElementById('input-data').value = '';
        show('>> '+value)
        ws.send(value);
        
    }
}

function show(msg){
    document.getElementById('output').innerHTML += '<br>'+msg+'<br>';
}

</script>
<style>
*{
	margin: 0;
	padding: 0;
	outline: none;
	box-sizing: border-box;
}
    .wrapper{
	width: 450px;
	background-color: #fff;
	padding: 30px;
	box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
}
.wrapper .input-data{
	width: 100%;
	height: 40px;
	position: relative;
}
.wrapper .input-data input{
	width: 100%;
	height: 100%;
	border: none;
	border-bottom: 2px solid silver;
	font-size: 17px;
}
.input-data input:focus ~ label,
.input-data input:valid ~ label{
	transform: translateY(-20px);
	font-size: 15px;
	color: #4158D0;
}
.wrapper .input-data label{
	position: absolute;
	bottom: 10px;
	left: 0;
	color: grey;
	pointer-events: none;
	transition: all 0.3s ease;
}
.wrapper .input-data .underline{
	position: absolute;
	bottom: 0px;
	height: 2px;
	width: 100%;
}
.input-data .underline:before{
	position: absolute;
	content: "";
	height: 100%;
	width: 100%;
	background: #4158D0;
	transform: scaleX(0);
	transition:transform 0.3s ease;
}

.input-data input:focus ~ .underline:before,
.input-data input:valid ~ .underline:before{
	transform: scaleX(1);
}
</style>
## 在线websocket服务

在输入框中输入目标URL后回车进行连接，随后输入框中回车即可发送

<code class="lang-json" id="output"><b>等待连接中...</b><br></code>
<div class="wrapper">
	<div class="input-data">
		<input type="text" id="input-data" onkeydown="send(event)" />
		<div class="underline"></div>
		<label>输入..</label>
	</div>
</div>