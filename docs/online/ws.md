
<style>
        form {
            position: relative;
            width: 300px;
            margin: 0 auto;
        }

        input, button {
            border: none;
            outline: none;
        }

        input {
            width: 100%;
            height: 42px;
            padding-left: 13px;
        }

        button {
            height: 42px;
            width: 42px;
            cursor: pointer;
            position: absolute;
        }

        div.search {padding: 30px 0;}
        .bar4 {}
        .bar4 form {
            background: #B0C4DE;
            border-bottom: 2px solid #ADD8E6;
        }
        .bar4 input, .bar4 button {
            background: transparent;
        }
        .bar4 button {
            top: 0;
            right: 0;
        }
        .bar4 button:before {
            content: "\f178";
            font-family: FontAwesome;
            font-size: 20px;
            color: #F0F8FF;
        }

</style>
<link href="http://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">

## 在线websocket服务

在输入框中输入目标URL后回车进行连接，随后输入框中回车即可发送

<code class="lang-json" id="output"><b>等待连接中...</b><br></code>
<div class="search bar4">
    <form>
        <input id="query" type="text" placeholder="请输入您要连接的Url...">
        <button onclick="ws_button()"></button>
    </form>
</div>