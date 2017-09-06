var router = require('express').Router();
var config = require('../config')
var postModel = require('../models/post')

router.post('/manage-posts',config.logged,function(req,res){
	var ttl = req.sanitize(req.body.title)
	var post = req.sanitize(req.body.post)
	var cats = req.sanitize(req.body.cats)
	req.assert('title',"Title should be of 5 to 150 characters").len(5,50);
	req.assert('post','Post should be of  at least 10  characters').len(10,100000000000000000000000000000)
	req.assert('cats',"Invalid category").notEmpty();
	req.getValidationResult().then(function(result){
		if(!result.isEmpty()){
			req.flash('posts',result.array())
			res.redirect('/manage-posts')
		}
		else{
			title = ttl.replace(/[^0-9a-z]/gi, ' ')
			rd = Math.floor((Math.random() * 1000) + 1);
			url = ttl.replace(/[^0-9a-z]/gi, '-')+"-"+rd;

			var data =  new postModel({
				username : req.session.username,
				title : title,
				post : post,
				cat  : cats,
				url : url
			}) ;
			data.save(function(err){
				if(err){res.send(err)}
				else{
					req.flash('posts',{msg : "Your Post has been added successfully"})
					res.redirect('/manage-posts')
				}
			})
 			
		}
	})
})

module.exports = router;