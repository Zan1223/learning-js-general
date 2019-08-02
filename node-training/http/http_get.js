const https = require('https');

https.get('https://clientapi.gcs-web.com/data/7b99bfb2-ab5a-428d-b1dd-d8120d6c3fda/quotes',(res)=>{
    let str='';
    res.on('data',(chunk)=>{
        str += chunk.toString();
    })
    res.on('end',()=>{
        console.log(str);
    })
})