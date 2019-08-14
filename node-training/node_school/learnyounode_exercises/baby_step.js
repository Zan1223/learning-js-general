const proArray = process.argv.slice(0);
let sum = 0;
proArray.map((e,index) =>{
    if(index > 1){
        sum += Number(e)
    }
});
// for(var i=2; i < proArray.length; i++){
//     sum += Number(praArray[i])
// }
console.log(sum)