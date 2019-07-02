const http = require('http');
//const qs = require('querystring');
const url = require('url');
const fs = require('fs');
const server = http.createServer();
const users = [];
server.on('request', (request, response) => {
    const requestUrl = url.parse(request.url, true);
    const method = request.method;
    switch (requestUrl.pathname) {
        case '/user':
            switch (method) {
                case 'GET': {
                    fs.readFile('users.json', 'utf8', (err, data) => {
                        if (err) throw err;
                        const userJson = JSON.parse(data);
                        const username = requestUrl.query.name;
                        const user = userJson.users.find(u => u.name.toLowerCase() === username.toLowerCase());
                        response.end(JSON.stringify(user));
                    })
                    break;
                }
                case 'POST': {
                    let str = '';
                    //This is mandatory for receiving the data in chunks, in the request body
                    request.on('data', (data) => {
                        str += data.toString('utf-8');
                    });
                    //when all the data is received, work with the data and send back the response
                    request.on('end', () => {
                        console.log('str-->', str);
                        let userdata = '';
                        try {
                            userdata = JSON.parse(str);
                        } catch (error) {
                            response.statusCode = 400;
                            response.end(JSON.stringify({
                                error: 'You sent a bad request'
                            }));
                        }
                        users.push(userdata);

                        fs.readFile('users.json', 'utf8', (err, data) => {
                            if (err) throw err;
                            const userJson = JSON.parse(data);
                            userJson.users.push(userdata);
                            console.log('userJson=====>', userJson);
                            fs.writeFile('users.json', JSON.stringify(userJson), 'utf8', (err, data) => {
                                if (err) throw err;
                                console.log('The file has been saved!');
                            });

                        })
                    });
                    response.statusCode('200')
                    response.end(JSON.stringify({
                        'status': 'success'
                    }));
                    break;
                }
            }
            break;
        case '/users/all': {
            if (method === 'GET') {
                response.setHeader('Content-Type', 'application/json')
                console.log('users----->', users);
                response.end(JSON.stringify({
                    'users': users
                }));
            }
            break;
        }
        default:
            break;
    }
    // switch (contentType) {
    //     case 'text/plain': {
    //         let str = '';
    //         //set the context-type format in response headers
    //         res.setHeader('Content-Type', 'text/plain')
    //         //send the data in chunks
    //         req.on('data', (data) => {
    //             str += data.toString('utf-8');
    //         });
    //         //when all the data is sent, sent back the response
    //         req.on('end', () => {
    //             res.end(`You sent for: ${str}`);
    //         });
    //         break;
    //     }
    //     case 'application/json': {
    //         let str = '';
    //         //set the context-type format in response headers
    //         res.setHeader('Content-Type', 'application/json')
    //         //send the data in chunks
    //         req.on('data', (data) => {
    //             str += data.toString('utf-8');
    //         });
    //         //when all the data is sent, sent back the response
    //         req.on('end', () => {
    //             let jsonReqBody = '';
    //             try{
    //                 jsonReqBody = JSON.parse(str);
    //             } catch(error){
    //                 res.statusCode = 400;
    //                 res.end(JSON.stringify({error: 'You sent a bad request'}));
    //             }
    //             res.end(JSON.stringify(jsonReqBody));
    //         });
    //         break;
    //     }
    //     case 'application/x-www-form-urlencoded': {
    //         let str = '';
    //         //set the context-type format in response headers
    //         res.setHeader('Content-Type', 'text/plain')
    //         //send the data in chunks
    //         req.on('data', (data) => {
    //             str += data.toString('utf-8');
    //         });
    //         //when all the data is sent, sent back the response
    //         req.on('end', () => {
    //            // const query = qs.parse(str);
    //             res.end(str);
    //         });
    //         break;
    //     }
    //     case 'multi-part/form-data':
    //         res.end(`You sent a file / multi-part/form-data`);
    //         break;
    //     default:
    //         res.end(`Bad request`);
    // }
})
server.listen({
    port: 8909
}, () => {
    console.log("your server starts at localhost:8909")
});