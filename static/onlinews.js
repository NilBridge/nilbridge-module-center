var in_ws = false;
var ws;

function query(event){
    if(event.keyCode == 13){
        event = event || window.event;
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
                show(value+' 连接成功');
            };
            ws.onmessage = (evt)=>{
                show('<< '+evt.data);
            }
            ws.onclose =()=>{
                let t = TGTool();
                t.error('连接已断开');
                in_ws = false;
            }
        }
    }
}
