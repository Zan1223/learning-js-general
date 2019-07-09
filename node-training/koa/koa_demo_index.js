const Koa = require('koa');
const fs = require('fs');
const app = new Koa();
const port = 8888;
const dataFilePath = './index.html';

app.use(async (ctx, next)=> {
    ctx.response.body = fs.createReadStream(dataFilePath);
})


app.listen(port, () => console.log(`you local server is running at port: ${port}`));