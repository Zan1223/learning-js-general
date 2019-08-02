const http = require('https');
const url = require('url');
const fs = require('fs');

const options = {
    key: fs.readFileSync('./server.key'), //this needs to be updated once running on remote server
    cert: fs.readFileSync('./server.crt'), //this needs to be updated once running on remote server
}
//console.log('options.key===>', options.key)
//create a server 
const server = http.createServer(options);
const STOCK_API = 'https://clientapi.gcs-web.com/data/7b99bfb2-ab5a-428d-b1dd-d8120d6c3fda';
//const STOCK_API = 'http://www.pacwest-usa.com/js/lhtpM.js';

function httpRequest(url, request, response){
    const reqSent = http.get(url, options, (resRec) => {
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
            // historical info lookup
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