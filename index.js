'use strict';

var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    port = process.env.PORT || 5000;

app.use(express.static('public'));

var mensagens = [];

io.on('connection', function(socket){
  var usuario = null;

  socket.on('disconnect', function(){
    usuario = null;
  });

  socket.on('chat mensagem', function(msg){
    var m = {
      texto: msg,
      usuario: usuario,
      data: new Date()
    };
    mensagens.push(m);
    io.emit('chat mensagem', m);
  });

  socket.on('chat entrar', function(u){
    usuario = u;
    io.to(socket.id).emit('chat mensagem', mensagens);
  });
});

http.listen(port, function(){
  console.log('Servidor rodando na porta:'+port);
});