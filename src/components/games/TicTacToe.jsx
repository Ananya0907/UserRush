import { useState, useEffect } from 'react';

export default function TicTacToe({ onExit, addPoints, updateHighScore }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  useEffect(() => {
    if (!isXNext && !winner) {
      // Very simple AI Move
      const available = board.map((v, i) => v === null ? i : null).filter(v => v !== null);
      if (available.length > 0) {
        setTimeout(() => {
          const randomIdx = available[Math.floor(Math.random() * available.length)];
          const newBoard = [...board];
          newBoard[randomIdx] = 'O';
          setBoard(newBoard);
          const aiWin = checkWinner(newBoard);
          if (aiWin) setWinner(aiWin);
          else if (!newBoard.includes(null)) setWinner('Draw');
          else setIsXNext(true);
        }, 500);
      }
    }
  }, [isXNext, board, winner]);

  const handleClick = (i) => {
    if (board[i] || winner || !isXNext) return;
    const newBoard = [...board];
    newBoard[i] = 'X';
    setBoard(newBoard);
    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
      if (win === 'X') {
         addPoints(50, true);
         updateHighScore('tictactoe', 1);
      }
    } else if (!newBoard.includes(null)) {
      setWinner('Draw');
    } else {
      setIsXNext(false);
    }
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ color: '#ec4899', marginBottom: '20px' }}>Beat the AI!</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 80px)', gap: '10px', justifyContent: 'center', marginBottom: '30px' }}>
        {board.map((sq, i) => (
          <button key={i} onClick={() => handleClick(i)} style={{
            width: '80px', height: '80px', fontSize: '36px', fontWeight: 'bold', border: 'none',
            borderRadius: '16px', background: 'rgba(255,255,255,0.8)', color: sq === 'X' ? '#ec4899' : '#8b5cf6',
            boxShadow: '0 4px 10px rgba(0,0,0,0.05)', cursor: 'pointer'
          }}>
            {sq}
          </button>
        ))}
      </div>
      
      {winner && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ color: winner === 'X' ? '#10b981' : '#ef4444' }}>
            {winner === 'Draw' ? "It's a draw!" : winner === 'X' ? "You Win! ✨" : "AI Wins!"}
          </h2>
          <button onClick={reset} style={{ padding: '10px 20px', background: '#ec4899', color: 'white', borderRadius: '999px', border: 'none', cursor: 'pointer' }}>Play Again</button>
        </div>
      )}
    </div>
  );
}
