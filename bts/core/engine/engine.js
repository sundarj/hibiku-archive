const fs = require('fs');
const path = require('path');
const config = require('../config');

const hibiku = require('./hibiku');

function engine(app) {
    
    app.engine(config.engine.extension, function(path, options, fn) {
        fs.readFile(path, 'utf-8', function(err, data) {
            if (err) console.error(err);
            return fn(null, hibiku.render(data));
        });
    });
    
    app.set('views', config.engine.views);
    app.set('view engine', config.engine.extension.slice(1));
    
}

module.exports = {
    use: engine
}