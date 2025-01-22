const {createUserMsg, createBotMsg} = require("../utils/msg_manage");
const Communicator = require("../utils/communicator");
const {config} = require('../config')

const taskInput = document.getElementById('task-input')
const runBtn = document.getElementById('run-btn');

async function handleRunButtonClick() {
    const userInput = taskInput.value;
    if (userInput) {
        taskInput.value = '';

        createUserMsg(userInput);
    }
    console.log(config.stream)

    async function renderResponse(){
        try {
            const response = await Communicator.fetchResponse(userInput);
            createBotMsg(response.response);
        } catch (e) {
            console.error(e);
            createBotMsg('我似乎无法从服务端获取响应，请检查您的网络😥');
        }
    }

    async function renderStreamResponse(){
        console.log('start stream test')
        // socket.emit('stream_request', {'msg': 'caonima'});
    }

    if (config.stream)
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

module.exports = {kuaijiejian, handleRunButtonClick}