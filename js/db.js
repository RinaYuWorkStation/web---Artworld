const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');


var UserSchema = new mongoose.Schema({
    username:{type:String, required: true},
    password:{type:String, unique: true,required: true},  
    email:{type:String, required: true}
});

var ObjectSchema = new mongoose.Schema({
    objectname:{type:String, required: true},
    artist:{type:String},
    thishex:{type:String},
    stdhex:{type:String}
    
//    postedBy:{
//        type:mongoose.Schema.Types.ObjectId,
//        ref:"User"
//    }
});

ObjectSchema.plugin(URLSlugs('objectname'));

const User = mongoose.model('User',UserSchema);
const Object = mongoose.model('Object',ObjectSchema);


mongoose.connect('mongodb://localhost/artworld')

//mongoose.connect('mongodb://localhost/artworld', (err, database) => {
//  if (err) {
//    return console.log(err);
//  } else {
//    console.log('Connected to database'); 
//
//      
//  }
//});


module.exports = Object;