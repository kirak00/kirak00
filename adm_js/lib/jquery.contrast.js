var colorType = "";

function isValidateColorName(c) {
    var d = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen", "RebeccaPurple"];
    var b = c.trim().toLowerCase();
    var a = "";
    d.some(function(f, e) {
        if (b === f.toLowerCase()) {
            a = f;
            return true
        }
    });
    if (a !== "") {
        return a
    }
    return false
}


function isValidateColorHex(a) {
    a = a.trim();
    if (a.match(/^#?[a-f0-9]{6}$/i) !== null || a.match(/^#?[a-f0-9]{3}$/i) !== null) {
        if (a.substr(0, 1) !== "#") {
            a = "#" + a
        }
        return a
    }
    return false
}

function isValideRgbMaxValue(e) {
    var a = e.match(/(\d{1,3})/g);
    if (a !== null) {
        var d = true;
        for (var b = 0, f = a.length; b < f; b++) {
            if (a[b] > 255) {
                d = false
            }
        }
        return d
    }
    return false
}

function isValidateColorRgb(a) {
    a = a.trim();
    if (a.match(/^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)?$/i) !== null) {
        if (isValideRgbMaxValue(a) === true) {
            if (a.substr(-1) !== ")") {
                a = a + ")"
            }
            return a
        }
    } else {
        if (a.match(/^(\d{1,3}),(\d{1,3}),(\d{1,3})$/i) !== null) {
            if (isValideRgbMaxValue(a) === true) {
                return "rgb(" + a + ")"
            }
        }
    }
    return false
}



function isValidateColor(c) {
    c = c.trim();
    var b = c.match(/,/g);
    var a = false;
    if (b !== null) {
        if (b.length === 2) {
            a = isValidateColorRgb(c);
            if (a !== false) {
                colorType = "rgb"
            }
        }
    } else {
        a = isValidateColorHex(c);
        if (a !== false) {
            colorType = "hex"
        } else {
            a = isValidateColorName(c);
            if (a !== false) {
                colorType = "name"
            }
        }
    }
    return a
}

function hexToRgb(c) {
    if (c.match(/^#?[a-f0-9]{3}$/i) !== null) {
        var b = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(c);
        c = b[1] + b[1] + b[2] + b[2] + b[3] + b[3]
    }
    var a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);
    return "rgb(" + parseInt(a[1], 16) + "," + parseInt(a[2], 16) + "," + parseInt(a[3], 16) + ")"
}

function rgbToHex(c) {
    var b = c.replace(/[^\d,]/g, "").split(",");
    return "#" + ((1 << 24) + (+b[0] << 16) + (+b[1] << 8) + +b[2]).toString(16).slice(1)
}

function computeContrast(a, b) {
    return Math.round((a + 0.05) / (b + 0.05) *100)/100
}

function getComposantValue(a) {
    var b = a / 255;
    if (b <= 0.03928) {
        return b / 12.92
    } else {
        return Math.pow(((b + 0.055) / 1.055), 2.4)
    }
}

function getLuminosity(b) {
    var f = isValidateColor(b.toString());
    
    if (colorType === "hex") {
        b = hexToRgb(b)
    }

    var e = /(.*?)rgb\((\d+),(\d+),(\d+)\)/.exec(b);
    var f = parseInt(e[2]);
    var d = parseInt(e[3]);
    var a = parseInt(e[4]);
    var c = getComposantValue(f) * 0.2126 + getComposantValue(d) * 0.7152 + getComposantValue(a) * 0.0722;
    return c
}

function getContrastRatio(d, c) {
    var a = getLuminosity(d);
    var b = getLuminosity(c);
    if (a > b) {
        return computeContrast(a, b);
    } else {
        return computeContrast(b, a);
    }
}

$.extend( $.krcode, { contrast: { version: "0.1.0" } } );
$.fn.contrast = function( options ){
    //  console.log(this, options)
    var This = $(this);
    This.css("color");
    var a = This.css("color").replace(/ /g,"");
    var b = This.css("background-color").replace(/ /g,"");
    console.log(getContrastRatio(a,b));
    return getContrastRatio(a,b)
};
$.contrastAll = function( options ){
   $("*").each(function(){
        var This = $(this);
        This.css("color");
        var a = This.css("color").replace(/ /g,"");
        var b = This.css("background-color").replace(/ /g,"");
        var c = This.css("display").replace(/ /g,"");
        console.log(c)
        if(b.indexOf("rgba") >=0) return true;
        var d = getContrastRatio(a,b);
        if(d < 3.5){
            console.log(d,this)
        }
   })
};


