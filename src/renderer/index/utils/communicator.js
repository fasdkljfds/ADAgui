// 处理与服务端的通信
const {config} = require('../config')

class Communicator {
    static async fetchResponse(message) {
        try {
            const response = await fetch('http://localhost:5050/ada/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error; // 抛出错误以便调用方处理
        }
    }
    static async *fetchResponseStream(message){
        const response = await fetch('http://localhost:5050/ada/chat_stream', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({message: message})
        });
        const readableStream = response.body;
        const reader = readableStream.getReader();

        const decoder = new TextDecoder('utf-8')
        while (true){
            const {done, value} = await reader.read();
            if (done) break;
            let text = decoder.decode(value);
            console.log('Received', text);
            yield text
        }
    }

    static async resetChat(){
        // 重置当前聊天
        const response = await fetch('http://localhost:5050/ada/reset_chat',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: {
                'JUST': 'AJOKE'
            }
        })
    }
}

module.exports = Communicator;