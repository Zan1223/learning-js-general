const fs = require('fs');
const path = require('path');

const filtered = function (pathName, extension, callback) {
    fs.readdir(pathName, (err, list) => {
        if (err) {
            return callback(err);
        }
        const arr = list.filter((item) => {
            return path.extname(item) === `.${extension}`;
        })
        if (!arr.length) {
            callback('no data returned');
        }
        callback(null, arr);;
    })
}
module.exports = filtered;