var mongoose = require('mongoose');
var ai = require('mongoose-auto-increment')
var schema = mongoose.Schema;
mongoose.Promise = global.Promise;
var postSchema = new schema({
	username : {type : String},
	post :{type : String},
	title : {type : String},
	cat : {type : String},
	url : {type : String},
	time : {type: Date , default : Date.now}
});
ai.initialize(mongoose.connection);
postSchema.plugin(ai.plugin,{
	model : 'postModel',
	field : 'id',
	startAt : 1,
	incrementBy : 1

});
var postModel = mongoose.model('postModel',postSchema);
module.exports = postModel;