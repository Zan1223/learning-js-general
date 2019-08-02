const http = require('http');
const fs = require('fs');
const server = http.createServer();
const filePath = './index.html';

server.on('request', (request, response)=>{
    response.writeHead(200, { 'content-type': 'text/html' });
    const responseData = fs.createReadStream(filePath);
    responseData.pipe(response);
})

server.listen(8081)