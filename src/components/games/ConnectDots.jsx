import { useState, useEffect } from 'react';

export default function ConnectDots({ onExit, addPoints, updateHighScore }) {
  const [dots, setDots] = useState([]);
  const [currentWanted, setCurrentWanted] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const generateDots = () => {
    const newDots = [];
    for (let i = 1; i <= 5; i++) {
      newDots.push({
        id: i,
        x: Math.random() * 80 + 10, // 10% to 90%
        y: Math.random() * 80 + 10,
      });
    }
    setDots(newDots);
    setCurrentWanted(1);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(20);
    setIsPlaying(true);
    setGameOver(false);
    generateDots();
  };

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      setGameOver(true);
      updateHighScore('connectdots', score);
      addPoints(Math.floor(score * 10), true);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, score, updateHighScore, addPoints]);

  const handleDotClick = (id) => {
    if (!isPlaying) return;
    if (id === currentWanted) {
      if (id === 5) {
        setScore(prev => prev + 1);
        generateDots();
      } else {
        setCurrentWanted(id + 1);
      }
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: "'Inter', sans-serif" }}>
      <h2 style={{ color: '#be185d', fontSize: '32px', margin: '0 0 20px' }}>Connect the Dots</h2>
      
      {!isPlaying && !gameOver && (
        <div>
          <p style={{ color: '#4b5563', fontSize: '18px', marginBottom: '30px' }}>
            Click the numbered dots in order (1 to 5) as fast as you can.
          </p>
          <button onClick={startGame} style={btnStyle}>Start Game</button>
        </div>
      )}

      {isPlaying && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontWeight: 'bold', fontSize: '20px', color: '#be185d' }}>
            <span>Time: {timeLeft}s</span>
            <span>Score: {score}</span>
          </div>
          
          <div style={{ 
            width: '100%', maxWidth: '400px', height: '400px', margin: '0 auto', 
            background: 'rgba(255,255,255,0.5)', borderRadius: '20px', border: '2px dashed #ec4899',
            position: 'relative', overflow: 'hidden'
          }}>
            {dots.map(dot => (
              <div 
                key={dot.id}
                onClick={() => handleDotClick(dot.id)}
                style={{
                  position: 'absolute', top: `${dot.y}%`, left: `${dot.x}%`,
                  width: '40px', height: '40px', background: dot.id < currentWanted ? '#10b981' : '#ec4899',
                  borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 'bold', cursor: 'pointer', transform: 'translate(-50%, -50%)',
                  boxShadow: '0 4px 10px rgba(236,72,153,0.3)', transition: 'background 0.2s'
                }}
              >
                {dot.id}
              </div>
            ))}
          </div>
        </div>
      )}

      {gameOver && (
        <div style={{ animation: 'float-up 0.5s ease-out' }}>
          <h3 style={{ color: '#be185d', fontSize: '28px', marginBottom: '10px' }}>Time's Up!</h3>
          <p style={{ fontSize: '20px', color: '#4b5563', marginBottom: '30px' }}>You completely connected {score} sets!</p>
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
  fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(236,72,153,0.3)',
};
