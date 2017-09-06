var router = require('express').Router();
var config = require('../config');
var postModel = require('../models/post')
router.get('/remove/post/:ad',config.logged,function(req,res){

	var post = req.sanitize(req.params.ad);
	postModel.findOne({url : post}).exec(function(err,succ){
		if(err){res.send(err)}
		if(succ){
			
				succ.remove();
				req.flash('posts',{msg : "The post has beeen removed succesfully"})
				res.redirect('/manage-posts')
			
		}
		else{
			req.flash('posts',{msg : "The post does not exists"});
			res.redirect('/manage-posts')
		}
	})


})
module.exports = router;