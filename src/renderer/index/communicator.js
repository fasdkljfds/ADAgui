// 处理与服务端的通信

class Communicator {
    static async sendMessage(message) {
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
}

module.exports = Communicator;