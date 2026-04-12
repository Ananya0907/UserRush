import { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';

const COLORS = ['#ef4444', '#3b82f6', '#eab308', '#10b981']; // Red, Blue, Yellow, Green
const LIT_COLORS = ['#fca5a5', '#93c5fd', '#fde047', '#6ee7b7'];

export default function SimonSays({ onExit }) {
  const { addPoints, resetStreak, updateHighScore, highScores } = useGame();
  
  const [sequence, setSequence] = useState([]);
  const [playerStep, setPlayerStep] = useState(0);
  const [isShowing, setIsShowing] = useState(false);
  const [litIndex, setLitIndex] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Start game
    addToSequence();
  }, []);

  const addToSequence = () => {
    const nextColor = Math.floor(Math.random() * 4);
    setSequence(prev => {
      const newSeq = [...prev, nextColor];
      playSequence(newSeq);
      return newSeq;
    });
  };

  const playSequence = async (seq) => {
    setIsShowing(true);
    setPlayerStep(0);
    
    // wait a bit before starting
    await new Promise(r => setTimeout(r, 800));

    for (let i = 0; i < seq.length; i++) {
      setLitIndex(seq[i]);
      await new Promise(r => setTimeout(r, 400));
      setLitIndex(null);
      await new Promise(r => setTimeout(r, 200));
    }
    setIsShowing(false);
  };

  const handleColorClick = (colorIndex) => {
    if (isShowing || gameOver) return;

    if (colorIndex === sequence[playerStep]) {
      // Lit effect
      setLitIndex(colorIndex);
      setTimeout(() => setLitIndex(null), 200);

      if (playerStep === sequence.length - 1) {
        // Completed round
        setScore(sequence.length);
        setIsShowing(true); // lock clicking
        setTimeout(addToSequence, 600);
      } else {
        setPlayerStep(prev => prev + 1);
      }
    } else {
      // Failed!
      handleGameOver();
    }
  };

  const handleGameOver = () => {
    setGameOver(true);
    updateHighScore('simonsays', score);
    if (score >= 4) {
      addPoints(score * 25, true);
    } else {
      resetStreak();
    }
  };

  if (gameOver) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', color: '#f87171', marginBottom: '20px' }}>Pattern Broken!</h2>
        <p style={{ fontSize: '18px', marginBottom: '20px' }}>You remembered a sequence of: <strong>{score}</strong></p>
        <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>High Score: {Math.max(highScores.simonsays || 0, score)}</p>
        
        {score >= 4 ? (
          <p style={{ color: '#4ade80', marginBottom: '20px' }}>Good memory! You won some points.</p>
        ) : (
          <p style={{ color: '#f87171', marginBottom: '20px' }}>Need a sequence of at least 4 to win points.</p>
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
      <div style={{ fontSize: '20px', color: '#fbbf24', marginBottom: '30px' }}>Pattern Length: {sequence.length}</div>
      <div style={{ color: '#cbd5e1', marginBottom: '20px', height: '24px' }}>
        {isShowing ? "Watch the pattern..." : "Your turn!"}
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        maxWidth: '300px',
        margin: '0 auto'
      }}>
        {COLORS.map((color, idx) => (
          <div 
            key={idx}
            onClick={() => handleColorClick(idx)}
            style={{
              width: '100%',
              aspectRatio: '1/1',
              backgroundColor: litIndex === idx ? LIT_COLORS[idx] : color,
              borderRadius: '20px',
              cursor: isShowing ? 'default' : 'pointer',
              opacity: isShowing && litIndex !== idx ? 0.7 : 1,
              boxShadow: litIndex === idx ? `0 0 30px ${LIT_COLORS[idx]}` : 'none',
              transition: 'background-color 0.1s, box-shadow 0.1s'
            }}
          />
        ))}
      </div>
    </div>
  );
}
