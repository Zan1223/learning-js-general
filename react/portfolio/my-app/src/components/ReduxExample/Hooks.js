import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';


function Display(props){
    const [display, setDisplay] = useState(props.value);
    console.log(display);
    const updateName =()=>{
        setDisplay(Math.random().toFixed(2))
    }
    return(
        <div>
            <div>{display}</div>
            <button onClick={updateName}>change hobby</button>
        </div>
    )
}


function App(){
    const [user, setUser] = useState({name: 'Zan', age:30, hobbies:['play games', 'watch TV']});
    const [textInput, setText] = useState('');
    useEffect(()=>{
       // document.querySelector('#output').innerText = count;
    })
    
    const addHobby = ()=>{
        // setCount(count+1);
        if(textInput){
            setUser({
                ...user,
                hobbies: [...user.hobbies, textInput]
            })
            setText('');
        }
    }

    const updateInput = (event)=>{
       setText(event.currentTarget.value)
    }

    return (
        <div>
            <div>{user.name}, {user.age}, <br/> He like to {user.hobbies.join(',')}...</div>
            <div>
                <input onChange={(event)=>updateInput(event)} value={textInput} placeholder="Please enter a hobby"/>
                <br/>
                {console.log('render')}
                <Display value={user.hobbies.join(',')}/>
                <button onClick={addHobby}>Add a hobby</button>
            </div>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))