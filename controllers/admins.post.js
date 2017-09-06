var router = require('express').Router();
var config = require('../config');
var adminModel = require('../models/admin');
var bcrypt = require('bcryptjs');

router.post('/admins',config.logged,function(req,res){
	var username = req.sanitize(req.body.username);
	var password = req.sanitize(req.body.password);
	var email = req.sanitize(req.body.email);
	var fname = req.sanitize(req.body.fname);

	req.assert('username','Username should be of 5 to 50 characters').len(5,50);
	req.assert('username',"Username may contain number and letters only").isAlphanumeric();

	req.assert('password',"Password should be of at least 8 characters").len(8,8000);

	req.assert('email',"Invalid E-mail").isEmail();
	req.assert('fname',"Admin's name cannot be empty").notEmpty();

	//get error result
	req.getValidationResult().then(function(result){
		if(!result.isEmpty()){
			rex = result.array()
			req.flash('admins',rex)
			res.redirect('/admins')
		}
		else{
			username = username.toLowerCase();
			password = bcrypt.hashSync(password,8);

			adminModel.findOne({ $or : [{'username' : username},{'email' : email}]   }).exec(function(err,succ){
				if(err){res.send(err)}
				if(succ){
					req.flash('admins',{msg : "The username or the email already is already used"})
					res.redirect('/admins')

				}
				else{

					var data = new adminModel({
						username : username, 
						password : password,
						fname : fname ,
						email : email
					});
					data.save(function(err){
						if(err){res.send(err)}
						else{
							req.flash('admins',{msg : "The Admin has been registered"
												});
							res.redirect('/admins');
							
						}
					})
				}
			})



		}
	})



})

module.exports = router;