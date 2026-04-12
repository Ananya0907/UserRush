import { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [points, setPoints] = useState(() => parseInt(localStorage.getItem('points')) || 1000);
  const [arcadeStreak, setArcadeStreak] = useState(0);
  const [highScores, setHighScores] = useState(() => JSON.parse(localStorage.getItem('highScores')) || {});
  
  // App navigation state: 'map', 'arcade', 'date', 'minigame'
  const [currentView, setCurrentView] = useState('map');
  const [activeMiniGame, setActiveMiniGame] = useState(null);
  
  // Toast notification state
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('points', points);
    localStorage.setItem('highScores', JSON.stringify(highScores));
  }, [points, highScores]);

  const addPoints = (baseAmount, isArcadeWin = false) => {
    let multiplier = 1;
    let newStreak = arcadeStreak;

    if (isArcadeWin) {
      newStreak += 1;
      setArcadeStreak(newStreak);
      multiplier = 1 + (newStreak * 0.2); // 20% bonus per streak
    }

    const totalEarned = Math.round(baseAmount * multiplier);
    setPoints(prev => prev + totalEarned);

    // Show popup
    setToast({
      message: `+${totalEarned} Points!`,
      streakMsg: isArcadeWin && newStreak > 1 ? `(Streak 🔥x${newStreak})` : null,
      id: Date.now()
    });

    if (isArcadeWin) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#4ade80', '#fbbf24', '#3b82f6'] // Green, Gold, Blue
      });
    }

    setTimeout(() => setToast(null), 3000);
  };

  const updateHighScore = (gameId, score) => {
    setHighScores(prev => {
      const currentHigh = prev[gameId] || 0;
      if (score > currentHigh) {
        return { ...prev, [gameId]: score };
      }
      return prev;
    });
  };

  const resetStreak = () => setArcadeStreak(0);

  return (
    <GameContext.Provider value={{
      points, setPoints, addPoints,
      arcadeStreak, resetStreak,
      highScores, updateHighScore,
      currentView, setCurrentView,
      activeMiniGame, setActiveMiniGame,
      toast
    }}>
      {children}
      
      {/* Toast Overlay */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          padding: '12px 24px',
          borderRadius: '999px',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          zIndex: 9999,
          animation: 'slideDown 0.3s ease-out'
        }}>
          ✨ {toast.message} 
          {toast.streakMsg && <span style={{ color: '#fbbf24' }}>{toast.streakMsg}</span>}
        </div>
      )}
      <style>{`
        @keyframes slideDown {
          from { top: -50px; opacity: 0; }
          to { top: 20px; opacity: 1; }
        }
      `}</style>
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
