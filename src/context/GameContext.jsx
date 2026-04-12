import { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const GameContext = createContext();

export function GameProvider({ children }) {
  // --- New Core V2 State ---
  const [playerIdentity, setPlayerIdentity] = useState(() => localStorage.getItem('playerIdentity') || null);
  const [partner, setPartner] = useState(() => JSON.parse(localStorage.getItem('partner')) || null);
  
  // Resources & Progress
  const [points, setPoints] = useState(() => parseInt(localStorage.getItem('points')) || 0); // Start at 0 to encourage arcade checking
  const [relationship, setRelationship] = useState(() => parseInt(localStorage.getItem('relationship')) || 10);
  const [unlockedLocations, setUnlockedLocations] = useState(() => JSON.parse(localStorage.getItem('unlockedLocations')) || ['coffee']);
  
  // Streaks & Arcade Memory
  const [arcadeStreak, setArcadeStreak] = useState(0);
  const [highScores, setHighScores] = useState(() => JSON.parse(localStorage.getItem('highScores')) || {});
  
  // App navigation state: 'map', 'arcade', 'date', 'minigame', 'selection'
  const [currentView, setCurrentView] = useState('map');
  const [activeMiniGame, setActiveMiniGame] = useState(null);
  const [activeLocation, setActiveLocation] = useState(null); // stores location id when on date
  
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('playerIdentity', playerIdentity || '');
    localStorage.setItem('partner', JSON.stringify(partner));
    localStorage.setItem('points', points);
    localStorage.setItem('relationship', relationship);
    localStorage.setItem('unlockedLocations', JSON.stringify(unlockedLocations));
    localStorage.setItem('highScores', JSON.stringify(highScores));
  }, [playerIdentity, partner, points, relationship, unlockedLocations, highScores]);

  useEffect(() => {
    // Force selection view if no partner chosen
    if (!partner && currentView !== 'selection') {
      setCurrentView('selection');
    }
  }, [partner]);

  const updateRelationship = (amount) => {
    setRelationship(prev => {
      const newLevel = Math.min(100, Math.max(0, prev + amount));
      return newLevel;
    });

    setToast({
      message: amount > 0 ? `+${amount} Love! 💖` : `${amount} Love 💔`,
      streakMsg: null,
      id: Date.now()
    });
    setTimeout(() => setToast(null), 3000);
  };

  const unlockLocation = (locId, cost) => {
    if (points >= cost && !unlockedLocations.includes(locId)) {
      setPoints(p => p - cost);
      setUnlockedLocations(prev => [...prev, locId]);
      
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setToast({ message: `Location Unlocked! 🗺️`, id: Date.now() });
      setTimeout(() => setToast(null), 3000);
      return true;
    }
    return false;
  };

  const addPoints = (baseAmount, isArcadeWin = false) => {
    let multiplier = 1;
    let newStreak = arcadeStreak;

    if (isArcadeWin) {
      newStreak += 1;
      setArcadeStreak(newStreak);
      multiplier = 1.2 + (newStreak * 0.3); // higher streak scaling
    }

    // Multiply base amounts universally for faster early game + good arcade payouts
    const totalPoints = Math.floor(baseAmount * multiplier * 2.5);
    setPoints(prev => prev + totalPoints);

    if (isArcadeWin && totalPoints > 0) {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.8 } });
      setToast({
        message: `✨ +${totalPoints} Points!`,
        streakMsg: newStreak > 1 ? `(Streak 🔥x${newStreak} + Perfect Bonus!)` : null,
        id: Date.now()
      });
      setTimeout(() => setToast(null), 4000);
    }
  };

  const resetStreak = () => setArcadeStreak(0);

  const updateHighScore = (gameId, score) => {
    setHighScores(prev => {
      if (!prev[gameId] || score > prev[gameId]) {
        return { ...prev, [gameId]: score };
      }
      return prev;
    });
  };

  return (
    <GameContext.Provider value={{
      playerIdentity, setPlayerIdentity,
      partner, setPartner,
      points, setPoints, addPoints,
      relationship, updateRelationship,
      unlockedLocations, unlockLocation,
      arcadeStreak, resetStreak,
      highScores, updateHighScore,
      currentView, setCurrentView,
      activeMiniGame, setActiveMiniGame,
      activeLocation, setActiveLocation,
      toast
    }}>
      {children}
      {toast && (
        <div style={{
          position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', color: '#ec4899', fontWeight: 'bold',
          padding: '16px 32px', borderRadius: '40px', zIndex: 1000, boxShadow: '0 10px 40px rgba(236,72,153,0.3)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
          animation: 'float-up 0.4s ease-out', border: '2px solid rgba(255,182,193,0.5)'
        }}>
          <div>{toast.message}</div>
          {toast.streakMsg && <div style={{ fontSize: '14px', color: '#f59e0b' }}>{toast.streakMsg}</div>}
        </div>
      )}
      <style>{`
        @keyframes float-up {
          from { top: -50px; opacity: 0; }
          to { top: 20px; opacity: 1; }
        }
      `}</style>
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
