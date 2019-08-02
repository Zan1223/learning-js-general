const fs = require('fs');

const rs = fs.createWriteStream('../package-lock.json', {
     highWaterMark: 1024,
});
// const ws = fs.createWriteStream('./package_demo.json');
let str='';

let onDadaCount = 0;
rs.on('data', (data) => {
    console.log(data.toString())
    console.log(onDadaCount++);
    rs.pause();
    console.log(rs.isPaused());
    setTimeout(()=>{
        rs.resume()
    }, 1000);
})
// rs.on('readable',()=>{
//     let dataChunk = rs.read();
//     if(dataChunk){
//         console.log(dataChunk.toString())
//     }
// })

rs.on('end', () => {
    console.log('end', str)
})

//rs.close()