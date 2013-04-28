
/*
 * Modelo de las cansiones
 * 
 */
var socket = io.connect();
var men = 50
	, woman = 50
	, cupo = 300;

//carga inicial del valores
socket.emit('add-men', { num: '0' });
socket.emit('add-woman', { num: '0' });

function AppViewModelDisco() 
{
	var self = this;
	
    self.disco = ko.observableArray([]);
    
    self.InputValue = ko.observable('');
}

var sModel = new AppViewModelDisco()
ko.applyBindings(sModel);


// Valor enviado de la vueco valor puesto
socket.on('get-add-men', function (data) {
	
	sModel.disco.removeAll();
	men = data.datasend;
	genericos();

});

socket.on('get-add-woman', function (data) {
	sModel.disco.removeAll();
	woman = data.datasend;
	
	genericos();
});

function genericos()
{
	sModel.disco.push({
					 Nombre : "Santo Pecado"
					, Pmujeres : " " + woman
					, Phombres : " " + men
					, Porcenta : " " + (parseInt(woman) + parseInt(men)) + "/300"   });
	sModel.disco.push({
					 Nombre : "Nuestro Bar"
					, Pmujeres : " 60"
					, Phombres : " 25"
					, Porcenta : " 85/400"});
	sModel.disco.push({
					 Nombre : "La 5 Avenida"
					, Pmujeres : " 49 "
					, Phombres : " 50"
					, Porcenta : " 99/150"});
	sModel.disco.push({
					 Nombre : "Barlovento"
					, Pmujeres : " 70"
					, Phombres : " 10"
					, Porcenta : " 80/120"});
}
