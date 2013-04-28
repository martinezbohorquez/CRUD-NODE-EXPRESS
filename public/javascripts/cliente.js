var socket = io.connect();


// Valor enviado de la vueco valor puesto
socket.on('get-add-men', function (data) {
	$('#valMen').html(data.datasend);
});

socket.on('get-add-woman', function (data) {
	$('#valWoman').html(data.datasend);
});

//carga inicial del valores
socket.emit('add-men', { num: '0' });
socket.emit('add-woman', { num: '0' });


// enviar al servidor
function enviarmen()
{
	socket.emit('add-men', { num: '1' });
}
function enviarwoman()
{
	socket.emit('add-woman', { num: '1' });
}
