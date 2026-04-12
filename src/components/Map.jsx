import { useGame } from '../context/GameContext';
import { Gamepad2, Map as MapIcon, Lock, Cloud } from 'lucide-react';

const LOCATIONS = [
  { id: 'coffee', name: 'Coffee Shop ☕', cost: 0, desc: 'Warm cozy tones.', icon: '☕' },
  { id: 'park', name: 'Park Picnic 🌳', cost: 'unlock prev', desc: 'Fresh nature feel.', icon: '🌳' },
  { id: 'movie', name: 'Movie Night 🎬', cost: 250, desc: 'Dim lighting.', icon: '🎬' },
  { id: 'amusement', name: 'Amusement 🎡', cost: 600, desc: 'Colorful & lively.', icon: '🎡' },
  { id: 'art', name: 'Art Studio 🎨', cost: 1100, desc: 'Creative & soft.', icon: '🎨' },
  { id: 'beach', name: 'Beach Date 🌊', cost: 1800, desc: 'Sunset pastel.', icon: '🌊' },
  { id: 'dinner', name: 'Fancy Dinner 🍽️', cost: 2800, desc: 'Elegant dining.', icon: '🍽️' },
  { id: 'final', name: 'Final Date 💫', cost: 4500, desc: 'Emotional finale.', icon: '💫' }
];

export default function Map() {
  const { points, partner, setCurrentView, setActiveLocation, unlockedLocations, unlockLocation } = useGame();

  const handleLocationClick = (loc) => {
    if (unlockedLocations.includes(loc.id)) {
      setActiveLocation(loc.id);
      setCurrentView('date');
    } else {
      if (typeof loc.cost === 'number') {
        const success = unlockLocation(loc.id, loc.cost);
        if (!success) alert(`You need ${loc.cost} points to unlock this! Play arcade games.`);
      } else {
        alert("This unlocks after you complete the previous date!");
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      
      {/* Decorative Clouds */}
      <div style={{ position: 'absolute', top: '10%', left: 0, opacity: 0.5, animation: 'float-cloud 60s linear infinite', zIndex: 0 }}>
        <Cloud size={100} color="white" fill="white" />
      </div>
      <div style={{ position: 'absolute', top: '30%', left: 0, opacity: 0.4, animation: 'float-cloud 80s linear infinite 20s', zIndex: 0 }}>
        <Cloud size={150} color="white" fill="white" />
      </div>
      <div style={{ position: 'absolute', top: '70%', left: 0, opacity: 0.6, animation: 'float-cloud 50s linear infinite 5s', zIndex: 0 }}>
        <Cloud size={120} color="white" fill="white" />
      </div>

      {/* Header Overlay */}
      <div className="glass-panel" style={{ 
        margin: '20px', padding: '20px 30px', borderRadius: '24px', 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {partner && (
            <div style={{
              width: '70px', height: '70px', borderRadius: '50%', background: '#fbcfe8',
              backgroundImage: `url(${partner.img})`, backgroundSize: 'cover', backgroundPosition: 'center',
              border: '3px solid white', boxShadow: '0 4px 15px rgba(236,72,153,0.3)'
            }} />
          )}
          <div>
            <h1 style={{ margin: '0 0 4px', fontSize: '28px', color: '#be185d', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapIcon size={28} /> Romantic City Map
            </h1>
            <p style={{ margin: 0, color: '#6b7280', fontWeight: '500' }}>Swipe to explore the city street!</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#ec4899', background: 'white', padding: '8px 24px', borderRadius: '999px', boxShadow: '0 4px 15px rgba(236,72,153,0.1)' }}>
            💎 {points}
          </div>
          <button 
            onClick={() => setCurrentView('arcade')}
            className="btn-aesthetic"
            style={{
              padding: '12px 24px', background: 'linear-gradient(135deg, #a78bfa, #c084fc)', color: 'white', border: 'none',
              borderRadius: '999px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >
            <Gamepad2 size={20} /> Play Games
          </button>
        </div>
      </div>

      {/* Horizontal City Street */}
      <div style={{ 
        flexGrow: 1, width: '100%', overflowX: 'auto', overflowY: 'hidden', 
        display: 'flex', alignItems: 'center', padding: '0 50px', zIndex: 5, scrollBehavior: 'smooth' 
      }}>
        <div style={{ display: 'flex', position: 'relative', width: 'max-content', padding: '100px 50px' }}>
          
          {/* Horizontal Connection Road */}
          <div style={{ 
            position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '100px', right: '100px', 
            height: '24px', background: 'linear-gradient(to bottom, #fbcfe8, #a78bfa)', borderRadius: '999px', zIndex: 0,
            boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.1)'
          }} />

          {LOCATIONS.map((loc, index) => {
            const isUnlocked = unlockedLocations.includes(loc.id);
            const isAlternate = index % 2 !== 0;

            return (
              <div key={loc.id} style={{ 
                width: '320px', flexShrink: 0, display: 'flex', flexDirection: 'column', 
                alignItems: 'center', position: 'relative', margin: '0 30px', zIndex: 1
              }}>
                {/* Visual Node / Base */}
                <div style={{ 
                  width: '40px', height: '40px', borderRadius: '50%', 
                  background: isUnlocked ? '#ec4899' : '#e5e7eb',
                  border: '6px solid white', boxShadow: isUnlocked ? '0 0 25px rgba(236,72,153,0.8)' : 'inset 0 2px 4px rgba(0,0,0,0.1)',
                  zIndex: 2, position: 'absolute', top: '50%', transform: 'translateY(-50%)',
                  animation: isUnlocked ? 'gentle-pulse 2.5s infinite' : 'none'
                }} />

                {/* Decorative Street Scenery */}
                <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '-40px', fontSize: '32px', opacity: 0.8 }}>🌳</div>
                <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '-40px', fontSize: '32px', opacity: 0.8 }}>🪴</div>

                {/* Building Layer */}
                <div 
                  className={`glass-panel ${isUnlocked ? 'btn-aesthetic' : ''}`}
                  style={{
                    width: '100%', padding: '24px', borderRadius: '32px', 
                    transform: isAlternate ? 'translateY(100px)' : 'translateY(-120px)',
                    filter: !isUnlocked ? 'grayscale(0.6) blur(2px)' : 'none',
                    opacity: !isUnlocked ? 0.7 : 1, transition: 'all 0.3s'
                  }}
                  onMouseEnter={e => {
                    if (isUnlocked) e.currentTarget.style.boxShadow = '0 0 30px rgba(255,255,255,0.8)';
                  }}
                  onMouseLeave={e => {
                    if (isUnlocked) e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <div style={{ fontSize: '56px', textAlign: 'center', marginBottom: '10px' }}>{loc.icon}</div>
                  <h3 style={{ margin: '0 0 8px', color: '#be185d', fontSize: '20px', textAlign: 'center' }}>{loc.name}</h3>
                  <p style={{ margin: '0 0 16px', color: '#6b7280', fontSize: '14px', textAlign: 'center' }}>{loc.desc}</p>
                  
                  {!isUnlocked ? (
                    <button onClick={() => handleLocationClick(loc)} style={{
                      width: '100%', padding: '12px', borderRadius: '16px', border: '1px solid #d1d5db', background: 'rgba(255,255,255,0.5)',
                      color: '#4b5563', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                    }}>
                      <Lock size={16} /> {typeof loc.cost === 'number' ? `Unlock (${loc.cost} 💎)` : 'Locked'}
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleLocationClick(loc)}
                      className="btn-aesthetic"
                      style={{
                        width: '100%', padding: '14px', borderRadius: '16px', border: 'none',
                        background: 'linear-gradient(135deg, #ec4899, #f43f5e)', color: 'white',
                        fontWeight: 'bold', fontSize: '14px', cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(236,72,153,0.3)'
                      }}
                    >
                      Visit Date ✨
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
