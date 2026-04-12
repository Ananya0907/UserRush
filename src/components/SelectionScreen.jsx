import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Heart, UserPlus } from 'lucide-react';

const PARTNERS = [
  { id: 'emma', name: 'Emma', desc: 'A shy but sweet bookworm.', personality: 'shy', img: '/assets/char_emma_1775666742492.png' },
  { id: 'liam', name: 'Liam', desc: 'An athletic and bold surfer.', personality: 'bold', img: '/assets/char_liam_1775666687057.png' },
  { id: 'lucas', name: 'Lucas', desc: 'A funny and caring musician.', personality: 'funny', img: '/assets/char_lucas_1775666780724.png' },
  { id: 'noah', name: 'Noah', desc: 'A smart, quiet photographer.', personality: 'smart', img: '/assets/char_noah_1775666722976.png' },
  { id: 'olivia', name: 'Olivia', desc: 'A deeply caring artist.', personality: 'caring', img: '/assets/char_olivia_1775666760021.png' }
];

export default function SelectionScreen() {
  const { setPlayerIdentity, setPartner, setCurrentView } = useGame();
  
  const [step, setStep] = useState(1);
  const [identityTemp, setIdentityTemp] = useState(null);

  const confirmIdentity = (gender) => {
    setIdentityTemp(gender);
    setStep(2);
  };

  const confirmPartner = (p) => {
    setPlayerIdentity(identityTemp);
    setPartner(p);
    setCurrentView('map');
  };

  if (step === 1) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '30px'
      }}>
        <h1 style={{ color: '#be185d', fontSize: '32px' }}>Choose Your Identity</h1>
        <div style={{ display: 'flex', gap: '20px' }}>
          <button onClick={() => confirmIdentity('Boy')} style={cardStyle}>
            <span style={{ fontSize: '40px' }}>👦</span>
            <h2>Boy</h2>
          </button>
          <button onClick={() => confirmIdentity('Girl')} style={cardStyle}>
            <span style={{ fontSize: '40px' }}>👧</span>
            <h2>Girl</h2>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', padding: '40px', overflowY: 'auto'
    }}>
      <h1 style={{ color: '#be185d', fontSize: '32px', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <UserPlus size={36} color="#ec4899" /> Choose Your Partner
      </h1>
      
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', width: '100%', maxWidth: '1000px'
      }}>
        {PARTNERS.map(p => (
          <div key={p.id} onClick={() => confirmPartner(p)} style={{
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            border: '2px solid rgba(255,182,193,0.5)',
            boxShadow: '0 10px 25px rgba(236,72,153,0.15)',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            textAlign: 'center'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{
              height: '240px', background: '#fbcfe8', backgroundImage: `url(${p.img})`,
              backgroundSize: 'cover', backgroundPosition: 'center'
            }} />
            <div style={{ padding: '20px' }}>
              <h2 style={{ margin: '0 0 10px', color: '#be185d', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                {p.name} <Heart fill="#ec4899" color="#ec4899" size={20} />
              </h2>
              <div style={{ display: 'inline-block', padding: '4px 12px', background: '#fdf2f8', color: '#ec4899', borderRadius: '999px', fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>
                {p.personality.toUpperCase()}
              </div>
              <p style={{ margin: 0, color: '#6b7280' }}>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const cardStyle = {
  background: 'rgba(255,255,255,0.8)',
  backdropFilter: 'blur(10px)',
  border: '2px solid rgba(255,182,193,0.5)',
  borderRadius: '24px',
  padding: '40px',
  width: '200px',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  boxShadow: '0 10px 25px rgba(236,72,153,0.15)',
  color: '#be185d'
};
