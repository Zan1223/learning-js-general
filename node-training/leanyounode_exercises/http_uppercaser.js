const http = require('http');
const map = require('through2-map');

const server = http.createServer();
server.on('request', (request, response) => {
    const method = request.method;
 /* regular http request */   
    // let str = '';
    // if (method === "POST") {
    //     request.on('data', (data) => {
    //         str += data.toString('utf-8');
    //     })
    //     request.on('end', () => {
    //         response.end(str.toUpperCase());
    //     })
    // }
/* use through2-map */
    if(method === "POST"){
        request.pipe(map(function (chunk) {
            return chunk.toString().toUpperCase();
          })).pipe(response)
    }
})
// console.log(map);

server.listen(process.argv[2]);