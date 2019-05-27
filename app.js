const express = require('express');
const app=express();
// const cookieParser=require('cookie-parser');
// app.use(cookieParser());
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
app.use('/public', express.static('public'));
server.listen(80);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

io.sockets.on('connection', function (socket) {
  // socket.emit('msgs', { serverMsg: 'world' });
  //   console.log(socket)
  socket.on('send', function (data) {
    console.log(data);
    io.emit('msgs', {name:data.name, serverMsg: data.msg });
  });
});
