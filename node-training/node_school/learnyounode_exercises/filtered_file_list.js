const fs = require('fs');
const path = require('path');

function filtered() {
    fs.readdir(arguments[0], (err, list) => {
        if (err) throw err;
        list.forEach((item) => {
            if(path.extname(item) === arguments[1]){
                console.log(item);
            }
        })
    })
}
filtered(process.argv[2], '.' + process.argv[3]);