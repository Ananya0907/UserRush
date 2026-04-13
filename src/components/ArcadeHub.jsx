import { useGame } from '../context/GameContext';
import { Gamepad2, Brain, Fingerprint, Palette, Grip, HelpCircle, Layers, ArrowLeft, PenTool, Puzzle } from 'lucide-react';
import QuickMath from './games/QuickMath';
import SimonSays from './games/SimonSays';
import ColorReact from './games/ColorReact';
import SnakeGame from './games/SnakeGame';
import TicTacToe from './games/TicTacToe';
import MemoryCard from './games/MemoryCard';
import Quiz from './games/Quiz';
import ConnectDots from './games/ConnectDots';
import PuzzleGame from './games/PuzzleGame';

export default function ArcadeHub() {
  const { points, arcadeStreak, highScores, setCurrentView, activeMiniGame, setActiveMiniGame, addPoints, updateHighScore } = useGame();

  const gamesList = [
    { id: 'tictactoe', name: 'Tic Tac Toe', icon: <Grip size={32} color="#ec4899" />, desc: 'Beat the AI' },
    { id: 'memory', name: 'Memory Match', icon: <Layers size={32} color="#a855f7" />, desc: 'Match pairs' },
    { id: 'quiz', name: 'Love Quiz', icon: <HelpCircle size={32} color="#ec4899" />, desc: 'Relationship trivia' },
    { id: 'quickmath', name: 'Quick Math', icon: <Brain size={32} color="#3b82f6" />, desc: '30s arithmetic drill' },
    { id: 'simonsays', name: 'Simon Says', icon: <Palette size={32} color="#eab308" />, desc: 'Memory test' },
    { id: 'colorreact', name: 'Color React', icon: <Fingerprint size={32} color="#ef4444" />, desc: 'Reflex tester' },
    { id: 'snake', name: 'Neon Snake', icon: <Gamepad2 size={32} color="#10b981" />, desc: 'Scaling speed' },
    { id: 'connectdots', name: 'Connect Dots', icon: <PenTool size={32} color="#ec4899" />, desc: 'Speed sequential tapping' },
    { id: 'puzzle', name: 'Sliding Puzzle', icon: <Puzzle size={32} color="#3b82f6" />, desc: 'Order the numbers 1-8' }
  ];

  const renderActiveGame = () => {
    const props = { onExit: () => setActiveMiniGame(null), addPoints, updateHighScore };
    switch(activeMiniGame) {
      case 'tictactoe': return <TicTacToe {...props} />;
      case 'memory': return <MemoryCard {...props} />;
      case 'quiz': return <Quiz {...props} />;
      case 'quickmath': return <QuickMath {...props} />;
      case 'simonsays': return <SimonSays {...props} />;
      case 'colorreact': return <ColorReact {...props} />;
      case 'snake': return <SnakeGame {...props} />;
      case 'connectdots': return <ConnectDots {...props} />;
      case 'puzzle': return <PuzzleGame {...props} />;
      default: return null;
    }
  };

  const handleBack = () => {
    if (activeMiniGame) setActiveMiniGame(null);
    else setCurrentView('map');
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 'clamp(20px, 4vw, 40px)', boxSizing: 'border-box', overflowY: 'auto' }}>
      
      {/* Global Back Button */}
      <button className="back-btn btn-aesthetic" onClick={handleBack} style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', zIndex: 10 }}>
        <ArrowLeft size={18} /> {activeMiniGame ? 'Back to Arcade' : 'Back to City Map'}
      </button>

      {activeMiniGame ? (
        <div className="glass-panel" style={{ width: '100%', maxWidth: '800px', padding: '40px', borderRadius: '32px', marginTop: '40px', animation: 'float-up 0.4s ease-out' }}>
             {renderActiveGame()}
        </div>
      ) : (
        <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div className="glass-panel" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 32px', borderRadius: '24px', marginBottom: '40px', marginTop: '20px' }}>
            <div>
              <h1 style={{ margin: '0 0 8px', fontSize: 'clamp(28px, 4vw, 36px)', color: '#be185d', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Gamepad2 size={36} color="#ec4899" /> Dream Arcade
              </h1>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '16px' }}>Play games to earn diamonds and unlock new date spots!</p>
            </div>
            
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
               <div style={{ fontSize: '28px', fontWeight: '900', color: '#ec4899', background: 'white', padding: '8px 24px', borderRadius: '999px', boxShadow: '0 4px 15px rgba(236,72,153,0.1)' }}>💎 {points}</div>
               {arcadeStreak > 1 && (
                 <div style={{ background: '#fef3c7', color: '#d97706', padding: '4px 12px', borderRadius: '999px', fontSize: '14px', fontWeight: 'bold' }}>
                   🔥 x{arcadeStreak} Streak
                 </div>
               )}
            </div>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', width: '100%'
          }}>
            {gamesList.map((game) => (
              <div
                key={game.id}
                onClick={() => setActiveMiniGame(game.id)}
                className="glass-panel"
                style={{
                  padding: '24px',
                  borderRadius: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(236,72,153,0.2)';
                  e.currentTarget.style.borderColor = 'rgba(236,72,153,0.4)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                }}
              >
                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.7)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {game.icon}
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 4px', color: '#be185d', fontSize: '20px' }}>{game.name}</h3>
                    <p style={{ margin: '0 0 8px', color: '#6b7280', fontSize: '14px' }}>{game.desc}</p>
                    {highScores[game.id] !== undefined && (
                      <div style={{ fontSize: '12px', color: '#8b5cf6', fontWeight: 'bold', background: '#f3e8ff', display: 'inline-block', padding: '2px 8px', borderRadius: '4px' }}>
                        Best: {highScores[game.id]}
                      </div>
                    )}
                  </div>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}
