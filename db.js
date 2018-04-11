const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');


var UserSchema = new mongoose.Schema({
    
    username:{type:String, required: true},
    password:{type:String, unique: true,required: true},  
    email:{type:String, required: true}

});

var ObjectSchema = new mongoose.Schema({
    
    objectname:{type:String, required: true},
    artist:{type:String, required: true},
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    
});

ObjectSchema.plugin(URLSlugs('objectname'));

mongoose.model('User',UserSchema);
mongoose.model('Object',ObjectSchema);

mongoose.connect('mongodb://localhost/artworld');
