const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const config = require('./config');
const utils = require('./utils');

const engine = require('./engine/');
engine.use(app);

var template = {
    'index': {
        'main title': 'Yo',
        'main content area': 'peace'
    }
}

app.get('/', function(req, res, next) {
    return res.render(config.options.frontPage);
    next();
});

var routes = [];
config.engine.views.forEach(function(directory) {
   utils.walk(directory, function(f, s) {
       directory = directory[0] === '/' ? directory : '/' + directory;
       var path = f.replace(process.cwd() + directory, '').replace(config.engine.extension, '');
       if (!path.indexOf('/hibiku-'))
           path = path.replace('/hibiku-', '/bts/');
       routes.push(path);
   });
});

routes.forEach(function(route) {
    var hook;
    if (!route.indexOf('/bts/'))
        hook = route.replace('/bts/', 'hibiku-');
    else
        hook = route.slice(1);
    app.get(route, function(req, res, next) {
        return res.render(hook, template[hook]);
        next();
    });
});

app.use(function(req, res) {
    res.status(404).render('404', { url: req.url });
});

app.listen(8080);