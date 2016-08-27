var Admin = require("../modules/user").Admin;


module.exports = function (req,res,next) {
	if (!req.session.user_id) {
		res.redirect("/login_admin");
	} else {
		Admin.findById(req.session.user_id,function(err,user) {
			if (err) {
				console.log(err);
				res.redirect("/login_admin");
			} else {
				res.locals={user:user};
				next();
			}
		});
	}
}