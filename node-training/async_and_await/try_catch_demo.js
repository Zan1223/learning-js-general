function helloWorld(){
    console.log('hello World');
}

try{
    helloWorld();
    helloWorld1();
    //new Error('hello World is not true');
}catch(e){
   // console.log(e instance);
   if(e instanceof ReferenceError) {
       console.log(typeof e);
       console.log(e);
       const keys = Object.keys(e);
    console.log(keys);
       for(key in e){
           console.log(e[key]);
       }
   }
  // console.log(e instanceof ReferenceError);
}