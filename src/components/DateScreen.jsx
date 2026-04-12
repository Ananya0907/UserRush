import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { Heart, ArrowLeft, Send } from 'lucide-react';

const SCENARIOS = {
  coffee: {
    bg: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80")',
    steps: [
      { text: "You push open the heavy glass door of 'The Rusty Mug'. The warm smell of roasted coffee beans instantly comforts you.", type: 'arrival' },
      { text: "Hey! I got us a table right by the window. Did I tell you how good you look today? 😊", type: 'chat', character: true },
      { text: "You both sit down. Between sips of lattes, the conversation effortlessly jumps from favorite movies to funny childhood stories.", type: 'situation' },
      { text: "You know... I was a little nervous coming here today. But talking to you feels really, really nice.", type: 'chat', character: true },
      { text: "Suddenly, the barista trips! A tiny splash of your cappuccino lands right on your partner's sleeve.", type: 'situation' }
    ],
    opt1: "Grab a napkin and gently help them dab it, laughing it off.", o1l: 30,
    opt2: "Sigh loudly and complain to the manager about the service.", o2l: -30
  },
  park: {
    bg: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1496053428987-19069d501dbf?auto=format&fit=crop&w=1200&q=80")',
    steps: [
      { text: "The park is beautifully lit by the afternoon sun. A slight breeze rustles the green oak trees above your picnic blanket.", type: 'arrival' },
      { text: "I packed some sandwiches and fruit for us! I hope it's not too simple of a date. 🧺", type: 'chat', character: true },
      { text: "You spend an hour eating, pointing out shapes in the clouds, and playfully tossing grapes at each other.", type: 'situation' },
      { text: "It's so peaceful out here with you. I wish we could just stay in this moment forever...", type: 'chat', character: true },
      { text: "Unexpectedly, a muddy golden retriever bursts out of the bushes, sprints over, and steals your sandwich!", type: 'situation' }
    ],
    opt1: "Laugh uncontrollably and pet the muddy dog.", o1l: 35,
    opt2: "Yell at the dog and storm off in frustration.", o2l: -35
  },
  movie: {
    bg: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80")',
    steps: [
      { text: "The theater is intimately dark. The glowing screen faintly illuminates the cozy reclining seats.", type: 'arrival' },
      { text: "I've been wanting to see this movie for weeks! Grab the popcorn, the previews are starting. 🍿", type: 'chat', character: true },
      { text: "You both settle in. Halfway through the romantic drama, they subtly lean their shoulder against yours.", type: 'situation' },
      { text: "(Whispering) Is it just me, or is it getting a little cold in here?", type: 'chat', character: true },
      { text: "As the tension on screen peaks, you both reach deeply into the popcorn bucket at the exact same time, your hands brushing playfully.", type: 'situation' }
    ],
    opt1: "Gently hold their hand inside the bucket and smile.", o1l: 40,
    opt2: "Quickly snatch your hand away and grab a massive handful.", o2l: -20
  },
  amusement: {
    bg: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&w=1200&q=80")',
    steps: [
      { text: "Neon lights pulse around you. The air smells like cotton candy and adrenaline as massive rollercoasters zoom overhead.", type: 'arrival' },
      { text: "Whoa, look at the size of that drop! We are totally riding the Thunderbolt first! 🎢", type: 'chat', character: true },
      { text: "You spend the evening winning cheap plushies and eating far too much sugar. The energy between you is electric.", type: 'situation' },
      { text: "This is the most fun I've had in forever. Hey... do you want to ride the ferris wheel next?", type: 'chat', character: true },
      { text: "At the very top of the ferris wheel, the ride suddenly stops. You're suspended in the starry sky, entirely alone together.", type: 'situation' }
    ],
    opt1: "Look deep into their eyes and move slightly closer.", o1l: 45,
    opt2: "Panic immediately and start shaking the cart.", o2l: -40
  },
  art: {
    bg: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80")',
    steps: [
      { text: "The studio is messy but warmly lit, filled with half-finished canvases, scattered brushes, and colorful palettes.", type: 'arrival' },
      { text: "I'm not exactly Picasso, so you might have to give me some pointers on this painting! 🎨", type: 'chat', character: true },
      { text: "You stand side-by-side, playfully critiquing each other's terrible brushstrokes while soft lo-fi beats play in the background.", type: 'situation' },
      { text: "Actually, look at the way the light catches your face right now... it's like a painting itself.", type: 'chat', character: true },
      { text: "Caught in the moment, they gesture too wildly and accidentally flick bright pink paint right onto your nose!", type: 'situation' }
    ],
    opt1: "Laugh out loud and dab some blue paint on their cheek in revenge!", o1l: 50,
    opt2: "Sigh angrily, grab a wet tissue, and walk off to the bathroom.", o2l: -45
  },
  beach: {
    bg: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80")',
    steps: [
      { text: "The pastel sunset dips over the horizon. The rhythmic crashing of the blue waves creates a profoundly relaxing atmosphere.", type: 'arrival' },
      { text: "I love the sound of the ocean. Taking a walk out here with you was the best idea ever. 🌅", type: 'chat', character: true },
      { text: "You kick off your shoes and walk barefoot along the wet sand. Occasionally, cold waves wash up over your toes, making you both laugh.", type: 'situation' },
      { text: "It's so beautiful here. But honestly? I've been looking at you more than the ocean.", type: 'chat', character: true },
      { text: "A sudden, larger wave comes crashing in quickly, threatening to soak both of your outfits entirely!", type: 'situation' }
    ],
    opt1: "Grab their waist and pull them back safely onto dry sand.", o1l: 55,
    opt2: "Sprint away immediately and leave them to get soaked.", o2l: -50
  },
  dinner: {
    bg: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80")',
    steps: [
      { text: "The grand restaurant boasts opulent golden chandeliers. Soft, elegant jazz plays over the low hum of wealthy patrons.", type: 'arrival' },
      { text: "Wow... this place is incredible. And you look absolutely stunning tonight. 🍷", type: 'chat', character: true },
      { text: "The waiter pours vintage wine. You engage in deep, meaningful conversation, completely forgetting about the luxurious food.", type: 'situation' },
      { text: "I feel like I can tell you anything. What is it that you truly, deeply look for in a partner?", type: 'chat', character: true },
      { text: "The jazz music swells smoothly. They lean across the candlelit table, waiting intently for your honest answer.", type: 'situation' }
    ],
    opt1: "Someone exactly like you, who makes me feel understood.", o1l: 60,
    opt2: "Someone rich who can buy me meals like this.", o2l: -60
  },
  final: {
    bg: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80")',
    steps: [
      { text: "Midnight. You stand atop the city's highest observation deck. A sea of glowing city lights stretches infinitely below you.", type: 'arrival' },
      { text: "We've been on so many dates now... but being here with you right now feels like a dream. ✨", type: 'chat', character: true },
      { text: "You share a long, quiet moment looking at the skyline. The wind is slightly cold, but their presence radiates intense warmth.", type: 'situation' },
      { text: "I brought you up here because I realized something important. My life is genuinely better when you're in it.", type: 'chat', character: true },
      { text: "They reach into their coat pocket and pull out a small handmade charm, holding it out to you with trembling hands.", type: 'situation' }
    ],
    opt1: "Accept it with a passionate hug. Say 'I feel the exact same way'.", o1l: 100,
    opt2: "Say 'Oh, neat.' and immediately put it in your pocket without looking at it.", o2l: -100
  }
};

export default function DateScreen() {
  const { activeLocation, partner, setCurrentView, setActiveLocation, relationship, updateRelationship, unlockLocation } = useGame();
  
  const scenario = SCENARIOS[activeLocation] || SCENARIOS.coffee;
  
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
         const locKeys = Object.keys(SCENARIOS);
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
