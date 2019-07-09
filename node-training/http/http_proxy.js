//client --> proxy --> Eloqua

const http = require('http');
const fs = require('fs');
const url = require('url');

//create a server 
const server = http.createServer();

// function options(email) {
//     return {
//         host: 'secure.eloqua.com',
//         path: `/visitor/v200/svrGP.aspx?pps=50&siteid=1133&DLKey=9e7ef876e5544ff8b56a38850c0cd0c1&DLLookup=%3CC_EmailAddress%3E${email}%3C/C_EmailAddress%3E&ms=97`,
//         method: 'GET'
//     };

// }

function options(email) {
    return {
        host: 'www.google.com',
        path: '/',
        method: 'GET',
        headers: {
            'Content-Type': 'text/html'
        }
    };

}

server.on('request', (request, response) => {
    const requestUrl = url.parse(request.url, true);
    const requestPath = requestUrl.pathname;

    const {
        method,
        path,
        headers
    } = request;
   // console.log('headers', headers);
    switch (requestPath) {
        //when the request URL includes the /eloqua path
        case '/eloqua': {
            const reqSent = http.request({
                host: 'www.google.com',
                method:'GET',
                headers: {
                    'Content-Type': 'text/html'
                }
            }, (resRec) => {
                 let str = ''
                resRec.on('data', (data) => {
                   // console.log('data==>', data);
                    str += data.toString('utf-8');
                    //write data directly to the response.
                    response.write(data);
                })
                resRec.on('end', () => {
                    //response back with the data
                    response.end(()=>{
                        fs.appendFile('./createFile.html', str, () => {});
                    });
                })
            })
            //request data sent
            request.on('data', (data) => {
                reqSent.write(data);
            })
            //request end
            request.on('end', () => {
                reqSent.end('call completed');
            })
            //response.end('call completed');
            break;
        }
        default:
            break;
    }
})

server.listen(4400, () => {
    console.log('You server is running on part: 4400')
});