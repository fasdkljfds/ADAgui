async function func(){
    const response = await fetch('http://localhost:5000/chat_stream');


    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    while (true){
        const {done, value} = await reader.read()
        if (done) break;
        let text = decoder.decode(value)  ;

        console.log('Received', text);
    }
}
func();
