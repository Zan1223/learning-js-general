import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';


function LogInView() {
    return (
        <div className="display">Log In</div>
    )
}

function SignUpView() {
    return (
        <div className="display">SignUp</div>
    )
}


function Router() {
    const hash = window.location.hash;
    const init = hash === '#logIn' ? 'logIn' : 'signUp';

    const [ui, setUi] = useState(init);
    const logIn = (x) => {
        setUi(x);
        window.location.hash = x;
    }
    const signUp = (x)=>{
        setUi(x);
        window.location.hash = x;
    }
    return (
        <div>
            <button onClick={()=>{logIn('logIn')}}>Log In</button>
            <button onClick={()=>{signUp('signUp')}}>Sign Up</button>
            <div className="view">
                {ui === 'logIn' ? <LogInView /> : <SignUpView />}
            </div>
        </div>
    )
}

ReactDOM.render(<Router />, document.getElementById('root'))
