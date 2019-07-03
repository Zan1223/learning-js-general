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
    const requestQuery = requestUrl.query.email;
    console.log('requestUrl==>', requestUrl);
    // console.log('requestQuery===>', requestQuery.email)
    switch (requestPath) {
        case '/eloqua': {
            // console.log('options===>', options(requestQuery));
            const request = http.request(options(null), (response) => {
                // response.setEncoding('utf8');

                console.log(`STATUS: ${response.statusCode}`);
                console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
                let str = ''
                response.on('data', (data) => {
                    if (data) {
                        str += data.toString('utf-8');
                    }
                });
                response.on('end', () => {
                    fs.appendFile('./createFile.html', str, () => {})
                    console.log('str ====>', str);
                })
            })
            request.end();
            response.end('call completed');
            break;
        }
        default:
            break;
    }
})

server.listen(4400, () => {
    console.log('You server is running on part: 4400')
});