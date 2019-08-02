const Koa = require('koa');
const fs = require('fs');
const app = new Koa();
const port = 8888;
const jsonObj = {
    "name": "Louis Vo"
}
const dataFilePath = './data.json';
// Koa ctx API
app.use(async (ctx, next) => {
    // request properties in header
    // ctx.request.header;
    // ctx.request.method;
    // ctx.request.type;
    // ctx.request.search;
    // ctx.request.get('Context-Type');
    // ctx.request.set('Context-Type','application/json');
    // ctx.request.accepts(['application/json', 'application/javascript'])

    // response properties in header
    // ctx.response.body = '<h1>Hello World</h1>';
    // ctx.response.status = 200;
    // ctx.response.redirect('/local')

    // ctx.throw()
    // ctx.throw(404, 'Not Found Baby!') // where the first argument is the status code and the second argument will be returned in the body

    // Accepts
    // if(!ctx.request.accepts(['application/json', 'text/plain'])){
    //     ctx.throw(406, 'content type not acceptable');
    // }
    // ctx.response.status = 200;
    // ctx.response.body = 'Hello World';


    // Redirect 302
    // if(ctx.request.path.indexOf('local') === -1){
    //     ctx.response.redirect('./local');
    // }else{
    //     ctx.response.status = 302;
    //     ctx.response.body = 'redirected';
    // }

    // Attachment
   // ctx.response.attachment('koa_demo');
    // ctx.response.body = fs.createReadStream('./index.html');

    const rs = fs.createReadStream('./index.html');
    let str=''
    rs.on('data', (res)=>{
        str+= res.toString();
    })
    rs.on('end',()=>{
        console.log(str);
        ctx.response.body = str;
    })

})

app.listen(port, () => console.log(`you local server is running at port: ${port}`));