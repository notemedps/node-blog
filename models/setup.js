var mongoose = require('mongoose');
var ai = require('mongoose-auto-increment');
var schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var setupSchema = new schema ({
	siteName : {type : String,default : 'NepBlog'},
	siteSlogan : {type : String,default:'Blog for everybody'},
	image1 : {type: String,default:'./img/1.jpg'},
	image2 : {type: String,default:'./img/2.jpg'},
	image3 : {type: String,default:'./img/3.jpg'},
	caption1 : {
		main : {type: String,default:'First'},
		text : {type:String,default:'First Image'}
	},
	caption2 : {
		main : {type: String,default:'Second'},
		text : {type:String,default:'Second Image'}
	},
	caption3 : {
		main : {type: String,default:'Third'},
		text : {type:String,default:'Third Image'}
	},
	about : {type : String, default : "This is about us"},
	facebook : {type : String, default : "officialnoteme"},
	twitter : {type : String,default : 'notemedipesh'},
	linkedin : {type : String, default : '#'},
	phone : {type : Number,default : '9810484989'},
	email : {type : String,default : 'notemedps@gmail.com'},
	address : {type : String,default:'Biratnager , Bargachi'},
	fr1 : {type : String,default:'One'},
	fr2 : {type : String,default:'Two'},
	fr3 : {type : String,default:'Three'},
	fl1 : {type : String,default:'One'},
	fl2 : {type : String,default:'Two'},
	fl3 : {type : String,default:'Three'},
	views : {type: Number,default : 0}




});
ai.initialize(mongoose.connection);
setupSchema.plugin(ai.plugin,{
	model : 'setupModel',
	field : 'id',
	startAt : '1',
	incrementBy : '1'
})

var setupModel = mongoose.model('setupModel',setupSchema);
module.exports = setupModel;
