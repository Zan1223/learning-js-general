const myModule = require('./make_it_modular_module');
const pathName = process.argv[2];
const extension = process.argv[3];
myModule(pathName, extension, (err, data)=>{
    if(err) return err;
    data.forEach(element => {
        console.log(element);
    });
});