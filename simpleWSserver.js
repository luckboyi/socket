var webSocketServer = require('ws').Server;
var wss = new webSocketServer({port : 8877})
wss.on('connection',function connection(ws){
    ws.on('message', function incoming(message){
        console.log('received:&s',message)
    })
    ws.send('something')
})