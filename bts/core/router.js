const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const utils = require('./utils');

const engine = require('./engine/');
engine.use(app);

app.get('/', function(req, res, next) {
    return res.render('index');
    next();
});

app.get('/:name', function(req, res, next) {
    return res.render(req.params.name);
    next();
});

app.get('/bts/editor', function(req, res) {
   return res.render('hibiku-editor'); 
});

app.listen(8080);