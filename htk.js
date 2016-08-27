var token = '219810775:AAHqN5_2Cj53UCmkezcXN-vLg00qjf6H5js';

var TelegramBot = require('node-telegram-bot-api');
var bot = new TelegramBot(token, {polling: true});
//var idChatTelgram =208014408
var idChatTelgram = 169837458
for (var i =0; i < 30; i++) {

	
	setTimeout(function() {
	  bot.sendMessage(idChatTelgram, "Hola Troll");
	}, 5000);
}
//bot.sendMessage(idChatTelgram, "Hola Troll");