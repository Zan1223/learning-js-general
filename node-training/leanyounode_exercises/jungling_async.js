var http = require('http')
var bl = require('bl')
var results = []
var count = 0

function printResults() {
    for (var i = 0; i < 3; i++) {
        console.log(results[i])
    }
}

function httpGet(index) {
    http.get(process.argv[2 + index], function (response) {
        response.pipe(bl(function (err, data) {
            if (err) {
                return console.error(err)
            }

            results[index] = data.toString()
            count++

            if (count === 3) {
                printResults()
            }
        }))
    })
}

for (var i = 0; i < 3; i++) {
    httpGet(i)
}



// const http = require('http');

// const urls = [process.argv[2], process.argv[3], process.argv[4]];
// const renderHttp = (url, callback_1, callback_2)=>{
//     http.get(url[0], (response)=>{
//        // response.setEncoding('utf8')
//         let str = '';
//         response.on('data', (data)=>{
//             str += data.toString('utf-8');
//         });
//         response.on('end', ()=>{
//             console.log(str);
//             callback_1.call(this,url, callback_2);
//         })
//     })
// };

// const renderHttp_2 = (url, callback_2)=>{
//     http.get(url[1], (response)=>{
//        // response.setEncoding('utf8')
//        let str = '';
//         response.on('data', (data)=>{
//             str += data.toString('utf-8');
//         });
//         response.on('end', ()=>{
//             console.log(str);
//             callback_2.call(this,url);
//         })
//     })
// };


// const renderHttp_3 = (url)=>{
//     http.get(url[2], (response)=>{
//        // response.setEncoding('utf8')
//        let str = '';
//         response.on('data', (data)=>{
//             str += data.toString('utf-8');
//         });
//         response.on('end', ()=>{
//             console.log(str);
//         })
//     })
// };

// renderHttp(urls, renderHttp_2, renderHttp_3);