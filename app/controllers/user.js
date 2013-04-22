 
/*
 * Base de datos
*/
// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://admin:startup@alex.mongohq.com:10007/app15165961'
  , db              = mongoose.createConnection(db_lnk)


// Creación de variables para cargar el modelo
var userModel_schema = require( __dirname + '/../models/user.js')
  , User = db.model('User', userModel_schema)


exports.fbuser = function(accessToken, refreshToken, profile, done) 
{
   /* User.findOrCreate(
    	{ facebookId: profile.id }, 
    	function (err, user) 
    	{
      		return done(null, user);
    	});
*/
    var id      = profile.id             || ''
    var nombre  = profile.displayName    || ''
    var email   = profile.emails         || ''

    // Validemos que nombre o descripcion no vengan vacíos
    if ((nombre=== '') || (email === '') || (id === '')) {
      console.log('ERROR: Campos vacios')
      return done('error', false);
    }

    User.findOne(
      { facebookId: profile.id }
      , gotUser)

    function gotUser (err, user) 
    {
      if (err) 
      {
        console.log(err)
        return next(err)
      }

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
        return done(null, { id: user.facebookId.toString(), username: user.nombre.toString() } );
      }
    }
  }

 exports.fbuserAuth = function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }

exports.list = function(req, res) 
{

  User.find(gotUsers)

  function gotUsers (err, users) {
    if (err) {
      console.log(err)
      return next()
    }

    return res.render('user/user', {title: 'Nuevo user', users: users})
  }
}

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