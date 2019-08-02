const http = require('http');
const url = require('url');

//create a server 
const server = http.createServer();

server.on('request', (request, response) => {
    const requestUrl = url.parse(request.url, true);
    const requestPath = requestUrl.pathname;

    switch (requestPath) {
        //when the request URL includes the /eloqua path
        case '/bin/stock-info': {
            const reqSent = http.request('http://www.pacwest-usa.com/bootstrap/js/bootstrap.min.js',{
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
            break;
        }
        default:
            break;
    }
})

server.listen(8800, () => {
    console.log('You server is running on part: 8800')
});