var router = require('express').Router();
var config = require('../config')
var setupModel = require('../models/setup')
router.get('/manage-site-settings',config.logged,function(req,res){
	setupModel.findOne({}).exec(function(err,succ){
		if(err){res.send(err)}
		if(succ){
			
			res.render('manage-site-settings',{title : "Manage Site Settings",data : succ,uset :req.flash('uset')});
		}
		else{
			res.send("Seems like somthing has not been configured yet !! Please call the admin at 9810484989")
		}
	})
})

module.exports = router;