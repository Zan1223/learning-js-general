
// index.js for demoing react and redux
import React from 'react';
import ReactDOM from 'react-dom';
import ReduxExample from './components/ReduxExample/ReduxExample';
import { createStore } from 'redux';
// import CHESSBOARD from './components/ChessBoard/ChessBoard';
// import CLOCK from './components/Clock/Clock';
const counter = (state, action) => { // same as reducer
    if (state === undefined || state === 'undefined') {
        return 0;
    }
    switch (action.type) {
        case 'add':
            return state + action.payload;
        case 'minus':
            return state - action.payload;
        default:
            return state;
    }
}
const store = createStore(counter);

// const add1 = (meg) => {
//     store.dispatch({ type: 'add', payload: 1 })

// }

const addAsync = () => {
    setTimeout(()=>{
        store.dispatch({ type: 'add', payload: 1 })
    },2000)
}
render();
store.subscribe(()=>{
    render();
})
function render(){
    ReactDOM.render(<ReduxExample onclick1={()=>{store.dispatch({ type: 'add', payload: 1 })}} onclick2={()=>{store.dispatch({ type: 'minus', payload: 1 })}} onclick3={addAsync} value={store.getState()} />, document.getElementById('root'));

}
