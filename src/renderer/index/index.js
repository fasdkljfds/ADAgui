const {kuaijiejian, handleRunButtonClick} = require('./components/runBtn')
document.addEventListener('DOMContentLoaded', ()=> {
    document.documentElement.className = 'theme-light-blue';

    const runBtn = document.getElementById('run-btn');
    runBtn.addEventListener('click', handleRunButtonClick);
    document.addEventListener('keydown', kuaijiejian);

    // // 开启全双工信道
    // const socket = io('http://localhost:5000');
    // socket.on('connect', () => {
    //     console.log('connected');
    // })
    //
    // // 服务端推送的消息
    // socket.on('notification', (data) => {
    //     console.log(data);
    // })

    // // TODO 异步，事件冲突
    // // 另外这个并没有使用
    // socket.on('ada', (data) => {
    //     console.log(data);
    //     createBotMsg(data);
    // })
    //
    // socket.on('stream_chunk', async (data) =>{
    //     createBotMsg('cao')
    // })
    //
    // run按钮事件
})