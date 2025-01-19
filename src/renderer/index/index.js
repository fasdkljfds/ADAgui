const {createBotMsg, createUserMsg} = require('./msg_manage')
const communicator = require("./communicator");
const io = require('socket.io-client');

document.addEventListener('DOMContentLoaded', ()=>{
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
        if (userInput){
            taskInput.value = '';

            createUserMsg(userInput);
            try{
                const response = await communicator.sendMessage(userInput);
                createBotMsg(response.response);

            }catch (e){
                console.error(e);
                createBotMsg('我似乎无法从服务端获取响应，请检查您的网络😥');
            }
        }

        // fetch('http://localhost:5000/chat' , {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({message: userInput})
        // })
        //     .then(resposne => resposne.json()).then(data => {
        //     console.log('Success:', data);
        //     // 处理后端响应
        //     createBotMsg(data.response);
        // })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
        //
        // taskInput.value = '';
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
