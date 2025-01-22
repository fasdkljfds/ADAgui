const {createBotMsg, createUserMsg, editBotMsg, } = require('./utils/msg_manage')
const communicator = require("./utils/communicator");
const io = require('socket.io-client');

// 我不管，我就这样写配置
let stream = true; // 是否流式输出


document.addEventListener('DOMContentLoaded', ()=> {
    document.documentElement.className = 'theme-light-blue';
    const runBtn = document.getElementById('run-btn');
    const taskInput = document.getElementById('task-input');

    // 开启全双工信道
    const socket = io('http://localhost:5000');
    socket.on('connect', () => {
        console.log('connected');
    })

    // 服务端推送的消息
    socket.on('notification', (data) => {
        console.log(data);
    })

    // TODO 异步，事件冲突
    socket.on('ada', (data) => {
        console.log(data);
        createBotMsg(data);
    })

    // run按钮事件
    async function handleRunButtonClick() {
        const userInput = taskInput.value;
        if (userInput) {
            taskInput.value = '';

            createUserMsg(userInput);
        }
        if (stream){
            try {
                const response = await communicator.fetchResponse(userInput);
                createBotMsg(response.response);
            } catch (e) {
                console.error(e);
                createBotMsg('我似乎无法从服务端获取响应，请检查您的网络😥');
            }
        }
        else{
            console.log('start stream test')
            try{
                let botMsg = createBotMsg('思考中...');
                const response_stream = await communicator.fetchResponseStream(userInput);
                let content = '';
                for await (const chunk of response_stream) {
                    console.log(chunk)

                    content = content + chunk
                    editBotMsg(botMsg, content);
                }

            } catch (e){
                console.error(e);
                createBotMsg('我似乎无法从服务端获取响应，请检查您的网络😥');
            }
        }
    }

    // run按钮快捷键
    function kuaijiejian(event) {
        if (event.ctrlKey && event.key === 'Enter') {
            runBtn.click();
        }
    }

    runBtn.addEventListener('click', handleRunButtonClick);
    document.addEventListener('keydown', kuaijiejian);
})