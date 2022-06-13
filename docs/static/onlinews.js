var in_ws = false;
var ws;

function show(msg){
    document.getElementById('output').innerHTML += '<br>'+msg+'<br>';
}

function ws_button(){
        let value = document.getElementById('query').value;
        if(in_ws){
            ws.send(value);
            show('>> '+value);
            document.getElementById('query').value = "";
        }else{
            ws = new WebSocket(value);
            document.getElementById('query').value = "";
            ws.onopen = ()=>{
                in_ws=true;
                let t = TGTool();
                t.success('连接成功');
                show(value+' 连接成功');
                document.getElementById('query').placeholder = '输入您要发送的信息';
            };
            ws.onmessage = (evt)=>{
                show('<< '+evt.data);
            }
            ws.onclose =()=>{
                let t = TGTool();
                t.error('连接已断开');
                in_ws = false;
                document.getElementById('query').placeholder = '输入您要连接的ws地址'
            }
        }
}
