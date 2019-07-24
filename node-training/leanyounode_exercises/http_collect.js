const http = require('http');
const fs = require('fs');

const path = process.argv[2];

http.get(path, (response)=>{
    let str = '';
    let charCount = 0;
   // response.setEncoding('utf8')
    response.on('data', (data)=>{
        str += data.toString('utf-8');
    });
    response.on('end', ()=>{
        charCount = str.length;
        console.log(charCount + '\n' + str);
    })
})