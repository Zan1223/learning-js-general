const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-body');

const app = new Koa();
const router = new Router();
const users = [];
app.use(bodyParser({
    json: true //set to false to disable json request
}));

// app.use(async (ctx, next)=>{
//     const body = ctx.request.body;
//     console.log(body);
//     ctx.response.body = body;
//     await next();
// })

router
    .get('/user/:name', async (ctx, next) => {
        // RESTFUL API to get users based on name
        const paraName = ctx.params.name;
        const user = users.filter(user => user.name === paraName);
        //print out the data object
        ctx.body = {
            data: {
                user
            }
        };
        await next();
    })
    .post('/user', async (ctx, next) => {
        //post users to the server
       // console.log(ctx.request.body);
        const {
            user
        } = ctx.request.body;
        users.push(user);
       // console.log('posted it');
        ctx.response.body = user;
        await next();
    })

app.use(router.routes());

app.listen(8888, () => {
    console.log('you app is runing on port: 8888');
})