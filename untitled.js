var express = require("express"); 
var app = express(); 
var bodyParser = require("body-parser");
var session = require("express-session");

var token = '219810775:AAHqN5_2Cj53UCmkezcXN-vLg00qjf6H5js';
var TelegramBot = require('node-telegram-bot-api');
var bot = new TelegramBot(token, {polling: true});


var proyecto={
	idChatTelgram : 169837458
}

app.set('view engine', 'pug')

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false}));//

app.use(session({
	secret: "1234567890",
	resave: false,
	saveUninitialized:false
}));



/**************************TELEGRAM*************************************/
bot.onText(/\/exec (.+)/, function (msg, match) {
	var fromId = msg.from.id;
	//console.log(typeof fromId);
	var resp = match[1];
	if (resp=="id"){
		bot.sendMessage(fromId, fromId);	
	}
	console.log("Comando:"+resp);
	console.log(fromId);
  
});


//***************************POST**************************************/
app.post("/inbase",function(req,res) {
	console.log("Ingresaron datos");
	console.log(req.body.user);
});

app.use (function (req, res) { 
 res.status(404).send("Error  404 Pagina no encontrada"); 
});

app.listen(3000); //Indica en que puerto escuchar 
