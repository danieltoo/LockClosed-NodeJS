var mongoose = require("mongoose"); //Modulo conexion con Mongo
var Schema = mongoose.Schema; // Se  La funcion Schema para poder usarla 

mongoose.connect("mongodb://localhost/Cerradura"); // se crea la conexion con mongo y en a BD
var user_schema= new Schema({
	username: {
		type:String,
		required:true,
		maxlength:[50,"Username muy grande"]},
	
	password:{
		type:String,
		required:true,
		minlength:[6,"Password muy pequeño"],
		validate:{
			validator :function(p) {
				return this.password_confirmation ==p;
			},
			message : "Las contraseñas no son iguales"
		}
	},
	email:{ type: String},
	telefono:{ type: String},
	facebook:{ type: String}

}); // de crea un Schema y se agrega el JSON 

user_schema.virtual("password_confirmation").get(function () {
	return this.p_c;	
}).set(function (password) {
	this.p_c=password;
}
);//confirmacion delpassword

var User = mongoose.model("User",user_schema); // Se agrega el esquema crea el 
												//modelo dependiendo del esquema
var Admin = mongoose.model("Admin",user_schema); // Se agrega el esquema crea el 
												//modelo dependiendo del esquema
module.exports.User = User;
module.exports.Admin = Admin;
/*
String 
Number
Date 
Boolean 
Mixed
Objectid
Array 
Buffer
*/