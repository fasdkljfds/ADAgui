const {createUserMsg, createBotMsg, editBotMsg, resetMsgContainer} = require("../utils/msg_manage");
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
        const botMsg = createBotMsg('让我想想..🤔')
        let content = ''
        for await (const chunk of Communicator.fetchResponseStream(userInput)){
            content = content + chunk;
            editBotMsg(botMsg, content);
        }
    }

    if (config.stream)
        await renderStreamResponse();
    else
        await renderResponse();
}


// run按钮快捷键
async function kuaijiejian(event) {
    if (event.ctrlKey && event.key === 'Enter') {
        runBtn.click();
    }

    if (event.ctrlKey && (event.key === 'r' || event.key === 'R')) {
        try{
            const response = await Communicator.resetChat();
        }catch (e){
            console.error(e)
        }
        resetMsgContainer()
    }
}

module.exports = {kuaijiejian, handleRunButtonClick}