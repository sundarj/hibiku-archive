const fs = require('fs');
const path = require('path');

function walk(viewsFolder, callback, within) {
    viewsFolder = typeof viewsFolder === "string" ? [viewsFolder] : viewsFolder;
    viewsFolder.forEach(function(currentDirPath) {
        var dir = within ? currentDirPath : path.join(__dirname, '/../../', currentDirPath);
        fs.readdirSync(dir).forEach(function (filePath) {
            filePath = path.join(dir, filePath);
            var stat = fs.statSync(filePath);
            if (stat.isFile()) {
                callback(filePath, stat);   
            } else if (stat.isDirectory()) {
                walk(filePath, callback, true); 
            }
        });
    });
}

module.exports = {
    walk: walk
}