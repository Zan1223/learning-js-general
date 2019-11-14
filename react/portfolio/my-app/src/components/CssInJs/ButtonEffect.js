import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import styled, {keyframes} from 'styled-components';

function Button(props){
    const [btnState, setBtnState] = useState(false);
    const [clickPosition, setPosition] = useState({left: 0, top: 0})
    const btnRef = React.createRef();
    const btnAnimation = keyframes`
        0% {transform: scale(0.7); transform-origin: center;}
        100% {transform:scale(25);transform-origin: center;}
    `; 


    const Button = styled.button`
        border: 1px solid #ddd;
        color: black;
        height: 50px;
        width: 100px;
        position: relative;
        overflow: hidden;
    `
    const Text = styled.span`
        z-index:1;
        color: blue;
        position: relative;
    `

    const AnimateDrop = styled.span`
        z-index: 0;
        background: red;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        animation: 0.75s ${btnAnimation} forwards;
        display: inline-block;
        position: absolute;
        left: ${clickPosition.left}px;
        top: ${clickPosition.top}px;
    `
    const animate = (event)=>{
       setBtnState(true);
       let {x, y} = btnRef.current.getBoundingClientRect();
       let {clientX, clientY} = event;
       let left = clientX - x;
       let top = clientY - y;
       console.log(left,top);
       setPosition({
           left: left,
           top: top
       })
    }

    const removeBtnAnimation = ()=>{
        setBtnState(false);
    }

    return (
        <Button onClick={animate} ref={btnRef} onAnimationEnd={removeBtnAnimation}>
            <Text>{props.value}</Text>
            {btnState && <AnimateDrop />}
        </Button>
    )

}


function App(){
    return(
        <div>
            <Button value='Click here!'/>
        </div>
    )

}


ReactDOM.render(<App />, document.getElementById('root'))
