var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  //监听客户端的消息
  console.log('a user connected');  
  var num=0;
  socket.on('news', function(msg){
        num++
      //用于将消息发送给每个人，包括发送者
    io.emit('news', '这是'+num+msg+':回复');
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});