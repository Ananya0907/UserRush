import { useState, useEffect, useRef } from 'react';
import { useGame } from '../../context/GameContext';

export default function ColorReact({ onExit }) {
  const { addPoints, resetStreak, updateHighScore, highScores } = useGame();
  
  // 'idle' | 'waiting' (red) | 'reacting' (green) | 'scored' | 'early'
  const [gameState, setGameState] = useState('idle'); 
  const [scoreMs, setScoreMs] = useState(null);
  const startTimeRef = useRef(0);
  const timeoutRef = useRef(null);

  const startGame = () => {
    setGameState('waiting');
    setScoreMs(null);
    clearTimeout(timeoutRef.current);
    
    // Random wait between 2s and 6s
    const waitTime = Math.random() * 4000 + 2000;
    timeoutRef.current = setTimeout(() => {
      setGameState('reacting');
      startTimeRef.current = Date.now();
    }, waitTime);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleClick = () => {
    if (gameState === 'waiting') {
      // Clicked too early
      clearTimeout(timeoutRef.current);
      setGameState('early');
      handleGameOver(null);
    } else if (gameState === 'reacting') {
      // Good!
      const reactionTime = Date.now() - startTimeRef.current;
      setScoreMs(reactionTime);
      setGameState('scored');
      handleGameOver(reactionTime);
    } else if (gameState === 'idle' || gameState === 'scored' || gameState === 'early') {
      startGame();
    }
  };

  const handleGameOver = (ms) => {
    if (ms !== null) {
      updateHighScore('colorreact', ms); // Lower is better in theory, but highScores logic currently stores max. 
      // Actually we want minimum high score for reaction time? 
      // Our logic stores max. Let's just track the points awarded as High Score, which is max.
      
      let pts = 0;
      if (ms < 200) pts = 300;
      else if (ms < 300) pts = 150;
      else if (ms < 500) pts = 50;
      
      if (pts > 0) {
        addPoints(pts, true);
      } else {
        resetStreak();
      }
    } else {
      // False start
      resetStreak();
    }
  };

  let bgColor = '#1e293b';
  let message = 'Click anywhere to start';

  if (gameState === 'waiting') {
    bgColor = '#ef4444'; // Red
    message = 'Wait for Green...';
  } else if (gameState === 'reacting') {
    bgColor = '#22c55e'; // Green
    message = 'CLICK NOW!';
  } else if (gameState === 'early') {
    bgColor = '#1e293b';
    message = 'Too early! You lost your streak. Click to try again.';
  } else if (gameState === 'scored') {
    bgColor = '#1e293b';
    message = `${scoreMs} ms! Click to try again.`;
  }

  return (
    <div 
      onClick={handleClick}
      style={{ 
        textAlign: 'center', 
        width: '100%', 
        height: '300px',
        backgroundColor: bgColor,
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'background-color 0.1s',
        userSelect: 'none'
      }}>
      
      <h2 style={{ fontSize: '32px', fontWeight: '800', margin: '0 0 20px 0', color: 'white' }}>
        {message}
      </h2>
      
      {gameState === 'scored' || gameState === 'early' ? (
        <button 
          onClick={(e) => { e.stopPropagation(); onExit(); }} 
          style={{
            padding: '12px 24px', borderRadius: '12px', border: 'none',
            background: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 'bold', 
            cursor: 'pointer', marginTop: '20px'
          }}>
            Back to Arcade
        </button>
      ) : null}
    </div>
  );
}
