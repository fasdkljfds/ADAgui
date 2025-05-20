const { marked } = require('marked');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();



const msgContainer = document.getElementById('msg-container')
const msgDisplay = document.getElementById('msg-display')
console.log(msgDisplay)

function scrollToBottom() {
    // const msgDisplay = document.getElementById('msg-display');
    // msgDisplay.scrollTop = msgDisplay.scrollHeight;
    //
    const lastMsg = msgContainer.lastElementChild;
    if (lastMsg) {
        lastMsg.scrollIntoView({ behavior: 'smooth' });
    }
}

function renderMarkdown(markdownText) {
    const htmlContent = md.render(markdownText)

    const userMsgContainer = document.createElement('div');

    const divElement = document.createElement('div');
    divElement.innerHTML = htmlContent;

    return divElement;
}
function editBotMsg(msgEl, newMsg){

    msgEl.innerHTML = md.render(newMsg);
    scrollToBottom();
}


function createUserMsg(msg){
    const userMsgContainer = document.createElement('div');
    userMsgContainer.classList.add('user-msg-container');

    const userMsg = renderMarkdown(msg);

    userMsg.classList.add('user-msg');

    userMsgContainer.appendChild(userMsg);
    msgContainer.appendChild(userMsgContainer);

    scrollToBottom();
    return userMsg
}

function createBotMsg(msg){
    const botMsgContainer = document.createElement('div');
    botMsgContainer.classList.add('bot-msg-container');

    const botMsg = renderMarkdown(msg);

    botMsg.classList.add('bot-msg');

    botMsgContainer.appendChild(botMsg);
    msgContainer.appendChild(botMsgContainer);

    scrollToBottom();
    return botMsg
}


function resetMsgContainer(){
    while (msgContainer.firstChild){
        msgContainer.removeChild(msgContainer.firstChild)
    }

}



module.exports = { createUserMsg, createBotMsg, editBotMsg,  resetMsgContainer}
