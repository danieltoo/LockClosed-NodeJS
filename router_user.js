var express = require("express");
var User = require("./modules/user").User;

var router = express.Router();
/******************GET********************/
router.get("/",function (req,res) {
	res.render("app/home",{
			title:"Bienvenido Usuario",
			titulo:"Cerradura",
			sesion: req.session.user_id,
			home:"#"
		});
});
router.get("/alter",function (req,res) {
	res.render("app/alter",{
		title:"Modificar datos",
		titulo: "Modificar datos",
		sesion: req.session.user_id,
		home : "/"
	});
});
router.get("/control",function(req,res) {
	res.render("app/control",{
			title:"Control de acceso",
			titulo:"Cerradura",
			sesion: req.session.user_id,
			home:"/"
		});
});
/***********************DESCARGAS**********/

/*****************POST********************/
router.post("/alteruser",function(req,res) {
	var user={
		email:req.body.email,
		username:req.body.user,
		telefono:req.body.telefono,
		facebook:req.body.facebook
	}
	User.update({_id:req.body.id},{
	 	$set:user
	},function (err,results) {
		if (err) {
			console.log(err);
			res.send(err);
		}else{
			console.log(results);
			res.locals={user:user};
			res.redirect("/app");
		}
	});
});
module.exports = router;