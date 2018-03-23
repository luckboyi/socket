var webSocketServer = require('websocket').server;
var htttp = require('http')
var server = htttp.createServer( (req,res) => {
    console.log( (new Data())+ 'Received request for' + req.url)
    res.writeHead(404)
    res.end()
})
server.listen(8877,() => {
    console.log((new Date())+ 'server is listening on port 8877')
})
wsServer = new webSocketServer ( {
    httpServer : server ,
    autoAcceptConnections:false
})
function originIsAllowed(origin){
    return true
}
wsServer.on('request',(req) => {
    if(!originIsAllowed(req.origin)){
        req.reject()
        console.log((new Date())+'connection form ' + req.origin)
        return
    }
    var connection = request.accept('echo-protocol',request.origin)
    console.log((new Date())+'Connection accepted')
    connection.on('message',(message) => {
        if(message.type === 'utf8'){
            console.log('received message:' + message.utf8Data)
            connection.sendUTF(message.utf8Data)
        }else if(message.type == 'binary'){
            console.log('received binary message of '+ message.binaryData.length +' bytes')
            connection.sendBytes(message.binaryData)
        }
    })
    connection.on('close', (reasonCode,des) => {
        console.log((new Date())+ 'peer' + connection.remoteAddress + 'disconnected.')
    })

})