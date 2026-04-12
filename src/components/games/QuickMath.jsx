import { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';

export default function QuickMath({ onExit }) {
  const { addPoints, resetStreak, updateHighScore, highScores } = useGame();
  
  const [equation, setEquation] = useState({ text: '', answer: 0 });
  const [inputVal, setInputVal] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  // Generate equation
  const generateEquation = () => {
    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a, b, ans;
    
    if (op === '*') {
      a = Math.floor(Math.random() * 12) + 2;
      b = Math.floor(Math.random() * 12) + 2;
      ans = a * b;
    } else {
      a = Math.floor(Math.random() * 50) + 10;
      b = Math.floor(Math.random() * 50) + 10;
      if (op === '-' && b > a) { let temp = a; a = b; b = temp; }
      ans = op === '+' ? a + b : a - b;
    }
    
    setEquation({ text: `${a} ${op} ${b}`, answer: ans });
    setInputVal('');
  };

  useEffect(() => {
    generateEquation();
  }, []);

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameOver) {
      handleGameOver();
    }
  }, [timeLeft, gameOver]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(inputVal) === equation.answer) {
      setScore(prev => prev + 1);
      generateEquation();
    } else {
      setInputVal(''); // clear input on wrong answer but don't end game
    }
  };

  const handleGameOver = () => {
    setGameOver(true);
    updateHighScore('quickmath', score);
    if (score > 5) {
      // WIN
      addPoints(score * 10, true);
    } else {
      // LOSE
      resetStreak();
    }
  };

  if (gameOver) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', color: '#fbbf24', marginBottom: '20px' }}>Time's Up!</h2>
        <p style={{ fontSize: '18px', marginBottom: '20px' }}>You solved: <strong>{score}</strong> equations.</p>
        <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>High Score: {Math.max(highScores.quickmath || 0, score)}</p>
        
        {score > 5 ? (
          <p style={{ color: '#4ade80', marginBottom: '20px' }}>Great speed! Payout secured.</p>
        ) : (
          <p style={{ color: '#f87171', marginBottom: '20px' }}>Too slow. Need &gt;5 to win.</p>
        )}
        
        <button onClick={onExit} style={{
          padding: '12px 24px', borderRadius: '12px', border: 'none',
          background: '#3b82f6', color: 'white', fontWeight: 'bold', cursor: 'pointer'
        }}>Back to Arcade</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <div style={{ fontSize: '20px', color: '#ec4899', fontWeight: 'bold' }}>Score: {score}</div>
        <div style={{ fontSize: '20px', color: timeLeft <= 5 ? '#ef4444' : '#a78bfa', fontWeight: 'bold' }}>0:{timeLeft.toString().padStart(2, '0')}</div>
      </div>
      
      <div style={{ fontSize: '48px', fontWeight: '900', marginBottom: '30px', letterSpacing: '4px', color: '#be185d' }}>
        {equation.text} = ?
      </div>
      
      <form onSubmit={handleSubmit}>
        <input 
          autoFocus
          type="number" 
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          style={{
            fontSize: '32px', textAlign: 'center', width: '150px',
            padding: '10px', borderRadius: '16px', border: '3px solid rgba(236,72,153,0.3)',
            background: 'rgba(255,255,255,0.7)', color: '#ec4899', fontWeight: 'bold', outline: 'none'
          }}
        />
        <button type="submit" style={{ display: 'none' }}>Submit</button>
      </form>
    </div>
  );
}
