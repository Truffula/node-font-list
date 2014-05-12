/**
 * Node.js system font list module for node-webkit.
 * 
 * Gets a list of system fonts.
 */

"use strict";

var nmFs = require("fs");
var nmPath = require("path");
var strPlatform = require("os").platform();

var aSystemFonts = [];
var isFont;
var objFontPaths;

if (strPlatform === "win32"
 || strPlatform === "win64") {
    isFont = function(extn) {
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
    };
    objFontPaths = {
        searchSubdirs: false, // Font paths have subdirectories
        dirs: "C:\\WINDOWS\\FONTS" // dir for single system font directory
    };
} else if (strPlatform === "Linux_x86") {
    isFont = function(extn) {
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
    };
    var getLinuxFontDirs = function() {
        var aFontPaths = [];
        var reFontDirRegex = /<dir(\s\w+=['"][\w\s]+['"])*>(.+)<\/dir>/igm;
        var strFontConfPath = "/etc/fonts/fonts.conf";
        // Linux's system font directories are listed in /etc/fonts/fonts.conf
        var strFontConf = nmFs.readFileSync(
            strFontConfPath,
            { flags: "rs", encoding: "utf8" }
        );

    };
    objFontPaths = {
        searchSubdirs: true, // Font paths have subdirectories
        dirs: getLinuxFontDirs() // dir for single system font directory
    };
}

function getFonts(strPath, searchSubdirs) {
    if (searchSubdirs === undefined) searchSubdirs = false;
    var aNames = nmFs.readdirSync(strPath);
    var strSep = nmPath.sep;
    for (var iii = 0; iii < aNames.length; iii++) { // ES5
        var strFName = aNames[iii];
        var objFStat = nmFs.statSync(strPath + strSep + strFName);
        var strFExtn = "";
        try {
            strFExtn = nmPath.extname(strFName);
        } catch (e) {
            console.warn("No extension found on " + strFName + "!");
        }
        if (objFStat.isFile()
        && isFont(strFExtn)) {
            aSystemFonts.push(nmPath.basename(strFName, strFExtn));
        } else if (objFStat.isDirectory() && searchSubdirs) {
            getFonts(strPath + strSep + strFName, true);
        }
    }
}

if (typeof objFontPaths.dirs === "string") { // One directory for system fonts
    console.log("One directory for system fonts.");
    getFonts(objFontPaths.dirs, objFontPaths.searchSubdirs);
} else if (typeof objFontPaths.dirs === "object") { // Many directories for system fonts.
    console.log("Many directories for system fonts.");
    for (var iii = 0; iii < objFontPaths.dirs.length; iii++) {
        getFonts(objFontPaths.dirs[iii], objFontPaths.searchSubdirs);
    }
}
// for (var iii = 0; iii < aFontPaths.length; iii++) {
//     if (iii === 0) {
//         blnLookInSubdirs = aFontPaths[iii];
//     } else {
//         var curPath = aFontPaths[iii];
//         try {
//             // Get names of fonts in directory
//             var aFiles = nmFs.readdirSync(curPath);
//             var aFonts = [];
//             function getFonts(aFiles) {
//                 for (var jjj = 0; jjj < aFiles.length; jjj++) {
//                     if (nmFs.stat(aFiles[jjj]).isFile()) {
//                         // Get extension of file
//                     } else if (nmFs.stat(aFiles[jjj]).isDirectory()) {
                        
//                     }
//                 }
//             }
//         } catch(e) {
//             console.log("ERROR: Directory " + curPath + " does not exist!"
//             + "\nDetails: \n" + e);
//         }
//     }
// }

console.log(aSystemFonts);
module.exports = aSystemFonts;