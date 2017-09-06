var router = require('express').Router();
var config = require('../config');
var adminModel = require('../models/admin')
router.get('/remove/admin/:ad',config.logged,function(req,res){

	var user = req.sanitize(req.params.ad);
	adminModel.findOne({username : user}).exec(function(err,succ){
		if(err){res.send(err)}
		if(succ){
			if(succ.username == req.session.username){
				req.flash('admins',{msg : "You cannot delete yourself"});
				res.redirect('/admins')
			}
			else{
				succ.remove();
				req.flash('admins',{msg : "The admin has beeen removed succesfully"})
				res.redirect('/admins')
			}
		}
		else{
			req.flash('admins',{msg : "The username does not exists"});
			res.redirect('/admins')
		}
	})


})
module.exports = router;