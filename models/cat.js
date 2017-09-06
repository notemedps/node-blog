var mongoose = require('mongoose');
var ai = require('mongoose-auto-increment')
var schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var catSchema = new schema({
	cat : {type : String  },
	by : {type : String}
});
ai.initialize(mongoose.connection);
catSchema.plugin(ai.plugin,{
	model : 'catModel',
	field : 'id',
	startAt : 1,
	incrementBy : 1

});
var catModel = mongoose.model('catModel',catSchema);
module.exports = catModel;