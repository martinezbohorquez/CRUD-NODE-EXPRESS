var Schema = require('mongoose').Schema

var User_schema = new Schema({
	facebookId	: 	String,
  	nombre      :   String,
  	email		: 	String
})

module.exports = User_schema
