var app = require('express')();
app.use(require('express').static('assets'));
app.set('view engine','ejs');
var bparser = require('body-parser');
var sanitizer = require('express-sanitizer');
app.use(bparser.urlencoded({
	extended : false
}));

var validator = require('express-validator');

app.use(validator());
app.use(sanitizer());
var session = require('express-session');
var flash = require('express-flash');
app.use(session({
	secret : 'aiwe9878918 947!@#$&^&^**!(#&GKJH GFG(**&73*@*# &*84276(&*&*@^&*^&327 ji jaof enenrcnv',
	saveUninitialized : true,
	resave : false
}));
app.use(flash());
//requiring all routes at once
var normalizedPath = require("path").join(__dirname, "controllers");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
 app.use(require('./controllers/'+file));
});

//db connection 
require('./models/connection');

//one time setup for various site settings
var setupModel = require('./models/setup')
setupModel.findOne({}).exec(function(err,succ){
	if(err){res.send(err)}
	if(!succ){
		var data = new setupModel({

		});
		data.save();
		//finish setup
	}
})



var port = process.env.PORT || 3030;
var server = app.listen(port,function(){
	console.log("App is up at "+port);
});