var router = require('express').Router();
var config = require('../config');
var catModel = require('../models/cat')
router.get('/remove/cat/:ad',config.logged,function(req,res){

	var cat = req.sanitize(req.params.ad);
	catModel.findOne({cat : cat}).exec(function(err,succ){
		if(err){res.send(err)}
		if(succ){
			
				succ.remove();
				req.flash('cat',{msg : "The category has beeen removed succesfully"})
				res.redirect('/add-cat')
			
		}
		else{
			req.flash('cat',{msg : "The category does not exists"});
			res.redirect('/add-cat')
		}
	})


})
module.exports = router;