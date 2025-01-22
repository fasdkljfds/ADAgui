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
    // 另外这个并没有使用
    socket.on('ada', (data) => {
        console.log(data);
        createBotMsg(data);
    })

    socket.on('stream_chunk', async (data) =>{
        createBotMsg('cao')
    })

    // run按钮事件
    async function handleRunButtonClick() {
        const userInput = taskInput.value;
        if (userInput) {
            taskInput.value = '';

            createUserMsg(userInput);
        }

        async function renderResponse(){
            try {
                const response = await communicator.fetchResponse(userInput);
                createBotMsg(response.response);
            } catch (e) {
                console.error(e);
                createBotMsg('我似乎无法从服务端获取响应，请检查您的网络😥');
            }
        }

        async function renderStreamResponse(){
            console.log('start stream test')
            socket.emit('stream_request', {'msg': 'caonima'});
        }

        if (stream)
            await renderStreamResponse();
        else
            await renderResponse();
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