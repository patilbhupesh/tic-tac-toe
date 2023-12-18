import React, { useState } from "react";
import "./App.css";

const INITIAL_STATE = Array(9).fill(null);

const calculateWinner = (squares) => {
  const WiningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  console.log("squares", squares);
  for (let i = 0; i < WiningLines.length; i++) {
    const [a, b, c] = WiningLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const Board = ({ squares, onClick }) => {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const App = () => {
  const [history, setHistory] = useState([{ squares: INITIAL_STATE }]);
  const [stepNumber, setStepNumber] = useState(0);
  const xIsNext = stepNumber % 2 === 0;
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const currentBoard = newHistory[newHistory.length - 1];
    const squares = currentBoard.squares.slice();

    if (winner || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "X" : "O";

    setHistory(newHistory.concat([{ squares: squares }]));
    setStepNumber(newHistory.length);
  };

  const status = winner
    ? `Winner player: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="game">
      <div className="game-info">
        <div>{status}</div>
      </div>
      <div className="game-board ">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
    </div>
  );
};

export default App;
