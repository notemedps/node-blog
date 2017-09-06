var mongoose = require('mongoose');
var ai = require('mongoose-auto-increment')
var schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var adminSchema = new schema({
	username : {type : String},
	password :{type : String},
	email : {type : String},
	fname : {type: String}
});
ai.initialize(mongoose.connection);
adminSchema.plugin(ai.plugin,{
	model : 'adminModel',
	field : 'id',
	startAt : 1,
	incrementBy : 1

});
var adminModel = mongoose.model('adminModel',adminSchema);
module.exports = adminModel;