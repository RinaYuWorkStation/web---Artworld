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
var db = require('./js/db.js')
var color = require('./js/color.js')
var fs = require('fs')

const path = require('path');
app.use(express.static(__dirname));

var lasthex="default";
//var lastfive=[]
var testglobalvariable = "testtest"

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const Object = mongoose.model('Object');

app.get('/test',function(req,res){
    
})


//find last 5 in database
app.get('/update', function(req,res){


let updatehtml = fs.readFileSync('update.html').toString();
//res.send(updatehtml);
    //
let lastObjects;
Object.find(function(err,objects,count){
    //fetch html data and async call
    if(objects){
        lastObjects = objects.reverse().slice(0,5)
        logfile(updatehtml,lastObjects);
    }

    else{ 
        res.send('error on finding todays images');
    }
 
})

    
// async change data and send   
function logfile(content,objects){

let urlarray = []
let a=0;
for(a=0;a<5;a++){
    urlarray.push(objects[a].objectname)
}

let src1 = urlarray[0];

let modifiedstr='<script>let imgs=document.getElementsByClassName("imageblock");imgs[0].src= "'+src1+'";imgs[1].src= "'+urlarray[1]+'";imgs[2].src= "'+urlarray[2]+'";imgs[3].src= "'+urlarray[3]+'";imgs[4].src= "'+urlarray[4]+'";</script>';
     
let modifiedhtml = content.toString().replace("nothingparam",modifiedstr);
res.send(modifiedhtml);
   
}
})

//auto update engine
app.post('/update', function(req,res){

let myurl = req.body.thisurl;
console.log(myurl)
    
var thishex, thisrgb,stdhex;

color.analyzeColor(myurl,function(response){
        console.log('upload from auto update file analyze color');
         thishex = response;
         thisrgb = color.hexToRgb(thishex);
         stdhex = color.findColorCategory(thisrgb);
     
      var newObject = new Object({
        objectname:myurl,
        artist:"test",
        thishex:thishex,
        stdhex:stdhex,
        date: Math.floor((new Date()).getTime() / (24 * 3600 * 1000))
    });
    
     lasthex = stdhex;
      
     newObject.save(function(err){
        if(err){throw err}
         console.log("save to mongodb success");
         console.log(newObject)
    })
    })
   res.redirect('/update');

})





// url post, analyze color and save to mongodb
app.post('/',function(req,res){
    console.log(req.body.url);
    console.log('important')
    var thishex, thisrgb,stdhex;
    
    color.analyzeColor(req.body.url,function(response){
        console.log('post / analyze color');
         thishex = response;
         thisrgb = color.hexToRgb(thishex);
         stdhex = color.findColorCategory(thisrgb);
        
      var newObject = new Object({
        objectname:req.body.url,
        artist:"test",
        thishex:thishex,
        stdhex:stdhex,
        date:Math.floor((new Date()).getTime() / (24 * 3600 * 1000))
    });
    
        
      lasthex = stdhex;
      console.log("post / lasthex",lasthex)
      testglobalvariable = "changedtest"
      console.log("testglobalvariable",testglobalvariable)
        
     newObject.save(function(err){
        if(err){throw err}
         console.log("save");
         console.log(newObject)
    })
        
         res.redirect('/done');
    })
    
})


app.post("/s3analyze", function(req, res){
let myfilename = req.body.file_name;    
var thishex, thisrgb,stdhex;
 color.analyzeColor("https://s3.amazonaws.com/jackietest/"+myfilename,function(response){

        console.log('upload from local file analyze color');
         thishex = response;
         thisrgb = color.hexToRgb(thishex);
         stdhex = color.findColorCategory(thisrgb);
     
      var newObject = new Object({
        objectname:"https://s3.amazonaws.com/jackietest/"+myfilename,
        artist:"test",
        thishex:thishex,
        stdhex:stdhex,
        date:Math.floor((new Date()).getTime() / (24 * 3600 * 1000))
    });
    
          lasthex = stdhex;
     
     newObject.save(function(err){
        if(err){throw err}
         console.log("save");
         console.log(newObject)
    })  
    res.redirect('/done')
    })

})

app.post("/s3creds", function(req, res){
  console.log("/s3creds")
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
    
});


var myarray = ['000000','00004b','000096','0000e1','004b00','004b4b','004b96','004be1','009600','00964b','009696','0096e1','00e100','00e14b','00e196','00e1e1','4b0000','4b004b','4b0096','4b00e1','4b4b00','4b4b4b','4b4b96','4b4be1','4b9600','4b964b','4b9696','4b96e1','4be100','4be14b','4be196','4be1e1','960000','96004b','960096','9600e1','964b00','964b4b','964b96','964be1','969600','96964b','969696','9696e1','96e100','96e14b','96e196','96e1e1','e10000','e1004b','e10096','e100e1','e14b00','e14b4b','e14b96','e14be1','e19600','e1964b','e19696','e196e1','e1e100','e1e14b','e1e196','e1e1e1'];


var i;
for(i=0;i<myarray.length;i++){
let thishex = myarray[i];
    app.get("/"+myarray[i],function(req,res){

        Object.find({"stdhex":"#"+thishex},function(err,objects,count){
            if (err) {throw err;}
            let expression = "<html>";
            var j;
            for(j=0;j<objects.length;j++){
                let eachobject = objects[j];
               expression += "<img src="+eachobject.objectname+" alt="+eachobject.thishex+">";
            }
            expression+="</html>"
            res.send(expression);
            
        })
})
}

app.get('/done', function(req,res){
    
        let data = fs.readFileSync('done.html')
        console.log(data)
        if(data){
            console.log("get /done",lasthex)
            console.log("testglobalvariable",testglobalvariable)
           logfile(data,lasthex)
            //data.replace('reservedParam','some data')
        }
        else{
            console.log('na')
        }
    
    function logfile(content,lasthex){
       let modifiedhtml = content.toString().replace('#e1e1e1',lasthex)
        res.send("<html>"+modifiedhtml+"</html>")

    }

})



app.listen(9000);

