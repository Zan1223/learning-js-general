import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

const CounterContainer = (props) => {
    return (
        <div>
            <div>The number is {props.value}</div>
            <button onClick={() => { props.add() }}>+1</button>
            <button onClick={() => { props.minus() }}>-1</button>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        value: state.value
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // return the dispatch
        add: () => dispatch({ type: 'add', payload: 1 }),
        minus: ()=> dispatch({type:'minus', payload: 1})
    }
}

const reducer = (state, action) => { // same as reducer
    if (state === undefined || state === 'undefined') {
        return {value: 0};
    }
    switch (action.type) {
        case 'add':
            return {value: state.value + 1};
        case 'minus':
            return {value: state.value - 1};
        default:
            return {value: state.value};
    }
}
const store = createStore(reducer);

const Counter = connect(mapStateToProps, mapDispatchToProps)(CounterContainer);

ReactDOM.render(
<Provider store={store}>
     <Counter />
</Provider>, 
document.getElementById('root'));