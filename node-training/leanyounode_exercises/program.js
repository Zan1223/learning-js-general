const str = 'preload=abc&reload=efg&name=zan';

const arrInput = str.split('&');
function convertObj(arrInput){
    const arr = arrInput.slice(0);
    const obj = {};
    for(let i in arr){
       // console.log('i==>', i);
        let splited = arr[i].split('=');
        obj[splited[0]] = splited[1];
    }
    return obj;
}

console.log(convertObj(arrInput));