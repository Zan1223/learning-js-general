const net = require('net');

const date = new Date();
const year = date.getFullYear();
const month = formatModify(date.getMonth() + 1);
const day = formatModify(date.getDate());
const hours = formatModify(date.getHours());
const min = formatModify(date.getMinutes());
const time = `${year}-${month}-${day} ${hours}:${min}`;

function formatModify(time){
    return time < 10 ? `0${time}` : time;
}

const server = net.createServer((socket) => {
    // socket.write(time);
    socket.end(time + '\n');

});

server.listen(process.argv[2]);