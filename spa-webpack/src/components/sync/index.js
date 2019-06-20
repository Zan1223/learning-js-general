import {isArray} from 'lodash-es';
import item from './sync.css';
//import { truncateSync } from 'fs';

const sync = function(){
    console.log('hello');
    fetch('/api/test')
    .then(response=>response.json())
    .then(data=>{
        console.log("results--->", data.message);
    });
   // document.getElementById('app').innerHTML = `<h1 class='${item.test}'>Hello World!</h1>`
}

const isArrayFn = function(args){
    console.log(isArray(args));
}

export {
    sync,
    isArrayFn
}