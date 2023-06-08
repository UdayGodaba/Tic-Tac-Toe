import Board from './components/board/Board';
import { useState } from 'react';
import ScoreBoard from './components/scoreBoard/ScoreBoard';

import './App.css';

function App() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({
    xScore: 0,
    oScore: 0
  });
  const [gameOver, setGameOver] = useState(false);

  const handleBoxClick = (boxIdx) => {
    const updatedBoard = board.map((val, idx) => {
      if (idx === boxIdx) {
        return xPlaying === true ? "X" : "O";
      } else {
        return val;
      }
    })
    setBoard(updatedBoard);

    const winner = checkWinner(updatedBoard);
    if (winner) {
      if (winner === 'O') {
        let { oScore } = scores;
        oScore += 1
        setScores({ ...scores, oScore })
      } else {
        let { xScore } = scores;
        xScore += 1
        setScores({ ...scores, xScore })
      }
    }

    setXPlaying(!xPlaying);
  };

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const checkWinner = (board) => {
    for (let i = 0; i < winConditions.length; i++) {

      const [x, y, z] = winConditions[i];
      if (
        board[x] && board[x] === board[y] && board[y] === board[z] && board[z]
      ) {
        setGameOver(true);
        return board[x];
      }

    }
  };

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  };

  return (
    <>
      <ScoreBoard scores={scores} xPlaying={xPlaying}/>
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <button onClick={resetBoard} className='btn'>Reset</button>
    </>
  )
}

export default App;
