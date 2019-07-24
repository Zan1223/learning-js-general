const Router = require('koa-router');
const routers = new Router();
const db = require('../services/db_service');

routers.get('/post', async (ctx, next) => {
    const content = await db.getData();
    ctx.response.body = {
        "posts": content
    };
});

routers.get('/post/:id', async (ctx, next) => {
    const content = await db.getDataById(ctx.params.id);
    ctx.response.body = {
        "posts": content
    };
});

routers.post('/post', async (ctx) => {
    const body = ctx.request.body;
    const content = await db.postData(body);
    ctx.response.body = content;
});

module.exports = routers;