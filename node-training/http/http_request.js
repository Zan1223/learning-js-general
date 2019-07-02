const http = require('http');
const fs = require('fs');
const options = {
    host: 'www.google.com',
    path: '/',
    method: 'GET'
}
const req = http.request(options, (response) => {
    let str = '';
    // receive the data from response
    response.on('data', (data) => {
        if (data) {
            str += data.toString('utf-8');
        }
    });
    // when the data transfer is complete.
    response.on('end', () => {
        fs.appendFile('./response.html', str, (err) => {
            if (err) console.log('not able to append');
        })
    })
});

req.end();