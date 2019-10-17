import React from 'react';
import ReactDOM from 'react-dom';
import './ReduxExample.css';

const store = {
    money: 10000
}

const fnList = {};
const eventHub = {
    trigger: (eventType, data) => {
        if (!fnList[eventType]) {
            console.log('no function is found with this eventType');
            return false;
        }
        for (let i = 0; i < fnList[eventType].length; i++) {
            fnList[eventType][i](data);
        }
    },
    on: (eventType, fn) => {
        if (!fnList[eventType]) {
            fnList[eventType] = [];
        }
        fnList[eventType].push(fn);
    }
}

function Family(props) {
    return (
        <div className='family'>
            <Father1 money={props.money} />
            <Father2 money={props.money} />
        </div>
    )
}

function Father1(props) {
    return (
        <div className='father'>Father1 ${props.money}
            <Son1 money={props.money} />
            <Son2 money={props.money} />
        </div>
    )
}

function Father2(props) {
    return (
        <div className='father'>Father2 ${props.money}
            <Son3 money={props.money} />
            <Son4 money={props.money} />
        </div>
    )
}

function Son1(props) {
    return (
        <div className='son'>Son1 ${props.money}</div>
    )
}

function Son2(props) {
    return (
        <div className='son'>Son2 ${props.money}</div>
    )
}

function Son3(props) {
    return (
        <div className='son'>Son3 ${props.money}</div>
    )
}

function Son4(props) {
    const amount = 100;
    const spend = () => {
        eventHub.trigger('spend', amount);
    }
    return (
        <div className='son'>Son4 ${props.money}
            <button onClick={spend}>Spend ${amount}</button>
        </div>
    )
}
const init = () => {
    eventHub.on('spend', (amount)=>{
        store.money -= amount;
        render();
    })
}

function render() {
    ReactDOM.render(<Family money={store.money} />, document.getElementById('root'));
}

init();
render();