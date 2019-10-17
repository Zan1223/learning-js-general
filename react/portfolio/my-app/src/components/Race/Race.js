import React, { useState } from 'react';
import './Race.css';

function Race() {
    const [time1, setTime1] = useState(0);
    const [time2, setTime2] = useState(0);
    const success1 = (time) => {
        console.log('Rabbit finished')
        setTime1(time)
    }
    const success2 = (time) => {
        console.log('Tortiose finished');
        setTime2(time);
    }
    console.log('rerender App');
    return (
        <div className="game-container">
            <div className="header">
                <RabbitTime time={time1}/>
                <TortioseTime time={time2}/>
            </div>
            <Playground successRabbit={success1} successTortiose={success2}/>
        </div>
    )
}

function RabbitTime(props) {
    return (
        <div className='rabbit-time time'>
            🐰 Total time
            <span>{props.time}</span>
        </div>
    )
}

function TortioseTime(props) {
    return (
        <div className='tortiose-time time'>
            🐢 Total time
            <span>{props.time}</span>
        </div>
    )
}

function Playground(props){
    return(
        <div className="tracks">
            <RabbitTrack success={props.successRabbit}/>
            <TortioseTrack success={props.successTortiose}/>
        </div>
    )
}

class RabbitTrack extends React.Component {
    constructor() {
        super();
        let n = 0;
        let time0 = new Date();
        this.state = {
            position: {
                transform: `translateX(${n}%)`
            }
        }
        console.log('rerender 1')
        let timeID = setInterval(() => {
            // console.log('inside interval')
            n += 25;
            this.setState({ position: { transform: `translateX(${n}%)` } });
            if (n >= 100) {
                clearInterval(timeID);
                this.setState({ position: { transform: `translateX(100%)` } });
                let totalTime = new Date() - time0;
                this.props.success(totalTime);
            }
        }, 1000)
    }

    render() {
        console.log('rerender RabbitTrack')
        return (
            <div>
                <div className='rabbit player' style={this.state.position}>🐰</div>
                <div className='track'></div>
            </div>
        )
    }
}




class TortioseTrack extends React.Component {
    constructor() {
        super();
        let n = 0;
        let time0 = new Date();
        this.state = {
            position: {
                transform: `translateX(${n}%)`
            }
        }
        let timeID = setInterval(() => {
            // console.log('inside interval')
            n += 18;
            this.setState({ position: { transform: `translateX(${n}%)` } });
            if (n >= 100) {
                clearInterval(timeID);
                this.setState({ position: { transform: `translateX(100%)` } });
                let totalTime = new Date() - time0;
                this.props.success(totalTime);
            }
        }, 1000)
    }

    render() {
        console.log('rerender TortioseTrack')
        return (
            <div>
                <div className='tortiose player' style={this.state.position}>🐢</div>
                <div className='track'></div>
            </div>
        )
    }
}

export default Race;
