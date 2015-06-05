const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const utils = require('./utils');

const engine = require('./engine/engine');
engine.use(app);

app.get('/', function(req, res) {
    res.render('index');
});

app.listen(8080);