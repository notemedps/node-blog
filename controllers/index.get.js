var router = require('express').Router();
var setupModel = require('../models/setup')
var postModel = require('../models/post')
var catModel = require('../models/cat')
var async = require('async')
router.get('/',function(req,res){
	setupModel.findOne({}).exec(function(err,succ){
		if(err){res.send(err)}
		if(succ){
			succ.views+=1;
			succ.save();

		}

	})
	store = {}
	async.parallel([
		function(callback){
			setupModel.findOne({}).exec(function(err,succ){
				if(err){return callback(err)}
				if(succ){store.setup = succ}
				else{store.setup = '';}
				callback()
			})
		},
		function(callback){
			postModel.find({'cat':'news'}).sort('-id').limit(4).exec(function(err,succx){
				if(err){return callback(err)}
				if(succx){store.post = succx}
				else{store.post = ''}
				callback()
			})

		},
		function(callback){
			catModel.find({}).sort('-id').limit(5).exec(function(err,succt){
				if(err){return callback(err)}
				if(succt){store.cat = succt}
				else{store.cat = ''}
				callback()
			})
		},
		function(callback){
			postModel.find({'cat':'notice'}).sort('-id').limit(4).exec(function(err,succn){
				if(err){return callback(err)}
				if(succn){store.notice = succn}
				else{store.notice = ''}
				callback()
			})

		}


		],
		function(err){
			if(err){res.send(err)}
			else{
				res.render('index',{data : store.setup,post : store.post,cat : store.cat,notice : store.notice});

			}

	})
})

module.exports = router;


