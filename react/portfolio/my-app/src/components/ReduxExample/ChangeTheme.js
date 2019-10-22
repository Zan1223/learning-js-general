import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';

function Box(props) {
    return (
        <div className={`box ${props.theme}`}></div>
    )
}

function Button(props) {
    return (
        <button className='button' onClick={props.onclick}>Change Color</button>
    )
}

const themeContext = createContext();


class App extends React.Component {
    constructor() {
        super()
        this.state = {
            theme: 'red'
        }
    }
    changeTheme = () => {
        if (this.state.theme === 'red') {
            this.setState(
                { theme: 'yellow' }
            )
        } else {
            this.setState(
                { theme: 'red' }
            )
        }
    }
    render() {
        return (
            <themeContext.Provider value={this.state.theme}>
                <themeContext.Consumer>
                    {(theme)=>(<div>
                        <Box theme={theme}/>
                        <Button onclick={this.changeTheme}/>
                    </div>)}
                </themeContext.Consumer>
            </themeContext.Provider>
        )
    }
}


const root = document.querySelector('#root');

ReactDOM.render(<App />, root)