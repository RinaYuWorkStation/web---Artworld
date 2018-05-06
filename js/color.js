
//color recognition
//let mongoose = require('mongoose')
//require('./db')

const Clarifai = require('clarifai');
//require('./mainDisplay.js')

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

//above 3 functions from
//https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

var currentColorHex;
var currentColorName;

const app = new Clarifai.App({
 apiKey: 'd8e913a9f8c44182bd71386557829b5b'
});

function analyzeColor(filename,callback){
 
    let result = undefined;
    
//    const app = new Clarifai.App({
// apiKey: 'd8e913a9f8c44182bd71386557829b5b'
//});
    
app.models.predict("eeed0b6733a644cea07cf4c60f87ebb7", filename).then(
        
    function(response) {
        let rawColorArray = response["outputs"][0]["data"]["colors"];

        let hexColorArray = {};
        let ColorArray = {};
        var obj;
        for (obj in rawColorArray){
//  hex Color Array stores (w3c) hex color code and the weight value
          hexColorArray[rawColorArray[obj]["w3c"]["hex"]]=rawColorArray[obj]["value"];
//   Color array stores color name and the weight value
           ColorArray[rawColorArray[obj]["w3c"]["name"]]=rawColorArray[obj]["value"];
        }
       
     // Create items array
var sortedHex = Object.keys(hexColorArray).map(function(key) {
    return [key, hexColorArray[key]];
});

// Sort the array based on the second element
sortedHex.sort(function(first, second) {
    return second[1] - first[1];
});
       
    //return the largest potion color 
     
   return callback(sortedHex[0][0]);
        
    },
    function(err) {
        console.log ("error predicting/analyzing");
      // there was an error
    }
        );
   
}


//85
function findColorCategory(myrgb){
    let myred = myrgb.r;
    let mygreen = myrgb.g;
    let myblue = myrgb.b;
    let truered;
    let truegreen;
    let trueblue;
    let r;
    let g;
    let b;
    
for(r=0;r<255;r+=75){
    if(r>=myred){
        truered = r;
        break;
    }
    else if ((r+37.5)>=myred){
        truered = r;
        break;
    }
    
}
    for(g=0;g<255;g+=75){
     if(g>=mygreen){
        truegreen = g;
        break;
    }
    else if ((g+37.5)>=mygreen){
        truegreen = g;
        break;
    }
}
    for(b=0;b<255;b+=75){
     if(b>=myblue){
        trueblue = b;
        break;
    }
    else if ((b+37.5)>=myblue){
        trueblue = b;
        break;
    }
}

    
    let truehex = rgbToHex(truered,truegreen,trueblue);
    return(truehex);
    
    
    
}
var testfile ="https://samples.clarifai.com/metro-north.jpg"


module.exports = {
    findColorCategory:findColorCategory,
    componentToHex: componentToHex,
    hexToRgb:hexToRgb,
    rgbToHex:rgbToHex,
    analyzeColor:analyzeColor,
    app:app
    
    
}

    
 



