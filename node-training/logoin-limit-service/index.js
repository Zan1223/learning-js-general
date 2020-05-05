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
const STOCK_API = 'https://servicenowsignon.okta.com/oauth2/default/v1/authorize?client_id=0oakzlc2t3W1goPqt0x7&response_type=code&response_mode=query&scope=openid+profile';


function httpRequest(url, options, request, response) {
    const reqSent = http.get(url, options, (resRec) => {
        let str = ''
       // console.log('resRec====>', resRec.headers);

        const reqLimit = resRec.headers['x-rate-limit-limit'];
        const reqRemaining = resRec.headers['x-rate-limit-remaining'];
        const expiration = resRec.headers['x-rate-limit-reset'];

        const headerJson = {
            reqLimit,
            reqRemaining,
            expiration
        }
        resRec.on('data', () => {
            response.write(JSON.stringify(headerJson));
        })
        resRec.on('end', () => {
            response.end();
        })
    })

    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    // response.setHeader('Content-Encoding', 'gzip');
    response.setHeader('Access-Control-Allow-Origin', '*');
    request.on('end', (data) => {
        reqSent.end(data);
    })
}


server.on('request', (request, response) => {
    const requestUrl = url.parse(request.url, true);
    // console.log(requestUrl);
    const requestPath = requestUrl.pathname;

    switch (requestPath) {
        //when the request URL includes the /eloqua path
        case '/sso/limit': {
            httpRequest.call(this, `${STOCK_API}`, options, request, response);
            break;
        }
        default:
            break;
    }
})

server.listen(8808, () => console.log('server running on port: 8808'));