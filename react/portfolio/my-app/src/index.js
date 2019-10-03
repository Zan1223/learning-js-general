import React, {useState} from 'react';
import ReactDOM from 'react-dom';
// import App from './components/App/App';
import './style/chessBoard.css';

const Cell = (props)=>{
    return (
        <div className='cells' onClick={props.onClick}>
            {props.text}
        </div>
    )
}

const Button = (props)=>{
    return (
        <button onClick={props.onClick}>{props.label}</button>
    )
}

const ChessBoard = ()=>{
    const [cells, setCells]= useState([
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]);
    const [emptyCells, setEmptyCells]= useState([
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]);
    const [n, setN] = useState(0);
    const [winner, setWinner] = useState('Winner');
    const [gameOver, setGameOver] = useState(false);
    const onClickButton = (row, col)=>{
        let copy = JSON.parse(JSON.stringify(cells))
        if(copy[row][col] === null){
            copy[row][col] = n % 2 === 0 ? 'x' : 'o';
            setN(n+1);
            setCells(copy);
            tell(copy);
        }
    }
    const reset = ()=>{
            setGameOver(false);
            console.log('cells in reset ', cells);
            console.log('emptyCells in reset before', emptyCells);
            let copy = JSON.parse(JSON.stringify(emptyCells))
            setCells(copy);
            setN(0)
        }
    const tell = (cells)=>{
        // if(cells[0][0] === cells[0][1] && cells[0][1] === cells[0][2] && cells[0][0] !== null){
        //     console.log(cells[0][0]+' won the game!');
        //     setGameOver(true)
        // }
        for(let i=0; i<3; i++){
            if(cells[i][0] === cells[i][1] && cells[i][1] === cells[i][2] && cells[i][0] !== null){
                console.log(cells[i][0]+' won the game! 1');
                setWinner(cells[i][0]);
                setGameOver(true)
            }
        }
        for(let i=0; i<3; i++){
            if(cells[0][i] === cells[1][i] && cells[1][i] === cells[2][i] && cells[0][i] !== null){
                console.log(cells[0][i]+' won the game! 2');
                setWinner(cells[0][i]);
                setGameOver(true)
            }
        }
        if(cells[0][0] === cells[1][1] && cells[1][1] === cells[2][2] && cells[0][0] !== null){
            console.log(cells[0][0]+' won the game! 3');
            setWinner(cells[0][0]);
            setGameOver(true)
        }
        if(cells[2][0] === cells[1][1] && cells[1][1] === cells[0][2] && cells[2][0] !== null){
            console.log(cells[2][0]+' won the game! 4');
            setWinner(cells[2][0]);
            setGameOver(true) 
        }
    }
    return (
        <div>
            <div>n:{n}</div>
            <div className='chessBoard'>
                {cells.map( (items, row) => <div className='row'>
                    {items.map( (item, col) => <Cell text={item} onClick={()=>onClickButton(row,col)}/>)}
                </div>)}
            </div>
            {gameOver && <div className="gameOverOverlay"><div className='gameOverText'>Game Over</div>
            <p className='winner'>{winner} wins the game!</p>
            <Button label='Play again' onClick={()=>reset()}/>
            </div>}
            <Button label='Reset' onClick={()=>reset()}/>
        </div>
    )
}



ReactDOM.render(<ChessBoard />, document.getElementById('root'));
