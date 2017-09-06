var router = require('express').Router();
var config = require('../config');
var setupModel = require('../models/setup')
var catModel = require('../models/cat')
var postModel = require('../models/post')
var async = require('async')

//this function type rendering is for testing and worked fine , will be using in this way from next project 
function rend(view,res,data){
	setupModel.findOne({}).exec(function(err,succ){
		if(err){res.send(err)}
		if(succ){
			res.render(view,{title : "DashBoard",st : succ,data})
		}
	})

}

router.get('/home',config.logged,function(req,res){
		postModel.count({username : req.session.username}).exec(function(err,succ){
			if(err){res.send(err)}
			if(succ){
				rend('home',res,{admin : req.session.username,nump : succ})

			}
			else{
				rend('home',res,{admin : req.session.username,nump : 0})

			}

		})
	

})

router.get('/login',config.nonlogged,function(req,res){
	res.render('login',{lerrors:req.flash('lerrors')});
});




router.get('/manage-sliders',config.logged,function(req,res){
	setupModel.findOne({}).exec(function(err,succ){
		if(err){res.send(err)}
		if(succ){
			res.render('manage-sliders',{title : "Manage Sliders",im : succ,slider :req.flash('slider')});

		}
		else{
			res.send("Seems like error . Contact 9810484989")
		}
	})
})




router.get('/manage-posts',config.logged,function(req,res){
	var local = {}
	async.parallel ([
		function(callback){
			catModel.find({}).exec(function(err,succc){
				if(err) return callback(err)
				local.cat = succc
				callback();

			});
		},
	
		function(callback){
			postModel.find({}).sort('-id').exec(function(err,succp){
				if(err) return callback(err)
				local.post = succp
				callback();

			});
		}
		
	

	],function(err){
		if(err){res.send(err)}
		else{

			res.render('manage-posts',{title : 'Manage Posts',cats : local.cat,post : local.post,posts : req.flash('posts')});



		}

	});


})




router.get('/post/:p',function(req,res){
	var p = req.sanitize(req.params.p);
	postModel.findOne({'url':p}).exec(function(err,succ){
		if(err){res.send(err)}
		if(succ){
			res.render('post-show',{title : succ.title,post : succ})
		}
		else{
			res.render('post-show',{title : "Post Not Found"})
		}


	})
})




router.get('/cat/:c',function(req,res){
	var cc = req.sanitize(req.params.c);
	postModel.find({'cat':cc}).exec(function(err,succ){
		if(err){res.send(err)}
		if(succ){
			res.render('cat-show',{title : cc,pp : succ})
		}
		else{
			res.render('cat-show',{title : "Post Not Found"})
		}


	})

})
module.exports = router;

