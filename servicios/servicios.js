
exports.bind = function (socket) {
  socket.on('add-men', function (data) {
      socket.emit('get-add-men', { datasend: data.num } );
      socket.broadcast.emit('get-add-men', { datasend: data.num } );
  });
  socket.on('add-woman', function (data) {
      socket.emit('get-add-woman', { datasend: data.num } );
      socket.broadcast.emit('get-add-woman', { datasend: data.num } );
  });
}