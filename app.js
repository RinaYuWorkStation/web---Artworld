//index.js
var express = require('express')
var app = express()
var s3PostPolicy = require("s3-post-policy");
var epa = require("epa").getEnvironment();
var s3Config = epa.get("s3");
var moment = require("moment");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
require('./js/db.js')

// //didn't have this
// var path = require('path');
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.get('/', function(req,res){

res.sendFile(__dirname + '/index.html')
})

app.get('/done', function(req,res){

res.sendFile(__dirname + '/done.html')
})

app.get('/js/script.js',function(req,res){
    res.sendFile(__dirname + '/js/script.js')
})

app.get('/style.css',function(req,res){
    res.sendFile(__dirname + '/style.css')
})

app.get('/js/db.js',function(req,res){
    res.sendFile(__dirname + '/js/db.js')
})

app.get('/js/jquery.js',function(req,res){
    res.sendFile(__dirname + '/js/jquery.js')
})

app.get('/js/mainDisplay.js',function(req,res){
    res.sendFile(__dirname + '/js/mainDisplay.js')
})

app.get('/js/upload.js',function(req,res){
    res.sendFile(__dirname + '/js/upload.js')
})


app.get('/js/bundle.js',function(req,res){

    res.sendFile(__dirname + '/js/bundle.js')
})


const Object = mongoose.model('Object');

app.post('/',function(req,res){
      var newObject = new Object({
        objectname:req.body.url,
        artist:"testartist2",
        thishex:"#000002",
        stdhex:"#000000"
    });
    
//    console.log(newObject)
      
     newObject.save(function(err){
        if(err){throw err}
         console.log("save");
         console.log(newObject)
    })
    
    res.redirect('/done');
})


app.post("/s3creds", function(req, res, next){
    
  var filename = req.body.filename;
  var expires = moment().add(120, "minutes").toISOString();
  var contentType = "application/octet-stream";
  var folder = "somefolder"
  
  var policyConfig = {
    id: s3Config.key,
    secret: s3Config.secret,
    bucket: s3Config.bucket,
    region: s3Config.region,
    date: Date.now(),
    policy: {
      expiration: expires,
      conditions: [
      //     {"key": folder+'/'+filename}, 
        {"key": filename}, 
        {"success_action_redirect": s3Config.returnUrl},
        {"Content-Type": contentType}
      ]
    }
  };
    
  var policy = s3PostPolicy(policyConfig);
  console.log(policy);
  res.json(policy.fields);
    
//  var text = document.createTextNode("Upload Success!")    
//  document.getElementById("s3upload").appendChild(text);
    
});

app.listen(3000);
//app.listen(3000);
