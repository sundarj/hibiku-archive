const hibiku = require('hibiku');
const compression = require('compression');

hibiku.app.use(compression());
hibiku.listen(process.env.PORT, process.env.IP);
