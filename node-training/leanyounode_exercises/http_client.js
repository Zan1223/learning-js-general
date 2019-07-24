const http = require('http');
const path = process.argv[2];
http.get(path, (response) => {
    response.setEncoding('utf8');
    let str='';
    response.on('data', (data) => {
    //    if(err) console.log(err);
     console.log(data);
        //  if(data) {
        //      str += data + '\n'
        //  } 
    });
    // response.on('end', () => {
    //     console.log(str);
    // });
    response.on('error', (err) => {
        console.log(err);
    });
})