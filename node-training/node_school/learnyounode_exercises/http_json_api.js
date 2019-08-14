const http = require('http');
const url = require('url');
const map = require('through2-map');

const server = http.createServer();

server.on('request', (req, res) => {
    const reqUrl = url.parse(req.url, true);
    // console.log(reqUrl);
    const date = new Date(reqUrl.query.iso);
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    switch (reqUrl.pathname) {
        case '/api/parsetime': {
            if (req.method === 'GET') {
                const hour = date.getHours();
                const minute = date.getMinutes();
                const second = date.getSeconds();
                res.end(JSON.stringify({
                    hour,
                    minute,
                    second
                }));
            }
            break;
        }
        case '/api/unixtime': {
            if(req.method === 'GET'){
                const iso = date.getTime();
                res.end(JSON.stringify({"unixtime":  iso}));
            }
            break;
        }
        default:
            break;
    }
}); 

server.listen(process.argv[2]);