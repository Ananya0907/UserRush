import { useGame } from '../context/GameContext';
import { Gamepad2, MapPin, Heart } from 'lucide-react';

const CHARACTERS = [
  { id: 'emma', name: 'Emma', img: '/assets/char_emma_1775666742492.png', cost: 50 },
  { id: 'liam', name: 'Liam', img: '/assets/char_liam_1775666687057.png', cost: 75 },
  { id: 'lucas', name: 'Lucas', img: '/assets/char_lucas_1775666780724.png', cost: 100 },
  { id: 'noah', name: 'Noah', img: '/assets/char_noah_1775666722976.png', cost: 150 },
  { id: 'olivia', name: 'Olivia', img: '/assets/char_olivia_1775666760021.png', cost: 200 },
  { id: 'sophia', name: 'Sophia', img: '/assets/char_sophia_1775666705025.png', cost: 300 }
];

export default function Map() {
  const { points, setPoints, setCurrentView } = useGame();

  const handleDateClick = (char) => {
    if (points >= char.cost) {
      setPoints(p => p - char.cost);
      alert(`You went on a date with ${char.name}! It cost ${char.cost} points.`);
    } else {
      alert(`Not enough points to date ${char.name}! Head to the Arcade to grind some points.`);
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', padding: 'clamp(20px, 4vw, 40px)', boxSizing: 'border-box', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ margin: '0 0 10px', fontSize: 'clamp(28px, 5vw, 36px)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <MapPin size={36} color="#ef4444" /> City Map View
          </h1>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '16px' }}>Choose a character to date or visit the arcade.</p>
        </div>
        
        <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4ade80' }}>💎 {points}</div>
          <button 
            onClick={() => setCurrentView('arcade')}
            style={{
              padding: '12px 24px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '999px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Gamepad2 size={20} /> Go to Arcade
          </button>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
        paddingBottom: '40px'
      }}>
        {CHARACTERS.map(char => (
          <div key={char.id} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '24px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ 
              height: '200px', 
              width: '100%',
              background: '#1e293b', 
              backgroundImage: `url(${char.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'top center',
              position: 'relative'
            }}>
              {/* Fallback pattern if image is broken */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(to top, rgba(15,23,42,1) 0%, rgba(15,23,42,0) 100%)'
              }} />
            </div>
            
            <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>{char.name}</h2>
                <div style={{ color: '#fbbf24', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Heart size={16} /> Cost: {char.cost}
                </div>
              </div>
              
              <button 
                onClick={() => handleDateClick(char)}
                disabled={points < char.cost}
                style={{
                  marginTop: 'auto',
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  border: 'none',
                  background: points >= char.cost ? '#e11d48' : '#475569',
                  color: points >= char.cost ? 'white' : '#94a3b8',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: points >= char.cost ? 'pointer' : 'not-allowed',
                  transition: 'background 0.2s'
                }}
              >
                {points >= char.cost ? `Date ${char.name}` : 'Not Enough Points'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
