var WebSocketClient = require('websocket').client
var client = new WebSocketClient()
client.on('connectFailed',(error) => {
    console.log('websocket client connected')
})

client.on('connect',(connection) => {
    console.log('connected success')
    connection.on('error', (err) => {
        console.log('connection error'+ error.toString())
    })
    connection.on('close',() => {
        console.log('echo-protocol connection closed')
    })
    connection.on('message', (msg) => {
        if(msg.type === 'utf8') {
            console.log('received:'+ msg.utf9Data)
        }
    })
    function sendNumber(){
        if(connection.connected) {
            var number = Math.round(Math.random() * 0xffffff)
            connection.sendUTF(number.toString())
            setTimeout(sendNumber, 1000);
        }
    }
    sendNumber()
})
client.connect('ws://localhost:8877','echo-protocol')