const fs = require('fs');
const parse = require('pegjs').buildParser(fs.readFileSync(__dirname + "/hibiku-parse.pegjs", 'utf-8')).parse;
const utils = require('../utils');
const config = require('../config');

var files = [];
const extRegex = new RegExp("\\" + config.engine.extension + "$");
utils.walk(config.engine.views, function (f, s) {
    f.match(extRegex) && files.push(f.replace(extRegex, ''));
});
console.log(files);

var template = {
    files: {
        header: '<!doctype html><html lang="en"><head></head><body>',
        footer: '</body></html>'
    },
    'main title': 'Hello',
    'main content area': 'Yo'
}

function render(data) {
    /* get template tags */
    var view = parse(data.split("\n").map(function(line) {
        return line.match(/\(\([^]+?\)\)/g);
    }).filter(function(i) { return i }).join("\n"));
    
    view.forEach(function(tag) {
        var s = '';
        var token;
        tag.forEach(function(part) {
            if (part) {
                if (part.token) {
                    s += token = part.token;
                } else {
                    s+=part;
                }
            }
        });
        
        s = s.replace(/\n/g, '');
        
        if (token[0] === '>')
            data = data.replace(s, template.files[token.slice(1)]);
        else
            data = data.replace(s, template[token]);
    });
    
    return data;
}

module.exports = {
    render: render
}