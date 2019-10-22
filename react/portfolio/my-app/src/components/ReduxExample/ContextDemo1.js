import React from 'react';
import ReactDOM from 'react-dom';


function F1(props){
   // console.log(props.onclick)
    return (
        <div>
            F1 {props.n}
            <F2/>
        </div>
    )
}

function F2(){
    return (
        <div> 
            <xContext.Consumer>
                {(x)=> <F3 x={x}/>}
            </xContext.Consumer>
        </div>
    )
}

function F3(props){
    console.log(props.x.setN);
    return (
        <div>
            <div>F3 {props.x.n}</div>
            <button onClick={()=>{props.x.setN()}}>Click</button>
        </div>
    )
}

const xContext = React.createContext();

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            x:{
                n: 100,
                setN: ()=>{
                    this.setState({
                        x:{
                            ...this.state.x,
                            n: Math.random()
                        }
                    })
                }
            }
        }
    }
    render(){
        return (
            <xContext.Provider value={this.state.x}>
                <div>
                    <F1 n={this.state.x.n}/>
                </div>
            </xContext.Provider>
        )
    }
}

const root = document.getElementById('root');
ReactDOM.render(<App/>, root)