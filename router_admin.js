var express = require("express");
var Admin = require("./modules/user").Admin;

var router = express.Router();
router.get("/",function (req,res) {
	res.render("admin/home",{
			title:"Bienvenido Administrador",
			titulo:"Cerradura",
			sesion: req.session.user_id,
			home:"#"
		});
});
router.get("/alter",function (req,res) {
	res.render("admin/alter",{
		title:"Modificar datos",
		titulo:"Cerradura",
		sesion: req.session.user_id,
		home:"/"
	});
});
/*****************POST*******************/
router.post("/alteradmin",function (req,res) {
	var user={
		email:req.body.email,
		username:req.body.username,
		telefono:req.body.telefono,
		facebook:req.body.facebook
	}
	Admin.update({_id:req.body.id},{
	 	$set:user
	},function (err,results) {
		if (err) {
			console.log(err);
			res.send(err);
		}else{
			console.log(results);
			res.locals={user:user};
			res.redirect("/admin");
		}
	});
});
module.exports = router;