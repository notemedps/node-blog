var router = require('express').Router();
var setupModel = require('../models/setup');
var config = require('../config');
router.post('/manage-site-settings',config.logged,function(req,res){
	//getting inputs

	var sname = req.sanitize(req.body.sname);
	var sslogan = req.sanitize(req.body.sslogan);
	var about = req.sanitize(req.body.about);
	var address = req.sanitize(req.body.address);
	var phone = req.sanitize(req.body.phone);
	var email = req.sanitize(req.body.email);
	var facebook = req.sanitize(req.body.facebook);
	var twitter = req.sanitize(req.body.twitter);
	var linkedin = req.sanitize(req.body.linkedin);
	var fr1 = req.sanitize(req.body.fr1);
	var fr2 = req.sanitize(req.body.fr2);
	var fr3 = req.sanitize(req.body.fr3);
	var fl1 = req.sanitize(req.body.fl1);
	var fl2 = req.sanitize(req.body.fl2);
	var fl3 = req.sanitize(req.body.fl3);

	req.assert('sname',"Your siteName should be of 5 to 50 characters").len(5,50);
	req.assert('sslogan',"Your siteSlogan should be of 10 to 100 characters").len(10,100);
	req.assert('address',"Your address should be of 5 to 100 characters").len(5,100);
	req.assert('phone',"Your phone number should be a be a number").isNumeric();
	req.assert('phone',"Your phone  number shouldnot be empty").notEmpty();
	req.assert('email',"Please enter a valid E-mail").isEmail();
	req.assert('about','About You can be of 100 to 	10000 characters').len(100,10000);
	req.assert('facebook',"Please enter a valid facebook username").notEmpty();
	req.assert('twitter',"Please enter a valid twitter username").notEmpty();
	req.assert('linkedin',"Please enter a valid linkedin username").notEmpty();
	req.assert('fr1',"Right Side first Text empty").notEmpty();
	req.assert('fr2',"Right Side second Text empty").notEmpty();
	req.assert('fr3',"Right Side third Text empty").notEmpty();
	req.assert('fl1',"Left Side first Text empty").notEmpty();
	req.assert('fl2',"Left Side second Text empty").notEmpty();
	req.assert('fl3',"Left Side third Text empty").notEmpty();

	req.getValidationResult().then(function(result){
		if(!result.isEmpty()){
			var msg = result.array();
			req.flash('uset',msg);
			res.redirect('/manage-site-settings');
			
		}
		else{
			
			setupModel.findOne({}).exec(function(err,succ){
				if(err){res.send(err)}
				if(succ){
					succ.siteName = sname;
					succ.siteSlogan = sslogan;
					succ.about = about;
					succ.email = email;
					succ.phone = phone;
					succ.address = address;
					succ.facebook = facebook;
					succ.twitter = twitter;
					succ.linkedin = linkedin;
					succ.fr1 = fr1;
					succ.fr2 = fr2;
					succ.fr3 = fr3;
					succ.fl1 = fl1;
					succ.fl2 = fl2;
					succ.fl3 = fl3;
					succ.save(function(err){
						if(err){res.send(err)}
						else{
							req.flash('uset',{msg : 'The data has been saved and modified successfully'});
							res.redirect('/manage-site-settings');
						}
					})



				}
				else{
					res.send("Contact admin at 9810484989");
				}
			})




		}
	})
















});
module.exports = router;