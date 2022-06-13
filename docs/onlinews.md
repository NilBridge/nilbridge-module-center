<style>
    .inputText{
        width: 500px;
        height: 50px;
        line-height: 30px;
        font-size: 30px;
        padding-left: 30px;
        border-radius: 50px;
        background-color: gainsboro;
        border: none;
    }
    .inputText:focus{
        outline: none;
        background-color: lightblue;
    }
</style>

## 在线websocket服务

在输入框中输入目标URL后回车进行连接，随后输入框中回车即可发送

<code class="lang-json" id="output"><b>等待连接中...</b><br></code>

<input type="text" class="inputText" id="query" onkeydown="query(event)">
