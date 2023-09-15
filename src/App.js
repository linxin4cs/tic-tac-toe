import { useState } from "react";

function GameBoard({ currentSqaures, nextPlayer, winner, handleSquareClick }) {
  return (
    <div>
      <div className="status">
        {winner !== "" ? "Winner:" + winner : "Next player:" + nextPlayer}
      </div>
      <div className="board-row">
        <button className="square" onClick={() => handleSquareClick(0)}>
          {currentSqaures[0]}
        </button>
        <button className="square" onClick={() => handleSquareClick(1)}>
          {currentSqaures[1]}
        </button>
        <button className="square" onClick={() => handleSquareClick(2)}>
          {currentSqaures[2]}
        </button>
      </div>
      <div className="board-row">
        <button className="square" onClick={() => handleSquareClick(3)}>
          {currentSqaures[3]}
        </button>
        <button className="square" onClick={() => handleSquareClick(4)}>
          {currentSqaures[4]}
        </button>
        <button className="square" onClick={() => handleSquareClick(5)}>
          {currentSqaures[5]}
        </button>
      </div>
      <div className="board-row">
        <button className="square" onClick={() => handleSquareClick(6)}>
          {currentSqaures[6]}
        </button>
        <button className="square" onClick={() => handleSquareClick(7)}>
          {currentSqaures[7]}
        </button>
        <button className="square" onClick={() => handleSquareClick(8)}>
          {currentSqaures[8]}
        </button>
      </div>
    </div>
  );
}

function GameInfo({ history, handleHistoryClick }) {
  return (
    <div className="game-info">
      <ol>
        {history.map((e, i) => {
          return (
            <li key={i}>
              <button onClick={() => handleHistoryClick(i)}>
                Go to {i === 0 ? "game start" : "move #" + i}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function Game() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [nextPlayer, setNextPlayer] = useState("X");
  const [winner, setWinner] = useState("");
  const [history, setHistory] = useState(Array(1).fill(Array(9).fill("")));
  const [indexOfNow, setIndexOfNow] = useState(0);

  function handleSquareClick(index) {
    if (squares[index] === "" && winner === "") {
      const newSquares = [...squares];
      const currentPlayer = nextPlayer;
      newSquares[index] = nextPlayer;
      setSquares(newSquares);
      setHistory([...history.slice(0, indexOfNow + 1), newSquares]);
      setIndexOfNow(indexOfNow + 1);
      console.log(indexOfNow);

      const winner = getWinner(newSquares);

      if (winner) {
        setWinner(winner);
      } else {
        setNextPlayer(currentPlayer === "X" ? "O" : "X");
      }
    }
  }

  function getWinner(squares) {
    for (let row = 0; row < 3; row++) {
      if (
        squares[row] !== "" &&
        squares[row] === squares[row + 1] &&
        squares[row + 1] === squares[row + 2]
      )
        return squares[row];
    }

    for (let row = 0; row < 3; row++) {
      if (
        squares[row] !== "" &&
        squares[row] === squares[row + 3] &&
        squares[row + 3] === squares[row + 6]
      )
        return squares[row];
    }

    if (
      squares[0] !== "" &&
      squares[0] === squares[4] &&
      squares[4] === squares[8]
    )
      return squares[0];
    if (
      squares[2] !== "" &&
      squares[2] === squares[4] &&
      squares[4] === squares[6]
    )
      return squares[2];

    return "";
  }

  function handleHistoryClick(index) {
    const newSquares = history[index];
    setSquares(newSquares);
    setIndexOfNow(index);

    const winner = getWinner(newSquares);

    if (winner === "") {
      let countOfX = 0;
      let countOfO = 0;

      for (let e of newSquares) {
        if (e === "X") countOfX++;
        if (e === "O") countOfO++;
      }

      const nextPlayer = countOfO >= countOfX ? "X" : "O";

      setWinner("");
      setNextPlayer(nextPlayer);
    } else {
      setWinner(winner);
    }
  }

  return (
    <div className="game">
      <GameBoard
        currentSqaures={squares}
        nextPlayer={nextPlayer}
        winner={winner}
        handleSquareClick={handleSquareClick}
      />
      <GameInfo history={history} handleHistoryClick={handleHistoryClick} />
    </div>
  );
}
