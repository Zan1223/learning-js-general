const http = require('http');
const fs = require('fs');
const url = require('url');
const server = http.createServer();
const port = 8000;
const filePath = './index.html';

server.on('request', (request, response) => {
    response.writeHead(200, {
        'content-type': 'text/html'
    });
    const responseData = fs.createReadStream(filePath);
    responseData.pipe(response);
    //response.end();

    //requests
    const reqUrl = url.parse(request.url, true);
    const reqPath = reqUrl.pathname;
    //     console.log(reqUrl.query);
    const method = request.method;
    //const referer = request.referer;
    //console.log("referer====>", request.headers.referer);
    switch (reqPath) {
        case '/bin/user': {
            switch (method) {
                case 'GET': {
                    // let str='';
                    // request.on('data', (data)=>{
                    //     str+= data.toString('utf-8');
                    // });
                    // request.on('end', ()=>{
                    //     console.log(str);
                    //     response.end();
                    // })
                }
                break;
            case 'POST': {
                let str = '';
                request.on('data', (data) => {
                    str += data.toString('utf-8');
                });
                request.on('end', () => {
                    // console.log(str);
                    // fs.access('./userdata.txt', fs.constants.F_OK, (err) => {
                    //     if (err) console.log(err);
                    //     console.log('gets here -1');
                    //     console.log(str);
                    //     fs.appendFile('./userdata.txt', str, (err) => {
                    //         if (err) console.log(err)
                    //     });
                    // })
                })
                request.on('error', (err) => {
                    if (err)
                        response.end('bad request');
                })

                response.writeHead(302, {
                    'Location': request.headers.referer
                });
                response.end('thanks for submitting your info');
            }
            break;
            default:
                response.end('bad request');
                break;
            }

            break;
        }
        default:
            break;
    }
})

server.listen(port, () => console.log('your server is runing on port: 8000'))