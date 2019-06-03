import {isArray} from 'lodash-es';
import css from './sync.css';

const sync = function(){
    console.log('hello');
   // document.getElementById('app').innerHTML = `<h1 class='${item.test}'>Hello World!</h1>`
}

const isArrayFn = function(args){
    console.log(isArray(args));
}

export {
    sync,
    isArrayFn
}