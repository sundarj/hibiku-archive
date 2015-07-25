const hibiku = require('hibiku');
const compress = require('koa-compress');

hibiku.use(compress());
hibiku.listen(process.env.PORT, process.env.IP);