(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
document.body.backgroundColor = "000000"
    
// loop through all elements
var r,g,b;
    
    for (r=0;r<=255;r+=75){
        for(g=0;g<=255;g+=75){
            for(b=0;b<=255;b+=75){
                console.log(r,g,b);
                let hex = rgbToHex(r,g,b);
                createElement(""+hex);
                
                
                
            }
        }
    }
    
    
//hex to rgb, rgb to hex
//https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
    

    
    
    
    
function createElement(hexcolor){
 
var a = document.createElement('a');
var linkText = document.createTextNode(hexcolor.toString());
a.appendChild(linkText);
a.title = hexcolor.toString();
a.href = "/"+hexcolor;
a.className = "colorblock"

a.style.backgroundColor = hexcolor.toString();

document.body.appendChild(a);

}

},{}],2:[function(require,module,exports){
require('./mainDisplay.js');


},{"./mainDisplay.js":1}]},{},[2]);
