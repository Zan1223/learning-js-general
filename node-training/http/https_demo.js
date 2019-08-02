const https = require('https');
const server = https.createServer();

server.on('request', (request, response)=>{
    response.end('hello world');
})
server.listen(8080, ()=>{
    console.log('server running on port: 8080');
})