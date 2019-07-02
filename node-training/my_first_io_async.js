const fs = require('fs');
const filePath = process.argv[2];
//const filePath = './test-text.txt';
const callBackFn = (error,data)=>{
    if (error) throw error;
    const lines = data.toString('utf8').split('\n').length - 1;
   console.log(lines);
}
fs.readFile(filePath, 'utf8', callBackFn);