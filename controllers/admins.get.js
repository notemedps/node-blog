var router = require('express').Router();
var config = require('../config');
var adminModel = require('../models/admin');

router.get('/admins',config.logged,function(req,res){
	adminModel.find({}).exec(function(err,succ){
		if(err){res.send(err)}
		if(succ){
		res.render('admins',{title : 'Manage Admins',admins : req.flash('admins'),aL : succ})

		}
		else{
			res.render('admins',{title : 'Manage Admins',admins : req.flash('admins')})

		}
	})


})

module.exports = router;