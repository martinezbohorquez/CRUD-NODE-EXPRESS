
var sumamen = 0;
var sumawoman = 0;

exports.bind = function (socket) {
  socket.on('add-men', function (data) {
  	  sumamen +=  parseInt(data.num);
      socket.emit('get-add-men', { datasend: sumamen} );
      socket.broadcast.emit('get-add-men', { datasend: sumamen } );
  });
  socket.on('add-woman', function (data) {
  		sumawoman += parseInt(data.num);
      socket.emit('get-add-woman', { datasend: sumawoman } );
      socket.broadcast.emit('get-add-woman', { datasend: sumawoman } );
  });
}