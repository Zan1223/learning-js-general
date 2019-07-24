const fs = require('fs');

const readstream = fs.createReadStream('./read_file.txt');
console.log(readstream);
const writestream = fs.createWriteStream('./write_file.txt');
readstream.pipe(writestream);