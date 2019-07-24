const totalNum = 5

function promise(a,b){
    this.a = a;
    this.b = b;
   // callback.call(this, this.a + this.b);
   return person.call(this, this.a, this.b);
}

function person(a,b){
    // this.a = a;
    // this.b = b;
    return a + b;
}

const number = promise(10, 30);
console.log(number);
// promise((total)=>{
//     console.log(total);
// })

//person.call(promise());