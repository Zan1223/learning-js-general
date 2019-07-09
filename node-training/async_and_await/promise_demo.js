const promise = new Promise((resolve, reject)=>{
console.log(1);
    resolve(12345);
}).then((r)=>{
    console.log('first r',r);
}).then((r)=>{
    console.log('second r', r);
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(100);
        }, 500)
    })
}).then((r)=>{
    console.log('5');
    console.log(r);
});

console.log(2)

setTimeout(()=>{
    console.log(3)
}, 0)