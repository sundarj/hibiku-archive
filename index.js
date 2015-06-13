const hibiku = require('hibiku');
const compression = require('compression');

hibiku.app.use(compression());
hibiku.listen(8080);
