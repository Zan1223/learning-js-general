const totalNum = 5

function promise(a,b){
    this.a = a;
    this.b = b;
   // callback.call(this, this.a + this.b);
   person.call(this, this.a + this.b);
}

function person(){
    console.log(this.a + this.b);
}

promise(10, 11);
// promise((total)=>{
//     console.log(total);
// })

//person.call(promise());