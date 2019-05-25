var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  // socket.emit('msgs', { serverMsg: 'world' });
  //   console.log(socket)
  socket.on('send', function (data) {
    console.log(data);
    io.emit('msgs', { serverMsg: data.msg });
  });
});
