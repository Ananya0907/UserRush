import { useGame } from '../context/GameContext';
import { Gamepad2, Brain, Fingerprint, Palette, XSquare } from 'lucide-react';
import QuickMath from './games/QuickMath';
import SimonSays from './games/SimonSays';
import ColorReact from './games/ColorReact';
import SnakeGame from './games/SnakeGame';

export default function ArcadeHub() {
  const { points, arcadeStreak, highScores, setCurrentView, activeMiniGame, setActiveMiniGame } = useGame();

  const gamesList = [
    { id: 'quickmath', name: 'Quick Math', icon: <Brain size={28} />, desc: '30s arithmetic drill' },
    { id: 'simonsays', name: 'Simon Says', icon: <Palette size={28} />, desc: 'Memory test' },
    { id: 'colorreact', name: 'Color React', icon: <Fingerprint size={28} />, desc: 'Reflex tester' },
    { id: 'snake', name: 'Neon Snake', icon: <Gamepad2 size={28} />, desc: 'Scaling speed' }
  ];

  const renderActiveGame = () => {
    const props = { onExit: () => setActiveMiniGame(null) };
    switch(activeMiniGame) {
      case 'quickmath': return <QuickMath {...props} />;
      case 'simonsays': return <SimonSays {...props} />;
      case 'colorreact': return <ColorReact {...props} />;
      case 'snake': return <SnakeGame {...props} />;
      default: return null;
    }
  };

  if (activeMiniGame) {
    const gameInfo = gamesList.find(g => g.id === activeMiniGame);
    return (
      <div style={{ width: 'min(90vw, 500px)', padding: 'clamp(20px, 4vw, 30px)', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            {gameInfo.icon} {gameInfo.name}
          </h2>
          <button onClick={() => setActiveMiniGame(null)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}>
            <XSquare size={28} />
          </button>
        </div>
        {renderActiveGame()}
      </div>
    );
  }

  return (
    <div style={{ width: 'min(90vw, 800px)', padding: 'clamp(20px, 4vw, 40px)', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{ margin: '0 0 10px', fontSize: 'clamp(28px, 5vw, 36px)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Gamepad2 size={36} color="#fbbf24" /> Arcade Hub
          </h1>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '16px' }}>Play games. Build streaks. Earn points.</p>
        </div>
        
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4ade80' }}>💎 {points}</div>
          {arcadeStreak > 0 && (
            <div style={{ fontSize: '16px', color: '#fbbf24', marginTop: '5px', animation: 'pulse 2s infinite' }}>
              Win Streak: 🔥 x{arcadeStreak}
            </div>
          )}
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px'
      }}>
        {gamesList.map(game => (
          <div 
            key={game.id}
            onClick={() => setActiveMiniGame(game.id)}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'transform 0.2s, background 0.2s',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
          >
            <div style={{ color: '#60a5fa' }}>{game.icon}</div>
            <h3 style={{ margin: 0, fontSize: '20px' }}>{game.name}</h3>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>{game.desc}</p>
            
            <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', color: '#fbbf24', fontSize: '13px', fontWeight: 'bold' }}>
              High Score: {highScores[game.id] || 0}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <button 
          onClick={() => setCurrentView('map')}
          style={{
            padding: '14px 28px',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '999px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        >
          Return to City Map
        </button>
      </div>
      
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
