import React, {useState} from 'react';
import styled from 'styled-components';


export default function App() {
    const [color, setColor] = useState('red');
    const [count, setCount] = useState(0);
    
    const Button = styled.button`
    border: 1px solid blue;
    color: ${color};
    `
    const changeTextColor = ()=>{
        setColor(count%2 === 0 ? 'blue': 'red');
        setCount(count+1);
    }
    return (
        <Button onClick={changeTextColor}>Hello World</Button>
    )
}
