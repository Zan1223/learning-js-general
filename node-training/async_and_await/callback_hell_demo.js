
function readFiles(cb){
    //do something here
    const results = 'Hi My name is Zan'
    return cb(null, results);
};

function readFileAndProcessData(callback){
   const cbResult =  readFiles((error,results)=>{
       if(error) throw error;
        console.log(results);
        return `${results}, I love to bick`
    })
    callback(null, cbResult);
}

readFileAndProcessData((error, results)=>{
    if(error) throw error;
    console.log(results);
})
