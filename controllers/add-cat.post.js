var router = require('express').Router();
var config = require('../config')
var catModel = require('../models/cat')
router.post('/add-cat',config.logged,function(req,res){
	var cat = req.sanitize(req.body.cat);
	req.assert('cat',"Category name cannot be empty").notEmpty();
	req.assert('cat',"Category name should be of 3 to 50 characters").len(3,50);
	req.assert('cat','Category name can only contain alphanumeric characters').isAlphanumeric();
	req.getValidationResult().then(function(resul){
		if(!resul.isEmpty()){
			result = resul.array();
			req.flash('cat',result)
			res.redirect('/add-cat')
		}
		else{
			var uname = req.session.username;
			cat = cat.toLowerCase()
			var data = new catModel({
				cat : cat,
				by : uname
			});
			
			catModel.findOne({'cat' : cat}).exec(function(err,succ){
				if(err){res.send(err)}
				if(succ){
					req.flash('cat',{msg : "The category is already registered"});
					res.redirect('/add-cat');
				}
				else{

					data.save(function(err){
						if(err){res.send(err)}
						else{
							req.flash('cat',{msg : "Done !! The Category has been added"});
							res.redirect('/add-cat');
						}
					})
				}
			})
			
		}
	})
})
module.exports = router;