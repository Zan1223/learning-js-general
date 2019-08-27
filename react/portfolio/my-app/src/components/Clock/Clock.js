import React from 'react';

class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {date: new Date()};
    }
    counter(){
        this.setState({
            date: new Date()
        })
    }
    componentDidMount(){
        this.Counter = setInterval(() => {
           this.counter();
        }, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.counter);
    }

    render(){
        return (
            <div>The time now is {this.state.date.toLocaleTimeString()} </div>
        );
    }

}

export default Clock;