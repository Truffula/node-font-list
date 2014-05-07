/**
 * Node.js system font list module for node-webkit.
 * 
 * Gets a list of system fonts.
 */

"use strict";

var nmFs = require("fs");
var nmPath = require("path");
var nmOs = require("os");

var aSystemFonts = [];

function isFont(extn) {
    switch(extn) {
        case ".ttf":  // Intentional fall-through, as
        case ".woff": // these are all extensions of font files
        case ".otf":
        case ".pfb":
        // case ".fon": // Adobe font
            return true;
        default:
            return false;
    }
}

function getLinuxFontDirs() {
    var aFontPaths = [];
    var reFontDirRegex = /<dir(\s\w+=['"][\w\s]+['"])*>(.+)<\/dir>/igm;
    var strFontConfPath = "/etc/fonts/fonts.conf";
    // Linux's system font directories are listed in /etc/fonts/fonts.conf
    var strFontConf = nmFs.readFileSync(
        strFontConfPath,
        { flags: "rs", encoding: "utf8" }
    );
    
}

var objFontPaths = {
    "Linux": {
        hasSubdirs: true, // Font paths have subdirectories
        dirs: getLinuxFontDirs() // dirs for multiple system font directories
    },
    "Windows" : {
        hasSubdirs: false, // Font paths have subdirectories
        dir: "C:\\WINDOWS\\FONTS" // dir for single system font directory
    }
};

var strPlatform = nmOs.type();

var aFontPaths = objFontPaths[strPlatform];
var blnLookInSubdirs;
for (var iii = 0; iii < aFontPaths.length; iii++) {
    if (iii === 0) {
        blnLookInSubdirs = aFontPaths[iii];
    } else {
        var curPath = aFontPaths[iii];
        try {
            // Get names of fonts in directory
            var aFiles = nmFs.readdirSync(curPath);
            var aFonts = [];
            function getFonts(aFiles) {
                for (var jjj = 0; jjj < aFiles.length; jjj++) {
                    if (nmFs.stat(aFiles[jjj]).isFile()) {
                        // Get extension of file
                    } else if (nmFs.stat(aFiles[jjj]).isDirectory()) {
                        
                    }
                }
            }
        } catch(e) {
            console.log("ERROR: Directory " + curPath + " does not exist!"
            + "\nDetails: \n" + e);
        }
    }
}

module.exports = aSystemFonts;