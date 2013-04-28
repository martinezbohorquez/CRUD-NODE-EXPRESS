 
/*
 * Base de datos
*/
// Creación de la Conexión
var mongoose        = require('mongoose')
<<<<<<< HEAD
  , db_lnk          = 'mongodb://localhost/music4you'
=======
  , db_lnk          = 'mongodb://admin:sw2013@linus.mongohq.com:10079/app15334359'
>>>>>>> merge entre
  , db              = mongoose.createConnection(db_lnk)


// Creación de variables para cargar el modelo
var userModel_schema = require( __dirname + '/../models/user.js')
  , User = db.model('User', userModel_schema)

/*
 * accessToken, 
 * refreshToken, 
 * profile, 
 * done
 *
 * Una vez actentica el usuario ante facebook 
 * comprobamos si se encuentra en el sistema y 
 * lo  almacenamos o actualizamos
*/
exports.fbuser = function(accessToken, refreshToken, profile, done) 
{
  var id      = profile.id             || ''
  var nombre  = profile.displayName    || ''
  var email   = profile.emails         || ''

  // Validemos que los campos no esten vacios
  if (
      (nombre=== '') || 
      (email === '') || 
      (id === '')) 
  {
    console.log('ERROR: Campos vacios');
    return done('Campos vacios', false);
  }

  // Buscar si es usuario existe
  User.findOne(
    { facebookId: profile.id }
    , gotUser);

  function gotUser (err, user) 
  {
    if (err) 
    {
      console.log(err)
      return next(err)
    }

    // si no exite se crea, encaso contrario se actualiza
    if (!user) 
    {
      user = new User({
        facebookId  :   id,
        nombre      :   nombre,
        email       :   email
      });
    } 
    else 
    {
      user.facebookId = id
      user.nombre     = nombre
      user.email      = email
    }

    user.save(onSaved);

    function onSaved (err) 
    {
      if (err) 
      {
        console.log(err)
        return next(err)
      }
      return done(null, user );
      //return done(null, { id: user.facebookId.toString(), username: user.nombre.toString() } );
    }
  }
}


/*
 *
 * Accion despues de la autenticacion
 * del usuario
 * 
*/
exports.fbuserAuth = function(req, res) 
{
  res.redirect('/');
}


/*
 *
 * Listo todos los Usuarios
 * 
 * 
*/
exports.list = function(req, res) 
{

  User.find(gotUsers)

  function gotUsers (err, users) {
    if (err) {
      console.log(err)
      return next()
    }

    return res.render('user/user', {title: 'Nuevo user', users: users.sort({nombre: -1})})
  }
}

/*
 *
 * 
 * Recupera los datos para editar el usuario
 * 
*/
exports.show_edit = function(req, res) 
{

  var id = req.params.id

  User.findById(id ,gotUser)

  function gotUser (err, user) {
    if (err) {
      console.log(err)
      return next()
    }
    
    return res.render('user/user_update', {title: 'Nuevo user', user: user})
  }
}

/*
 *
 * 
 * Actualiza el usuario en la base de datos
 * 
*/
exports.update = function (req, res, next) {
  var id = req.params.id

  var nombre  = req.body.nombre || ''
  var email   = req.body.email  || ''

  // Validemos que nombre o descripcion no vengan vacíos
  if ((nombre=== '') || (email === '')) {
    console.log('ERROR: Campos vacios')
    return res.send('Hay campos vacíos, revisar')
  }


  User.findById(id, gotUser)

  function gotUser (err, user) {
    if (err) {
      console.log(err)
      return next(err)
    }

    if (!user) {
      console.log('ERROR: ID no existe')
      return res.send('ID Inválida!')
    } else {
      user.nombre = nombre
      user.email  = email

      user.save(onSaved)
    }

    function onSaved (err) {
      if (err) {
        console.log(err)
        return next(err)
      }

      return res.redirect('/users/user')
    }
  }
}

/*
 *
 * Crea un usuario en la base de datos
 * 
 * 
*/
exports.create = function (req, res, next) {
  if (req.method === 'GET') 
  {
    return res.render('user/crear', {title: 'Nuevo user', user: {}})
  } 
  else if (req.method === 'POST') 
  {
    // Obtenemos las variables y las validamos
    var nombre    = req.body.nombre   || ''
    var email 		= req.body.email		|| ''

    // Validemos que nombre o descripcion no vengan vacíos
    if ((nombre=== '') || (email === '')) {
      console.log('ERROR: Campos vacios')
      return res.send('Hay campos vacíos, revisar')
    }

    // Creamos el documento y lo guardamos
    var user = new User({
        facebookId	: 	'',
	  	  nombre      :   nombre,
	  	  email		    : 	email
    })

    user.save(onSaved)

    function onSaved (err) {
      if (err) {
        console.log(err)
        return next(err)
      }

      return res.redirect('/')
    }
  }  
}