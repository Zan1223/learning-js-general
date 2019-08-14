const fs = require('fs');
const filePath = process.argv[2];
const contents = fs.readFileSync(filePath);
const lines = contents.toString('utf8').split('\n').length - 1;
console.log(lines);