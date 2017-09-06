var logged = function (req,res,next){
	if(req.session.username){
		next();
	}
	else{
		req.flash('lerrors',{msg :"You must be logged in to continue . Please log in"});
		res.redirect('/login');
	}
}

var nonlogged = function(req,res,next){
	if(!req.session.username){
		next();
	}
	else{
		
		res.redirect('/home');
	}
}

module.exports = {
	logged  : logged,
	nonlogged : nonlogged
}