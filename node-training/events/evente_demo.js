const {EventEmitter} = require('events');
//console.log(EventEmitter);
const myEmitter = new EventEmitter();
function login(){
    console.log('event emitter registered')
}
myEmitter.on('login', login);

myEmitter.emit('login');

console.log(myEmitter.listenerCount('login'));
//console.log(myEmitter);
