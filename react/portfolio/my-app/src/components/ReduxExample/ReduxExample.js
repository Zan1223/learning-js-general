import React from 'react';

const ReduxExample =(props)=>{
    const button1 = (meg)=>{
        props.onclick1(meg);
    }
    const button2 = ()=>{
        props.onclick2();
    }
    const button3 = ()=>{
        props.onclick3();
    }
    return (
       <div>
           <div>The number is {props.value}</div>
           <button onClick={()=>{button1('you just added one')}}>+1</button>
           <button onClick={button2}>-1</button>
           <button onClick={button3}>Async + 1</button>
       </div>
    )
}



export default ReduxExample;