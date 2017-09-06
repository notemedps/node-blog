var router = require('express').Router();
var config = require('../config');
var catModel = require('../models/cat')


router.get('/add-cat',config.logged,function(req,res){
	catModel.find({}).exec(function(err,succ){
		if(err){res.send(err)}
		if(succ){
			res.render('add-cat',{title : "Add Category",cat : req.flash('cat'),catList : succ});
		}
		else{
			res.render('add-cat',{title : "Add Category",cat : req.flash('cat')});

		}
	})




})

module.exports = router;