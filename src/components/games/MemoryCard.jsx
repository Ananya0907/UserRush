import { useState, useEffect } from 'react';

const ICONS = ['💖', '✨', '🌸', '🎁', '🍫', '🎀'];

export default function MemoryCard({ onExit, addPoints, updateHighScore }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const deck = [...ICONS, ...ICONS].sort(() => Math.random() - 0.5).map((icon, i) => ({ id: i, icon }));
    setCards(deck);
  }, []);

  const handleCardClick = (index) => {
    // Prevent clicking if already solved, or clicking same card, or if two cards are already flipped
    if (solved.includes(index) || flipped.includes(index) || flipped.length === 2) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const match = cards[newFlipped[0]].icon === cards[newFlipped[1]].icon;

      if (match) {
        const newSolved = [...solved, ...newFlipped];
        setSolved(newSolved);
        setFlipped([]);
        if (newSolved.length === cards.length) {
           addPoints(100, true);
           updateHighScore('memory', 100 - moves);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ color: '#ec4899', marginBottom: '20px' }}>Moves: {moves}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 60px)', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
        {cards.map((card, i) => {
          const isRevealed = flipped.includes(i) || solved.includes(i);
          return (
            <button key={i} onClick={() => handleCardClick(i)} style={{
              width: '60px', height: '60px', fontSize: '24px', border: 'none', borderRadius: '12px',
              background: isRevealed ? 'white' : 'linear-gradient(135deg, #ec4899, #f43f5e)',
              boxShadow: '0 4px 10px rgba(236,72,153,0.3)', cursor: 'pointer', transition: 'transform 0.2s',
              transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0)'
            }}>
              <span style={{ transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0)', display: 'inline-block' }}>
                {isRevealed ? card.icon : ''}
              </span>
            </button>
          );
        })}
      </div>
      
      {solved.length === cards.length && (
         <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '20px' }}>You matched them all! ✨</div>
      )}
    </div>
  );
}
