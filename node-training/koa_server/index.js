const Koa = require('koa');
const koaBodyParser = require('koa-body');
const koaRouter = require('./router/routers');

const koa = new Koa();
koa.use(koaBodyParser());
koa.use(koaRouter.routes())
    .use(koaRouter.allowedMethods());

koa.listen(8088, ()=>{console.log('your server is running on port: 8088')})