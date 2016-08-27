var express = require("express"); 
var app = express(); 
var bodyParser = require("body-parser");
var User = require("./modules/user").User;
var Admin = require("./modules/user").Admin;
var session = require("express-session");
var router_app=require("./router_user");
var session_midle = require("./middlewares/session");

var token = 'token'; //numero de token del bot de telegram 
var TelegramBot = require('node-telegram-bot-api');
var bot = new TelegramBot(token, {polling: true});


var router_admin=require("./router_admin");
var session_admin_midle = require("./middlewares/session_admin");


/****Variables del Proyecto**********/
var proyecto={
	nombre:"Cerradura",
	autor:"Daniel Torres",
	idChatTelgram : //numero de chat telegram
}
/*************************************/
app.set('view engine', 'pug') // se indica que se usara las vistas PUG


app.use(bodyParser.json()); // Indica que se usara en formato JSON
app.use(bodyParser.urlencoded({extended: false}));//

app.use(session({
	secret: "1234567890",
	resave: false,
	saveUninitialized:false
}));

app.use("/estatico",express.static('public')); //servir archivos staticos
/**************************TELEGRAM*************************************/
bot.onText(/\/exec (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  var resp = match[1];
  if (resp=="id"){
  	bot.sendMessage(fromId, fromId);	
  }
  console.log("Comando:"+resp);
  console.log(fromId);
  
});

/*******************************GET***********************************/
app.get("/", function (req,res) { // segun la direccion 
	//console.log(req.session.user_id);
	var ip =req.connection.remoteAddress;
	console.log(ip);
	if (req.session.user_id){
		/*res.render("/app/",{
			title:"Pagina de inicio",
			titulo:proyecto.nombre,
			sesion: req.session.user_id
		});*/
		if (req.session.type=="admin") {
			res.redirect("/admin/");
		}else{
			res.redirect("/app/");
		}
		
	}else{
		res.render("index",{
			title:"Pagina de inicio",
			titulo:proyecto.nombre,
			sesion: req.session.user_id
		}); 
	}
});

app.get("/exportBD", function (req,res) {
	console.log("Export BD");
	User.find(function (err,doc) {  // busca en el modelo 
		 res.header("Access-Control-Allow-Origin", "*");
    	res.send(doc);
	});
	
});


app.get("/login", function (req,res) { //segun la direccion
	//console.log(req.session.status);
		res.render("login",{
			title:"Iniciar sesion",
			titulo:proyecto.nombre,
			clase: "R",
			home:"/",
			status: req.session.status
		}); 
});
app.get("/login_admin", function (req,res) { //segun la direccion
		res.render("login_admin",{
			title:"Iniciar sesion",
			titulo:proyecto.nombre,
			clase: "R",
			home:"/",
			status: req.session.status
		}); 
});
app.get("/exit", function (req,res) { //segun la direccion
		req.session.destroy(function(err) {
	  	//res.send("Cerro Sesión");
	  	res.redirect("/");
		});
});

app.get("/verusuarios",function (req,res) {
	User.find({},function (err,usuarios) {  // busca en el modelo 
		res.render("usuarios",{usuarios:usuarios}); // dirige a login
	});
});
app.get("/verusuarios_A",function (req,res) {
	Admin.find({},function (err,usuarios) {  // busca en el modelo 
		res.render("usuarios",{usuarios:usuarios}); // dirige a login
	});
});
app.get("/eliminar",function (req,res) {
	User.remove({},function(err) {
		if (err){
			res.send(err);
		}else{
			res.send("Se elimino");
		}
	});
	
});
app.get("/signup", function (req,res) { //segun la direccion
	User.find(function (err,doc) {  // busca en el modelo 
		var cadena= JSON.stringify(doc)﻿;
		var text="";
		for (var a =0; a<cadena.length;a++){

			if (cadena[a]=="\""){
				text+="\"\t";
			}else if(cadena[a]==","){
				text+=",\n"; 
			}else if (cadena[a]=="}"){
				text+="}\n";
			}else{
				text+=cadena[a];
			}
		}
		console.log(text); //imprime en consola
		res.render("signup",{
			title:"Registrarse",
			titulo:proyecto.nombre
			
		}); // dirige a login
	});
});
/**************************Descargas******************************************/
app.get("/descargar/:id",function (req,res) {
	res.download(__dirname+"/public/"+req.params.id,req.params.id,function (err) {
			if (err){
				console.log("Ocurrioun error");
				console.log(String(err));
				res.send("El archivo no existe o fue removido");
			}else{
				console.log("Se descargo :" + req.params.id);
			}
		});
});
app.get("/img/:id",function (req,res) {
	res.download(__dirname+"/views/img/"+req.params.id,req.params.id,function (err) {
		});
});
/************************************POST*********************************/
app.post("/users", function (req,res) { //Segun la direccion
	var user = new User({email:req.body.email,
						password:req.body.password,
			password_confirmation:req.body.password_confirmation,
			username: req.body.username,
			telefono: req.body.telefono,
			facebook: req.body.facebook
			}); //ingresa los datos al modelo 
	user.save().then(function (us) {
		res.send("Guardamos tus datos correctamente");
	},function (err) {
		if (err){
			res.send(String(err));
			res.send("NO pudimos guardar tus datos");
		}
		
	});
});
app.post("/users_admin", function (req,res) { //Segun la direccion
	var admin = new Admin({email:req.body.email,
						password:req.body.password,
			password_confirmation:req.body.password_confirmation,
			username: req.body.username,
			telefono: req.body.telefono,
			facebook: req.body.facebook
			}); //ingresa los datos al modelo 
	admin.save().then(function (us) {
		res.send("Guardamos tus datos correctamente");
	},function (err) {
		if (err){
			res.send(String(err));
			res.send("NO pudimos guardar tus datos");
		}
		
	});
});

app.post("/sessions", function (req,res) { //Segun la direccion

	User.findOne({username:req.body.user,password:req.body.password},function (err,docs) {
		if (docs==null) {
			req.session.status="No se pudo acceder";
			res.redirect("/login");
		}else{
			var cadena= JSON.stringify(docs)﻿;
			var text="";
			for (var a =0; a<cadena.length;a++){

				if (cadena[a]=="\""){
					text+="\"\t";
				}else if(cadena[a]==","){
					text+=",\n"; 
				}else if (cadena[a]=="}"){
					text+="}\n";
				}else{
					text+=cadena[a];
				}
			}
			req.session.user_id=docs._id;
			bot.sendMessage(proyecto.idChatTelgram, "Accedio el usuario : "+req.body.user);
			//console.log(cadena); //imprime en consola
			res.redirect("/app/");
		}
	});
});

app.post("/session_admin", function (req,res) { //Segun la direccion
	
	var a={username:req.body.admin,password:req.body.pin}
	//console.log(a);
	Admin.findOne(a,function (err,docs) {
		if (docs==null) {
			req.session.status="No se pudo acceder";
			res.redirect("/login_admin");
		}else{
			var cadena= JSON.stringify(docs)﻿;
			var text="";
			for (var a =0; a<cadena.length;a++){

				if (cadena[a]=="\""){
					text+="\"\t";
				}else if(cadena[a]==","){
					text+=",\n"; 
				}else if (cadena[a]=="}"){
					text+="}\n";
				}else{
					text+=cadena[a];
				}
			}
			req.session.user_id=docs._id;
			req.session.type="admin";
			bot.sendMessage(proyecto.idChatTelgram, "Se accedio como administrador");
			//console.log(cadena); //imprime en consola
			res.redirect("/admin/");
		}
	});
});


app.post("/inbase",function(req,res) {
	console.log("Ingresaron datos");
	console.log(req.body.user);
});

app.use("/app",session_midle);
app.use("/app",router_app);


app.use("/admin",session_admin_midle);
app.use("/admin",router_admin);


app.use (function (req, res) { 
 res.status(404).send("Error  404 Pagina no encontrada"); 
});

app.listen(3000); //Indica en que puerto escuchar 
