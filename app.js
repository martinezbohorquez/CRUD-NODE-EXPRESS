
/**
 * Module dependencies.
 */
var express   = require('express')
  , routes    = require('./routes')
  , user      = require('./routes/user')
  , http      = require('http')
  , path      = require('path')
  , fs        = require('fs')
  , exists    = fs.existsSync || path.existsSync
  , log4js    = require('log4js')
  , log       = log4js.getLogger('app')
  , userAuth  = require( __dirname + '/app/controllers/user.js')
  , musica    = require( __dirname + '/app/controllers/musica.js')
  , cliente   = require( __dirname + '/app/controllers/cliente.js')
  , userbar   = require( __dirname + '/app/controllers/userbar.js')
  , passport  = require('passport')
  , util      = require('util')
  , FacebookStrategy = require('passport-facebook').Strategy
  , email     = require("./node_modules/emailjs/email")
  , socketio  = require('socket.io');

/**
 * Lectura de Cconfiguracion 
*/
if (exists('./configLocal.json')) 
{
	config = require('./configLocal.json');
}
else 
{
	log.warn('Porfavor copie configDefault.json a configLocal.json y replace las variables de la  aplicaciona.');
	config = require('./configDefault');
}
server  	 = email.server.connect(config['mail']);
siteInfo 	 = config['site'];
dbInfo 		 = config['database'];
redisOptions = config['redis'];
console.log(redisOptions);


/*
 * Integracion con facebook
*/
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
passport.use(new FacebookStrategy(config['facebook'], userAuth.fbuser ));


/*
 * Paremetrizacion de Express
*/
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');
app.set('view options', { layout: true });
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
  app.use(express.cookieParser('x4you2013'));
  app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


/*
 * Enrutamiento
*/
app.get('/' , routes.index);
app.get('/users' , user.list);
app.get('/users/crear' , userAuth.create);
app.post('/users/crear' , userAuth.create);
app.get('/users/user' , userAuth.list);
app.get('/users/actualizar/:id' , userAuth.show_edit);
app.post('/users/actualizar/:id' , userAuth.update);

app.get('/musica/:metodo/:valor' , musica.musica);
app.get('/musica/:metodo/:valor/:pag' , musica.musica);


app.get('/cliente/entrada' , cliente.entrada);
app.get('/cliente/configuracion' , cliente.configuracion);

app.get('/userbar/entrada' , userbar.entrada);


// Enrutamimento a facebook
//app.get( '/auth/facebook', passport.authenticate('facebook'));
app.get( '/auth/facebook',  passport.authenticate('facebook', { display: 'touch' }));
app.get( '/auth/facebook/callback'
  , passport.authenticate('facebook', { failureRedirect: '/login' })
  , userAuth.fbuserAuth);


var events = {
  addmen: './servicios/servicios.js'
};
server = http.createServer(app);
var io = socketio.listen(server);

//heroku configuration
io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});

io.sockets.on('connection', function (socket) {
    for(event in events) {
      require(events[event]).bind(socket);
    }
});

server.listen(app.get('port'),'0.0.0.0', function(){
  console.log('Express server listening on port ' + app.get('port'));
});

