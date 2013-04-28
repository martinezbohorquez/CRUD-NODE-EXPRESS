
/*
 * Modelo de las cansiones
 * 
 */
var socket = io.connect();
var men = 50
	, woman = 50
	, porce = 50;

//carga inicial del valores
socket.emit('add-men', { num: '0' });
socket.emit('add-woman', { num: '0' });

function AppViewModelDisco() 
{
	var self = this;
	
    self.disco = ko.observableArray([]);
    
    self.InputValue = ko.observable('');
    

}

var sModel = new AppViewModelSong()
ko.applyBindings(sModel);


// Valor enviado de la vueco valor puesto
socket.on('get-add-men', function (data) {

	self.song.removeAll();
	men = data.num;
	self.song.push({
					, Nombre : "Santo Pecado"
					, Pmujeres : "% " + woman
					, Phombres : "% " + men
					, Porcenta : "% " + porce});
	genericos();

});

socket.on('get-add-woman', function (data) {
	woman = data.num;
	self.song.push({
					, Nombre : "Santo Pecado"
					, Pmujeres : "% " + woman
					, Phombres : "% " + men
					, Porcenta : "% " + porce});
	genericos();
});

function genericos()
{
	self.song.push({
					, Nombre : "Nuestro Bar"
					, Pmujeres : "% 60"
					, Phombres : "% 25"
					, Porcenta : "% 50"});
	self.song.push({
					, Nombre : "La 5 Avenida"
					, Pmujeres : "% 49 "
					, Phombres : "% 50"
					, Porcenta : "% 50"});
	self.song.push({
					, Nombre : "Barlovento"
					, Pmujeres : "% 70"
					, Phombres : "% 10"
					, Porcenta : "% 50"});
}
