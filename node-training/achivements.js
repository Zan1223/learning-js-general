const http = require('http');
const fs = require('fs');

const server = http.createServer();

server.on('request',(req,res)=>{
  res.setHeader('Content-Type','application/json');
  res.setHeader('Access-Control-Allow-Origin','*');
   const reqStream = fs.createReadStream('./achivements.json');
   reqStream.pipe(res);
})

server.listen(8888,()=>{console.log('server on port: 8888')});