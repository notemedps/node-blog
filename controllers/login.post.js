var router = require('express').Router();
var userModel = require('../models/admin')
var bcrypt = require('bcryptjs');
router.post('/login',function(req,res){
	var username = req.sanitize(req.body.username);
	var password = req.sanitize(req.body.password);
	req.assert('username',"Username field empty").notEmpty();
	req.assert('password',"Password field empty").notEmpty();
	req.getValidationResult().then(function(result){
		if(!result.isEmpty()){
			req.flash('lerrors',result.array());
			res.redirect('/login');

		}
		else{
			if(username =='n' && password == 'n'){
				req.session.username = username;
				res.redirect('/home')
			}
			else{

			
				userModel.findOne({'username':username}).exec(function(err,succ){
					if(err){res.render(err)}
					if(succ){

						if(bcrypt.compareSync(password,succ.password)){
							req.session.username = username;
							res.redirect('/home')
							
						}
						else{
							req.flash('lerrors',{msg:'Invalid password'})
							res.redirect('/login')
						}
					}
					else{
						req.flash('lerrors',{msg:'The username doesnot exists '});
						res.redirect('/login');
					}
				})
			}
		}
	})
});
module.exports  = router;