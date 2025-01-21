async function fetchResponseStream(message, onChunk) {
    const response = await fetch('http://localhost:5000/chat_stream', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({message: message})
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
        const {value, done} = await reader.read();

        if (done) {
            break;
        }

        // 立即处理每个数据块
        const chunk = decoder.decode(value, {stream: true});
        // 通过回调函数实时处理
        onChunk(chunk);
    }
}

// 使用示例
fetchResponseStream('测试消息', (chunk) => {
    console.log('收到新数据:', chunk);
    // 这里可以直接更新UI

});