
var r,g,b;
    
    for (r=0;r<=255;r+=75){
        for(g=0;g<=255;g+=75){
            for(b=0;b<=255;b+=75){
               // console.log(r,g,b);
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
    let routename = hexcolor.substring(1);
    console.log(routename)
    
a.href = "/"+routename;
a.className = "colorblock"

a.style.backgroundColor = hexcolor.toString();

document.body.appendChild(a);

}

