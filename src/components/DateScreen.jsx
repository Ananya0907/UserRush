import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { Heart, ArrowLeft, Send } from 'lucide-react';
import { getScenario } from '../data/storylines';

export default function DateScreen() {
  const { activeLocation, partner, setCurrentView, setActiveLocation, relationship, updateRelationship, unlockLocation } = useGame();
  
  const scenario = getScenario(activeLocation, partner?.personality);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [chatLog, setChatLog] = useState([]);
  const [showChoices, setShowChoices] = useState(false);
  const [dateOver, setDateOver] = useState(false);
  const [dateFailed, setDateFailed] = useState(false);
  const [typing, setTyping] = useState(false);

  const getReaction = (loveAmount) => {
    if (loveAmount >= 40) return "Wow... you really are amazing. I've never felt this way before. 🥰";
    if (loveAmount > 10) return "Haha, I agree! You're honestly so sweet. 😊";
    if (loveAmount > 0) return "Oh, that's nice! 😌";
    if (loveAmount <= -30) return "Wow... that was incredibly rude. I think I'm going to head home early.";
    if (loveAmount < 0) return "Oh... really? That's... slightly disappointing.";
    return "Hmm.";
  };

  useEffect(() => {
    if (currentStep < scenario.steps.length) {
      setTyping(true);
      const step = scenario.steps[currentStep];
      
      const timer = setTimeout(() => {
        setTyping(false);
        setChatLog(prev => [...prev, step]);
        setTimeout(() => setCurrentStep(s => s + 1), 2000);
      }, 2000);

      return () => clearTimeout(timer);
    } else if (currentStep === scenario.steps.length && !dateOver && !dateFailed) {
      setTimeout(() => setShowChoices(true), 1500);
    }
  }, [currentStep, dateOver, dateFailed, scenario.steps]);

  const handleChoice = (text, loveAmt) => {
    setShowChoices(false);
    setChatLog(prev => [...prev, { text, type: 'chat', user: true }]);
    setTyping(true);
    
    setTimeout(() => {
      setTyping(false);
      setChatLog(prev => [...prev, { text: getReaction(loveAmt), type: 'chat', character: true }]);
      updateRelationship(loveAmt);
      
      if (loveAmt < 0) {
         setTimeout(() => setDateFailed(true), 3000);
      } else {
         const locKeys = ['coffee', 'park', 'movie', 'amusement', 'art', 'beach', 'dinner', 'final'];
         const currIdx = locKeys.indexOf(activeLocation);
         if (currIdx >= 0 && currIdx < locKeys.length - 1) {
            unlockLocation(locKeys[currIdx + 1], 0);
         }
         setTimeout(() => setDateOver(true), 3000);
      }
    }, 2000);
  };

  const endDate = () => {
    setActiveLocation(null);
    setCurrentView('map');
  };

  if (dateFailed) {
     return (
       <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1f2937, #111827)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', padding: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', color: '#ef4444', marginBottom: '20px' }}>Date Failed 💔</h1>
          <p style={{ fontSize: '18px', color: '#d1d5db', marginBottom: '40px', maxWidth: '600px', lineHeight: '1.6' }}>Your response deeply disappointed {partner.name}. The atmosphere turned completely cold, and they decided to cut the night short and go home early. Your relationship has taken a massive hit.</p>
          <button className="btn-aesthetic" onClick={endDate} style={{ padding: '16px 32px', background: '#ec4899', color: 'white', border: 'none', borderRadius: '999px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>
             Return to City
          </button>
       </div>
     );
  }

  return (
    <div style={{
      width: '100%', height: '100%',
      background: scenario.bg,
      backgroundSize: 'cover', backgroundPosition: 'center',
      display: 'flex', flexDirection: 'column',
      fontFamily: "'Inter', sans-serif"
    }}>
      
      <div className="glass-panel" style={{
        padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative',
        background: 'rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(30px)', borderBottom: '1px solid rgba(255,255,255,0.4)', zIndex: 10
      }}>
        <button className="back-btn btn-aesthetic" onClick={endDate} style={{ top: '20px', left: '20px', position: 'absolute', background: 'rgba(255,255,255,0.9)' }}>
          <ArrowLeft size={18} /> Escape Date
        </button>

        <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundImage: `url(${partner.img})`, backgroundSize: 'cover', border: '3px solid white', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }} />
          <h2 style={{ margin: 0, fontSize: '24px', color: 'white', textTransform: 'capitalize', fontWeight: 'bold', textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>{partner.name}</h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '20px', background: 'rgba(255,255,255,0.9)', padding: '6px 16px', borderRadius: '999px' }}>
            <Heart fill="#ec4899" color="#ec4899" size={18} />
            <div style={{ width: '100px', height: '10px', background: 'rgba(0,0,0,0.1)', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ width: `${relationship}%`, height: '100%', background: 'linear-gradient(90deg, #ec4899, #f43f5e)', transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' }} />
            </div>
            <span style={{ fontWeight: 'bold', color: '#ec4899', fontSize: '14px' }}>{relationship}%</span>
          </div>
        </div>
      </div>

      <div style={{ flexGrow: 1, padding: '40px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {chatLog.map((log, idx) => (
          <div key={idx} style={{
            alignSelf: log.user ? 'flex-end' : log.type === 'situation' || log.type === 'arrival' ? 'center' : 'flex-start',
            maxWidth: log.type === 'chat' ? '70%' : '85%', animation: 'float-up 0.5s ease-out forwards'
          }}>
            {log.type === 'chat' ? (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', flexDirection: log.user ? 'row-reverse' : 'row' }}>
                {!log.user && <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundImage: `url(${partner.img})`, backgroundSize: 'cover', flexShrink: 0, boxShadow: '0 4px 10px rgba(0,0,0,0.3)', border: '2px solid white' }} />}
                <div style={{
                  background: log.user ? 'linear-gradient(135deg, #ec4899, #f43f5e)' : 'rgba(255,255,255,0.95)',
                  backdropFilter: log.user ? 'none' : 'blur(15px)',
                  color: log.user ? 'white' : '#1f2937',
                  padding: '18px 24px',
                  border: log.user ? 'none' : '1px solid rgba(255,255,255,0.9)',
                  borderRadius: log.user ? '24px 24px 4px 24px' : '24px 24px 24px 4px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                  fontSize: '16px', lineHeight: '1.6', fontWeight: '500'
                }}>
                  {log.text}
                </div>
              </div>
            ) : (
              <div style={{
                padding: '16px 32px', borderRadius: '999px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)',
                color: 'white', fontSize: '15px', fontStyle: 'italic', fontWeight: '500', textAlign: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)'
              }}>
                {log.text}
              </div>
            )}
          </div>
        ))}

        {typing && (
          <div style={{
            alignSelf: 'flex-start', background: 'rgba(255,255,255,0.95)', padding: '16px 24px', borderRadius: '24px 24px 24px 4px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)', display: 'flex', gap: '6px', animation: 'float-up 0.3s', marginLeft: '52px',
            border: '1px solid rgba(255,255,255,0.9)'
          }}>
            <div style={{ width: '8px', height: '8px', background: '#ec4899', borderRadius: '50%', animation: 'gentle-pulse 1s infinite' }} />
            <div style={{ width: '8px', height: '8px', background: '#ec4899', borderRadius: '50%', animation: 'gentle-pulse 1s infinite 0.2s' }} />
            <div style={{ width: '8px', height: '8px', background: '#ec4899', borderRadius: '50%', animation: 'gentle-pulse 1s infinite 0.4s' }} />
          </div>
        )}
      </div>

      <div className="glass-panel" style={{
        padding: '30px', borderTop: '1px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(30px)',
        display: 'flex', flexDirection: 'column', gap: '16px', borderRadius: '32px 32px 0 0', zIndex: 10
      }}>
        {showChoices ? (
          <>
            <div style={{ textAlign: 'center', color: '#1f2937', marginBottom: '8px', fontWeight: 'bold', fontSize: '18px', textShadow: '0 2px 10px rgba(255,255,255,0.8)' }}>Make a critical decision:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button className="btn-aesthetic" onClick={() => handleChoice(scenario.opt1, scenario.o1l)} style={choiceBtnStyle}>{scenario.opt1}</button>
                <button className="btn-aesthetic" onClick={() => handleChoice(scenario.opt2, scenario.o2l)} style={choiceBtnStyle}>{scenario.opt2}</button>
            </div>
          </>
        ) : dateOver ? (
          <button className="btn-aesthetic" onClick={endDate} style={{
            padding: '20px', background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
            border: 'none', borderRadius: '999px', color: 'white', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer',
            boxShadow: '0 8px 25px rgba(236,72,153,0.5)'
          }}>
            Successfully Finish Date ✨
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '16px', opacity: 0.8 }}>
            <input type="text" disabled placeholder="Enjoying the moment together..." style={{
              flexGrow: 1, padding: '18px 24px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.9)', fontSize: '16px', fontWeight: '500', color: '#4b5563'
            }} />
            <button disabled style={{ padding: '18px', background: '#9ca3af', border: 'none', borderRadius: '50%', color: 'white' }}><Send size={24} /></button>
          </div>
        )}
      </div>
    </div>
  );
}

const choiceBtnStyle = {
  padding: '18px 24px', background: 'rgba(255,255,255,0.95)',
  border: '1px solid rgba(236,72,153,0.3)', borderRadius: '20px',
  color: '#be185d', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', textAlign: 'left',
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)', transition: 'all 0.2s'
};
