import { useState } from 'react';

const QUESTIONS = [
  { q: "What is the perfect date setting?", opts: ["Cozy Cafe", "Wild Theme Park", "Fancy Dinner", "Video Games"], a: 0 },
  { q: "What's the best way to resolve an argument?", opts: ["Ignore it", "Talk it out calmly", "Buy a gift", "Yell"], a: 1 },
  { q: "How often should you text?", opts: ["Every second", "Checked in daily", "Once a week", "Never"], a: 1 },
  { q: "What makes a relationship last?", opts: ["Money", "Good Looks", "Trust and Communication", "Luck"], a: 2 },
  { q: "Best anniversary gift?", opts: ["Expensive jewelry", "Handmade craft", "Nothing", "A new car"], a: 1 }
];

export default function Quiz({ onExit, addPoints, updateHighScore }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (idx) => {
    let newScore = score;
    if (idx === QUESTIONS[currentQ].a) {
      newScore += 1;
      setScore(newScore);
    }
    
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(c => c + 1);
    } else {
      setFinished(true);
      if (newScore > 3) {
        addPoints(newScore * 20, true);
        updateHighScore('quiz', newScore);
      }
    }
  };

  if (finished) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ color: '#ec4899' }}>Quiz Complete!</h2>
        <p style={{ fontSize: '20px', fontWeight: 'bold' }}>You scored {score} / {QUESTIONS.length}</p>
        <button onClick={onExit} style={{ padding: '10px 20px', background: '#ec4899', color: 'white', borderRadius: '999px', border: 'none', cursor: 'pointer', marginTop: '20px' }}>Back to Arcade</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ color: '#6b7280', fontWeight: 'bold' }}>Question {currentQ + 1} of {QUESTIONS.length}</p>
      <h3 style={{ color: '#be185d', fontSize: '22px', marginBottom: '30px' }}>{QUESTIONS[currentQ].q}</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {QUESTIONS[currentQ].opts.map((opt, i) => (
          <button key={i} onClick={() => handleAnswer(i)} style={{
            padding: '16px', background: 'linear-gradient(135deg, #ffe1e8, #f3e8ff)',
            border: '1px solid rgba(236,72,153,0.2)', borderRadius: '16px',
            color: '#be185d', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
