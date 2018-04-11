//index.js
var express = require('express')
var app = express()

//didn't have this
var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.get('/', function(req,res){

res.sendFile(__dirname + '/index.html')
    
})

app.get('/js/script.js',function(req,res){
    
    res.sendFile(__dirname + '/js/script.js')

})

app.get('/js/bundle.js',function(req,res){

    res.sendFile(__dirname + '/js/bundle.js')
})


app.listen(3000);