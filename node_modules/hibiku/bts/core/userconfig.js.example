const path = require('path');

const Configuration = function() {
    
    this.root = __dirname;

    this.engine = {
        
        "views": [
            path.join(this.root, "visage")
        ]

    };

    this.db = {
     
        "host": "localhost",
        
        "name": "hibiku"
        
    };
    
    this.options = {
        
        "locale": "en",
        "frontPage": "index"
        
    };

};

module.exports = new Configuration;