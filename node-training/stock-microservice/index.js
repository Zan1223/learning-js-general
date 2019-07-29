const http = require('https');
const url = require('url');

//create a server 
const server = http.createServer();
const STOCK_API = 'https://clientapi.gcs-web.com/data/7b99bfb2-ab5a-428d-b1dd-d8120d6c3fda';

function httpRequest(url, request, response){
    const reqSent = http.request(url,{
        method:'GET',
    }, (resRec) => {
         let str = ''
        resRec.on('data', (data) => {
            str += data.toString('utf-8');
            //write data directly to the response.
            response.write(data);
        })
        resRec.on('end', () => {
            //response back with the data
            response.end();
        })
    })
    //request data sent
    request.on('data', (data) => {
        reqSent.write(data);
    })
    //request end
    request.on('end', () => {
        reqSent.end();
    })
}


server.on('request', (request, response) => {
    const requestUrl = url.parse(request.url, true);
    const requestPath = requestUrl.pathname;

    switch (requestPath) {
        //when the request URL includes the /eloqua path
        case '/bin/stock-current': {
            // current stock info
            httpRequest.call(this, `${STOCK_API}/quotes`, request, response);
            break;
        }
        case '/bin/stock-lookup': {
            // historical info
            //httpRequest.call(this, `${STOCK_API}/quotes`, request, response);
            break;
        }
        case '/bin/stock-filing': {
            // filings
            //httpRequest.call(this, `${STOCK_API}/quotes`, request, response);
            break;
        }
        default:
            break;
    }
})

server.listen(8800, ()=> console.log('server running on port: 8800'));