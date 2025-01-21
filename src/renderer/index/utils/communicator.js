// 处理与服务端的通信

class Communicator {
    static async fetchResponse(message) {
        try {
            const response = await fetch('http://localhost:5000/chat', {
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

    static async fetchResponseStream(message){
        const response = await fetch('http://localhost:5000/chat_stream', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({message: message})
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let result = '';

        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            result += decoder.decode(value, { stream: true });
            
            console.log(result); // 你可以在这里进行实时更新显示
        }
    }
}

module.exports = Communicator;