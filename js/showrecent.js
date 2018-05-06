
    //var db = require('./db.js');
//var mongoose = require('mongoose');
//
//const Object = db.User;
//
//Object.find({"date":Math.floor((new Date()).getTime() / (24 * 3600 * 1000))},function(err,objects,count){
//  //  console.log(objects)
//    let allimgs = document.getElementsByClassName("imageblock")
//    let i;
//    for(i=1;i<=5;i++){
//     let aimg = document.getElementById("img"+i)
//     aimg.src = objects[i-1].objectname;  
//        
//    }
//    
//})


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("artworld");
  var query = { date: Math.floor((new Date()).getTime() / (24 * 3600 * 1000)) };
  dbo.collection("objects").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
 
  });
});