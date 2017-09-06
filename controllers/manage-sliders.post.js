var router = require('express').Router();
var config = require('../config');
var multer = require('multer');
var setupModel = require('../models/setup')
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "assets/img");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + Math.floor(Math.random())+"_" + file.originalname);
    }
});
var fimage = multer({ storage: Storage ,
    
	fileFilter: function (req, file, callback) {
        
        var ext = require('path').extname(file.originalname);
        
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        else{
        callback(null, true)
        }
    },
    limits:{
        fileSize: 1024 * 1024
    }


}).single("fimage");



router.post('/manage-sliders',fimage,config.logged,function(req,res){
    var opt = req.sanitize(req.body.what);
    if(opt==""){
        req.flash('slider','Empty Option')
        res.redirect('/manage-sliders');
    }
    if(req.file){
        if(req.file.originalname == ''){
            req.flash('slider','File Name cannot be blank ')
            res.redirect('/manage-sliders');
        }
        else{
            setupModel.findOne({}).exec(function(err,succ){
                var fnz = './img/'+req.file.filename;

                if(err){res.send(err)}
                if(succ){
                    if(opt=='image1'){
                         succ.image1 = fnz;
                    }
                    else if(opt=='image2'){
                         succ.image2 = fnz;
                    }
                    else{
                         succ.image3 = fnz;
                    }

                    succ.save(function(err){
                        if(err){res.send(err)}
                        else{
                            req.flash('slider','File has been uploaded')
                            res.redirect('/manage-sliders');

                        }
                    })
                }
                else{
                    res.send("Contact Admin")
                }
            })
            
        }

    }
    else{
        req.flash('slider','File Couldnot be uploaded !! , Empty File')
        res.redirect('/manage-sliders');
    }
    


})
module.exports = router ;