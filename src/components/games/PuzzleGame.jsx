import { useState, useEffect } from 'react';

// Solved state: 1, 2, 3, 4, 5, 6, 7, 8, null
const SOLVED_STATE = [1, 2, 3, 4, 5, 6, 7, 8, null];

export default function PuzzleGame({ onExit, addPoints, updateHighScore }) {
  const [board, setBoard] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWon, setIsWon] = useState(false);

  // Shuffle board, ensuring it's solvable (for simplicity we just do random valid moves from solved state)
  const generateBoard = () => {
    let current = [...SOLVED_STATE];
    let emptyIdx = 8;
    for (let i = 0; i < 50; i++) {
        const neighbors = getNeighbors(emptyIdx);
        const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
        // Swap
        current[emptyIdx] = current[randomNeighbor];
        current[randomNeighbor] = null;
        emptyIdx = randomNeighbor;
    }
    setBoard(current);
  };

  const startGame = () => {
    setMoves(0);
    setIsWon(false);
    setIsPlaying(true);
    generateBoard();
  };

  const getNeighbors = (index) => {
      const neighbors = [];
      const row = Math.floor(index / 3);
      const col = index % 3;
      if (row > 0) neighbors.push(index - 3); // top
      if (row < 2) neighbors.push(index + 3); // bottom
      if (col > 0) neighbors.push(index - 1); // left
      if (col < 2) neighbors.push(index + 1); // right
      return neighbors;
  };

  const handleTileClick = (index) => {
      if (!isPlaying || isWon) return;
      const emptyIdx = board.indexOf(null);
      const neighbors = getNeighbors(index);
      
      if (neighbors.includes(emptyIdx)) {
          const newBoard = [...board];
          newBoard[emptyIdx] = newBoard[index];
          newBoard[index] = null;
          setBoard(newBoard);
          setMoves(m => m + 1);
      }
  };

  useEffect(() => {
    if (isPlaying && !isWon && board.length > 0) {
        if (JSON.stringify(board) === JSON.stringify(SOLVED_STATE)) {
            setIsWon(true);
            setIsPlaying(false);
            const score = Math.max(10, 100 - moves); // Base score calculation
            updateHighScore('puzzle', score);
            addPoints(score, true);
        }
    }
  }, [board, isPlaying, isWon, moves, addPoints, updateHighScore]);

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: "'Inter', sans-serif" }}>
      <h2 style={{ color: '#be185d', fontSize: '32px', margin: '0 0 20px' }}>Sliding Puzzle</h2>
      
      {!isPlaying && !isWon && (
        <div style={{ animation: 'float-up 0.5s ease-out' }}>
          <p style={{ color: '#4b5563', fontSize: '18px', marginBottom: '30px' }}>Slide the tiles to order them 1 through 8. Lower moves = higher score!</p>
          <button onClick={startGame} style={btnStyle}>Start Game</button>
        </div>
      )}

      {isPlaying && (
          <div>
            <div style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '20px', color: '#be185d' }}>
              Moves: {moves}
            </div>
            <div style={{ 
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', 
              width: '300px', height: '300px', margin: '0 auto', background: '#fbcfe8', padding: '10px',
              borderRadius: '16px', boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.1)' 
            }}>
              {board.map((tile, index) => (
                <div 
                  key={index}
                  onClick={() => handleTileClick(index)}
                  style={{
                    background: tile === null ? 'transparent' : 'white',
                    borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '32px', fontWeight: 'bold', color: '#ec4899', cursor: tile === null ? 'default' : 'pointer',
                    boxShadow: tile === null ? 'none' : '0 4px 10px rgba(236,72,153,0.2)',
                    transition: 'transform 0.1s, box-shadow 0.1s',
                  }}
                  onMouseEnter={e => {
                    if(tile !== null) e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    if(tile !== null) e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {tile}
                </div>
              ))}
            </div>
          </div>
      )}

      {isWon && (
        <div style={{ animation: 'float-up 0.5s ease-out' }}>
          <h3 style={{ color: '#10b981', fontSize: '28px', marginBottom: '10px' }}>Puzzle Solved!</h3>
          <p style={{ fontSize: '20px', color: '#4b5563', marginBottom: '30px' }}>It took you {moves} moves!</p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button onClick={startGame} style={btnStyle}>Play Again</button>
            <button onClick={onExit} style={{ ...btnStyle, background: '#9ca3af' }}>Exit Arcade</button>
          </div>
        </div>
      )}
    </div>
  );
}

const btnStyle = {
  padding: '16px 32px', background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
  color: 'white', border: 'none', borderRadius: '999px', fontSize: '18px',
  fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(236,72,153,0.3)'
};
