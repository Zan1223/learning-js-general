const fs = require('fs');
const filePath = './store.json';
let content = {
    k2: "v1",
    k5: "v2"
}

function isFileExisting(path, callback) {
    fs.access(path, fs.constants.F_OK, (err) => {
        if (err) {
            callback(false);
        } else {
            callback(true);
        }
    })
}

function updateValue(path, key, value, callback) {
    fs.access(path, fs.constants.F_OK, (err) => {
        if (err) throw err;
        console.log('file exists');
        fs.readFile(path, (err, data) => {
            if (err) throw err;
            if (data) {
                callback(JSON.parse(data), key, value);
            }
        })
    })
}

// isFileExisting(filePath, (fileExisting)=>{
//     if(!fileExisting){
//         fs.appendFile(filePath, JSON.stringify(content,null, 1), (err)=>{
//             if(err) throw err;
//             console.log('content added successfully')
//         })
//     }else{
//         fs.readFile(filePath, (err, data)=>{
//             if(err) throw err;
//             if(data){
//                 content = JSON.parse(data);
//             }
//         })
//     }
// })

//callback function
const callbackFn = (oldData, key, value) => {
    const obj = oldData;
    // console.log(obj);
    // console.log(key);
    obj[key] = value;
    fs.writeFile(filePath, JSON.stringify(obj, null, 1), (err) => {
        if (err) throw err;
        console.log('The file has been updated');
    })
}


updateValue(filePath, 'k1', 'This is my world', callbackFn);