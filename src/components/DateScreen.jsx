import { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { Heart, ArrowLeft, Send } from 'lucide-react';
import { getScenario } from '../data/storylines';
import confetti from 'canvas-confetti';

export default function DateScreen() {
  const { activeLocation, partner, setCurrentView, setActiveLocation, relationship, updateRelationship, unlockLocation } = useGame();
  
  const scenario = getScenario(activeLocation, partner?.personality);
  
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [chatLog, setChatLog] = useState([]);
  const [showChoices, setShowChoices] = useState(false);
  const [dateOver, setDateOver] = useState(false);
  const [dateFailed, setDateFailed] = useState(false);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  const [dateEndingState, setDateEndingState] = useState(null);

  const currentPhase = scenario.phases && scenario.phases[phaseIndex] ? scenario.phases[phaseIndex] : { steps: [], choices: [] };

  useEffect(() => {
    let timer;
    if (dateFailed || dateOver || showChoices || dateEndingState) return;

    if (currentStep < currentPhase.steps.length) {
      setTyping(true);
      timer = setTimeout(() => {
        setTyping(false);
        const step = currentPhase.steps[currentStep];
        setChatLog(prev => [...prev, step]);
        setCurrentStep(s => s + 1);
      }, 1500);
    } else if (currentStep === currentPhase.steps.length) {
      if (currentPhase.choices && currentPhase.choices.length > 0) {
        timer = setTimeout(() => setShowChoices(true), 1000);
      } else {
        timer = setTimeout(() => setDateEndingState('success'), 2000);
      }
    }
    return () => clearTimeout(timer);
  }, [currentStep, currentPhase, dateOver, dateFailed, showChoices, dateEndingState]);

  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        if(scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }, 50);
    }
  }, [chatLog, typing, showChoices, dateEndingState]);

  const handleChoice = (choiceData) => {
    setShowChoices(false);
    setChatLog(prev => [...prev, { text: choiceData.text, type: 'chat', user: true }]);
    
    setTimeout(() => {
        setTyping(true);
        setTimeout(() => {
            setTyping(false);
            setChatLog(prev => [...prev, { text: choiceData.response, type: 'chat', character: true }]);
            updateRelationship(choiceData.love);
            
            if (choiceData.love <= -30) {
               setTimeout(() => setDateEndingState('fail'), 2000);
            } else {
               if (phaseIndex < scenario.phases.length - 1) {
                  setTimeout(() => {
                     setPhaseIndex(p => p + 1);
                     setCurrentStep(0);
                  }, 2500);
               } else {
                  const locKeys = ['coffee', 'park', 'movie', 'amusement', 'art', 'beach', 'dinner', 'final'];
                  const currIdx = locKeys.indexOf(activeLocation);
                  if (currIdx >= 0 && currIdx < locKeys.length - 1) {
                     unlockLocation(locKeys[currIdx + 1], 0);
                  }

                  if (activeLocation === 'final' && (relationship + choiceData.love) >= 80) {
                    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
                  }
                  
                  setTimeout(() => setDateEndingState('success'), 2000);
               }
            }
        }, 2000);
    }, 500);
  };

  const finalizeDate = () => {
     if (dateEndingState === 'fail') setDateFailed(true);
     else setDateOver(true);
  };

  const endDate = () => {
    setActiveLocation(null);
    setCurrentView('map');
  };

  if (dateFailed) {
     return (
       <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1f2937, #111827)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', padding: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', color: '#ef4444', marginBottom: '20px' }}>Date Failed 💔</h1>
          <p style={{ fontSize: '18px', color: '#d1d5db', marginBottom: '40px', maxWidth: '600px', lineHeight: '1.6' }}>Your choice deeply disappointed {partner.name}. The atmosphere turned completely cold, and they decided to cut the night short and go home early. Your relationship has taken a massive hit.</p>
          <div style={{ padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', marginBottom: '40px', border: '1px solid rgba(255,255,255,0.1)' }}>
             <h3 style={{ margin: '0 0 10px 0', color: '#ef4444' }}>Current Relationship</h3>
             <div style={{ fontWeight: 'bold', fontSize: '32px' }}>{relationship}%</div>
          </div>
          <button className="btn-aesthetic" onClick={endDate} style={{ padding: '16px 32px', background: '#ec4899', color: 'white', border: 'none', borderRadius: '999px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>
             Return to City
          </button>
       </div>
     );
  }

  if (dateOver) {
     const isFinal = activeLocation === 'final';
     return (
       <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1f2937, #111827)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', padding: '40px', textAlign: 'center', zIndex: 100 }}>
          <h1 style={{ fontSize: '48px', color: relationship >= 80 ? '#10b981' : '#f472b6', marginBottom: '10px' }}>
             {isFinal && relationship >= 80 ? 'Successful Ending! 💖' : relationship >= 80 ? 'Perfect Date ✨' : 'Date Completed 💖'}
          </h1>
          <p style={{ fontSize: '18px', color: '#d1d5db', marginBottom: '20px', maxWidth: '600px', lineHeight: '1.6' }}>
             {isFinal && relationship >= 80 ? `You and ${partner.name} had a magical time. You made it all the way. This is a true love story!` : relationship >= 80 ? `You and ${partner.name} had an absolutely magical time. Sparks were flying everywhere! It was unforgettable.` : `You had a really nice and pleasant time with ${partner.name}. The connection is growing stronger.`}
          </p>
          <div style={{ padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', marginBottom: '40px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.2)' }}>
             <h3 style={{ margin: '0 0 10px 0', color: relationship >= 80 ? '#10b981' : '#f472b6' }}>Final Relationship Status</h3>
             <div style={{ fontWeight: '800', fontSize: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                 {relationship}% <Heart fill={relationship >= 80 ? '#10b981' : '#f472b6'} color={relationship >= 80 ? '#10b981' : '#f472b6'} size={32} />
             </div>
          </div>
          <button className="btn-aesthetic" onClick={endDate} style={{ padding: '18px 36px', background: 'linear-gradient(135deg, #ec4899, #f43f5e)', color: 'white', border: 'none', borderRadius: '999px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 8px 20px rgba(236,72,153,0.4)', transition: 'transform 0.2s' }}>
             {isFinal ? 'Back to Map' : 'Continue Journey'}
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

      <div ref={scrollRef} style={{ flexGrow: 1, padding: '40px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px', scrollBehavior: 'smooth' }}>
        {chatLog.map((log, idx) => (
          <div key={idx} style={{
            alignSelf: log.user ? 'flex-end' : log.type === 'situation' || log.type === 'arrival' ? 'center' : 'flex-start',
            maxWidth: log.type === 'chat' ? '70%' : '85%', animation: 'float-up 0.4s ease-out forwards'
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
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)', display: 'flex', gap: '6px', animation: 'float-up 0.3s forwards', marginLeft: '52px',
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
        {showChoices && currentPhase.choices ? (
          <div style={{ animation: 'float-up 0.5s ease-out forwards' }}>
            <div style={{ textAlign: 'center', color: '#1f2937', marginBottom: '12px', fontWeight: 'bold', fontSize: '18px', textShadow: '0 2px 10px rgba(255,255,255,0.8)' }}>Make a decision...</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentPhase.choices.map((choice, idx) => (
                  <button key={idx} className="btn-aesthetic" onClick={() => handleChoice(choice)} style={choiceBtnStyle}>{choice.text}</button>
                ))}
            </div>
          </div>
        ) : dateEndingState ? (
          <div style={{ animation: 'float-up 0.5s ease-out forwards', textAlign: 'center' }}>
            <button className="btn-aesthetic" onClick={finalizeDate} style={{
              background: 'linear-gradient(135deg, #ec4899, #f43f5e)', color: 'white', padding: '18px 36px', 
              border: 'none', borderRadius: '999px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(236,72,153,0.3)', width: '100%', maxWidth: '400px'
            }}>
               End the Date & See Results
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '16px', opacity: 0.8 }}>
            <input type="text" disabled placeholder={typing ? "Partner is typing..." : "Enjoying the moment together..."} style={{
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
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)', transition: 'all 0.2s, transform 0.1s'
};
