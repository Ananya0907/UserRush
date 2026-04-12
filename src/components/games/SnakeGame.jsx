import { useState, useEffect, useRef, useCallback } from 'react';
import { useGame } from '../../context/GameContext';

const GRID_SIZE = 15;

export default function SnakeGame({ onExit }) {
  const { addPoints, resetStreak, updateHighScore, highScores } = useGame();
  
  const [snake, setSnake] = useState([[7, 7]]);
  const [food, setFood] = useState([5, 5]);
  const [dir, setDir] = useState([0, -1]); // moving UP initially
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const dirRef = useRef(dir);

  const calculateSpeed = (scoreVal) => {
    // Logarithmic scaling speed: starts around ~200ms, drops to ~80ms at high scores
    return Math.max(60, 250 - (Math.log(scoreVal + 1) * 45));
  };

  useEffect(() => {
    dirRef.current = dir;
  }, [dir]);

  const placeFood = useCallback((currentSnake) => {
    let newFood;
    while (true) {
      newFood = [
        Math.floor(Math.random() * GRID_SIZE),
        Math.floor(Math.random() * GRID_SIZE)
      ];
      // eslint-disable-next-line no-loop-func
      if (!currentSnake.some(seg => seg[0] === newFood[0] && seg[1] === newFood[1])) {
        break;
      }
    }
    setFood(newFood);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();
      const current = dirRef.current;
      switch(e.key) {
        case 'ArrowUp': if (current[1] === 0) setDir([0, -1]); break;
        case 'ArrowDown': if (current[1] === 0) setDir([0, 1]); break;
        case 'ArrowLeft': if (current[0] === 0) setDir([-1, 0]); break;
        case 'ArrowRight': if (current[0] === 0) setDir([1, 0]); break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameOver) return;
    
    const move = () => {
      setSnake(prev => {
        const head = [prev[0][0] + dirRef.current[0], prev[0][1] + dirRef.current[1]];
        
        // Check collisions (walls)
        if (head[0] < 0 || head[0] >= GRID_SIZE || head[1] < 0 || head[1] >= GRID_SIZE) {
          handleGameOver(score);
          return prev;
        }
        
        // Check collisions (self)
        if (prev.some(seg => seg[0] === head[0] && seg[1] === head[1])) {
          handleGameOver(score);
          return prev;
        }

        const newSnake = [head, ...prev];
        
        // Check food
        if (head[0] === food[0] && head[1] === food[1]) {
          setScore(s => s + 1);
          placeFood(newSnake);
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    };

    const intervalId = setInterval(move, calculateSpeed(score));
    return () => clearInterval(intervalId);
  }, [food, gameOver, score, placeFood]);

  const handleGameOver = (finalScore) => {
    setGameOver(true);
    updateHighScore('snake', finalScore);
    if (finalScore >= 5) {
      addPoints(finalScore * 15, true);
    } else {
      resetStreak();
    }
  };

  if (gameOver) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', color: '#f87171', marginBottom: '20px' }}>Game Over!</h2>
        <p style={{ fontSize: '18px', marginBottom: '20px' }}>Apple Score: <strong>{score}</strong></p>
        <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>High Score: {Math.max(highScores.snake || 0, score)}</p>
        
        {score >= 5 ? (
          <p style={{ color: '#4ade80', marginBottom: '20px' }}>Solid run! Points awarded.</p>
        ) : (
          <p style={{ color: '#f87171', marginBottom: '20px' }}>Need at least length 5 to win points.</p>
        )}
        
        <button onClick={onExit} style={{
          padding: '12px 24px', borderRadius: '12px', border: 'none',
          background: '#3b82f6', color: 'white', fontWeight: 'bold', cursor: 'pointer'
        }}>Back to Arcade</button>
      </div>
    );
  }

  // Draw grid
  const grid = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      let isSnake = snake.some(s => s[0] === col && s[1] === row);
      let isFood = food[0] === col && food[1] === row;
      let isHead = snake[0][0] === col && snake[0][1] === row;
      
      grid.push(
        <div key={`${col}-${row}`} style={{
          width: '100%',
          aspectRatio: '1/1',
          background: isHead ? '#4ade80' : isSnake ? '#22c55e' : isFood ? '#ef4444' : 'rgba(255,255,255,0.05)',
          borderRadius: isFood ? '50%' : '4px'
        }} />
      );
    }
  }

  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <div style={{ fontSize: '20px', color: '#fbbf24', marginBottom: '20px' }}>Score: {score}</div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        gap: '2px',
        maxWidth: '350px',
        margin: '0 auto',
        background: 'rgba(0,0,0,0.5)',
        padding: '10px',
        borderRadius: '12px'
      }}>
        {grid}
      </div>
      <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '10px' }}>Use Arrow Keys to play</p>
    </div>
  );
}
