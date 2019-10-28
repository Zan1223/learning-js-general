import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Tab1() {
    return (
        <div>Tab1</div>
    )
}

function Tab2() {
    return (
        <div>Tab2</div>
    )
}

function Button(){
    return (
        <div>
            <Link to="/tab1"><button>1</button></Link>
            <Link to="/tab2"><button>2</button></Link>
        </div>
    )
}

function App() {
    return (
        <Router>
            <div>
                <Button/>
            </div>
            <Switch>
                <Route path="/" exact>
                    <Tab1 />
                </Route>
                <Route path="/tab1">
                    <Tab1 />
                </Route>
                <Route path="/tab2">
                    <Tab2 />
                </Route>
            </Switch>
        </Router>
    )
}


ReactDOM.render(<App />, document.getElementById('root'))
