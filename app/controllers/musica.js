/*
 * Retornar cada una de las funciones 
 * dadas por dezzer par aconsultar los 
 * disco exitenten en la DB
 * /musica/:metodo/:valor 
 * 
 * buscar
 * album
 * artista
 * 
*/
var request = require('request')
  , DZUrl = 'https://api.deezer.com/2.0/'
  , musicaDT = JSON.parse('{}');


/*
 *
*/
exports.musica = function(req, res) 
{

  var metodo = req.params.metodo;
  var valor = req.params.valor;
  var pag = req.params.pag || '0';

  var cmd ;

  //Seleccionar el comando
  if (metodo=="buscar")   { cmd = 'search?q=' + valor + '&index=' + pag   ; }
  else if (metodo=="album")    { cmd = 'album/' + valor; }
  else if (metodo=="artista")  { cmd = 'artist/' + valor; }
  else {return ;}

  request( DZUrl + cmd , function (error, response, body) {
    if (!error && response.statusCode == 200) {
      try 
      {
        musicaDT = JSON.parse(body); 
        res.json(  musicaDT , 200);  
      } 
      catch (err) 
      {
        console.log(err);
      }
    }
  })
}