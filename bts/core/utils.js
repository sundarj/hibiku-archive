const fs = require('fs');
const path = require('path');

function walk(currentDirPath, callback) {
    fs.readdir(path.join(__dirname, currentDirPath), function (err, files) {
        console.log(files);
        if (err) throw err;
        files.forEach(function (name) {
            const filePath = path.join(currentDirPath, name);
            fs.stat(filePath, function (err, stat) {
                if (err) throw err;
                if (stat.isFile()) {
                    callback(filePath, stat);
                } /*else if (stat.isDirectory()) {
                    walk(filePath, callback);
                }*/
            });
        });
    });
}

module.exports = {
    walk: walk
}