const http = require('http');
const fs = require('fs');
const options = {
    host: 'secure.eloqua.com',
    path: '/visitor/v200/svrGP.aspx?pps=50&siteid=1133&DLKey=9e7ef876e5544ff8b56a38850c0cd0c1&DLLookup=%3CC_EmailAddress%3Ezan.ni@servicenow.com%3C/C_EmailAddress%3E&ms=97',
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
        console.log('str', str)
        fs.appendFile('./response.html', str, (err) => {
            if (err) console.log('not able to append');
        })
    })
});

req.end();