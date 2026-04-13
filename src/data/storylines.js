export const getScenario = (locationId, personality) => {
  const backgrounds = {
    coffee: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80")',
    park: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1496053428987-19069d501dbf?auto=format&fit=crop&w=1200&q=80")',
    movie: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80")',
    amusement: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&w=1200&q=80")',
    art: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80")',
    beach: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80")',
    dinner: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80")',
    final: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80")'
  };

  const bg = backgrounds[locationId] || backgrounds.coffee;

  let steps = [];
  let opt1 = "", opt2 = "", o1l = 0, o2l = 0;

  // Base narrative structures dynamically injected with personality tones
  if (locationId === 'coffee') {
    steps.push({ text: "You push open the heavy glass door of 'The Rusty Mug'. The warm smell of roasted coffee beans instantly comforts you.", type: 'arrival' });
    
    if (personality === 'shy') {
      steps.push({ text: "H-hi! I got us a quiet table in the corner so we wouldn't be bothered... I hope that's okay. ☕", type: 'chat', character: true });
      steps.push({ text: "You both sit down. They nervously tap their coffee cup, but as you talk about favorite books, they light up completely.", type: 'situation' });
      steps.push({ text: "I'm really glad you asked me here. I don't usually go out much, but with you... it's really nice.", type: 'chat', character: true });
    } else if (personality === 'bold') {
      steps.push({ text: "Hey there! I got you a triple-shot espresso. You're going to need the energy to keep up with me today! 😉", type: 'chat', character: true });
      steps.push({ text: "You both sit down. They lean in over the table, making incredibly intense eye contact while you talk.", type: 'situation' });
      steps.push({ text: "You know, you look even better today than you usually do. And that's saying something.", type: 'chat', character: true });
    } else if (personality === 'funny') {
      steps.push({ text: "Hey! I almost spilled both of our coffees walking over here. Total disaster averted. ☕😅", type: 'chat', character: true });
      steps.push({ text: "You both sit down. The conversation shifts to hilariously embarrassing childhood stories, making you laugh out loud.", type: 'situation' });
      steps.push({ text: "Okay, your story definitely beats mine. I am officially impressed by your clumsiness.", type: 'chat', character: true });
    } else if (personality === 'smart') {
      steps.push({ text: "Hello. I secured a table near the window. The ambient lighting here is optimal for reading. 📚", type: 'chat', character: true });
      steps.push({ text: "You both sit down. They passionately explain a bizarre documentary they watched last night, deeply engaged.", type: 'situation' });
      steps.push({ text: "It's rare to find someone who actually listens to my ramblings. I appreciate your intellect.", type: 'chat', character: true });
    } else { // caring
      steps.push({ text: "Hey! I ordered your favorite. I made sure they used the exact milk you like. 😊", type: 'chat', character: true });
      steps.push({ text: "You both sit down. They ask you deep questions about how your week has been, genuinely listening to your venting.", type: 'situation' });
      steps.push({ text: "Remember, whenever you're stressed, you can always talk to me. I'm here for you.", type: 'chat', character: true });
    }

    steps.push({ text: "Suddenly, the barista trips! A tiny splash of your cappuccino lands right on your partner's sleeve.", type: 'situation' });
    opt1 = "Grab a napkin and gently dab it off, laughing it off together."; o1l = 30;
    opt2 = "Sigh loudly and complain to the manager about the terrible service."; o2l = -30;
  }
  else if (locationId === 'park') {
    steps.push({ text: "The park is beautifully lit by the afternoon sun. A slight breeze rustles the green oak trees above your picnic blanket.", type: 'arrival' });
    if (personality === 'shy') {
      steps.push({ text: "I-I baked some small pastries... I just hope they don't taste terrible. 🧺", type: 'chat', character: true });
      steps.push({ text: "You eat the delicious pastries. They blush heavily when you compliment their baking skills.", type: 'situation' });
      steps.push({ text: "Thank you... that really means a lot to me.", type: 'chat', character: true });
    } else if (personality === 'bold') {
      steps.push({ text: "Perfect day for a picnic, isn't it? Come sit closer, the blanket isn't that big. 😏", type: 'chat', character: true });
      steps.push({ text: "They confidently lay their head down in your lap while looking up at the clouds.", type: 'situation' });
      steps.push({ text: "Everything looks better from down here, especially my view of you.", type: 'chat', character: true });
    } else if (personality === 'funny') {
      steps.push({ text: "I brought sandwiches! And by brought sandwiches, I mean I bought them from a gas station on the way. 🥪", type: 'chat', character: true });
      steps.push({ text: "You spend an hour playfully tossing grapes into each other's mouths, failing miserably 90% of the time.", type: 'situation' });
      steps.push({ text: "Okay, I may be awful at playing catch, but I'm great at making you smile.", type: 'chat', character: true });
    } else if (personality === 'smart') {
      steps.push({ text: "I researched the weather patterns, there is a exactly 0% chance of rain today. Perfect. ⛅", type: 'chat', character: true });
      steps.push({ text: "They excitedly point out different specific species of birds and plants in the park.", type: 'situation' });
      steps.push({ text: "Nature's systems are fascinating, but honestly, human connection is the most complex puzzle of all.", type: 'chat', character: true });
    } else {
      steps.push({ text: "I packed extra blankets and sunscreen just in case you need them! 🌞", type: 'chat', character: true });
      steps.push({ text: "They meticulously make sure you are comfortable and fed throughout the entire afternoon.", type: 'situation' });
      steps.push({ text: "Seeing you relaxed and happy here is honestly enough to make my entire week amazing.", type: 'chat', character: true });
    }
    steps.push({ text: "Unexpectedly, a muddy golden retriever bursts out of the bushes, sprints over, and steals your sandwich!", type: 'situation' });
    opt1 = "Laugh uncontrollably and pet the muddy dog."; o1l = 35;
    opt2 = "Yell at the dog and storm off in complete frustration."; o2l = -35;
  }
  else {
    // Generic fallback mapping for the other 6 dates applying dynamic personality
    steps.push({ text: `You arrive at the location and take in the stunning view.`, type: 'arrival' });
    
    if (personality === 'shy') steps.push({ text: "Wow, it's a bit crowded. As long as I'm beside you, I feel safe though. 🥺", type: 'chat', character: true });
    else if (personality === 'bold') steps.push({ text: "This place is amazing! Are you ready for an unforgettable night with me? 🔥", type: 'chat', character: true });
    else if (personality === 'funny') steps.push({ text: "I totally meant to bring us here... oops, I mean, yes! I planned this! 😂", type: 'chat', character: true });
    else if (personality === 'smart') steps.push({ text: "The architecture and ambiance here is surprisingly well constructed. Very nice. 🧐", type: 'chat', character: true });
    else steps.push({ text: "I just hope you're having a good time. That's all I care about right now. 💕", type: 'chat', character: true });
    
    steps.push({ text: "You spend an incredible hour fully immersed in the date experience, sharing deep looks.", type: 'situation' });
    
    if (personality === 'shy') steps.push({ text: "I didn't think I'd be able to talk this easily with anyone...", type: 'chat', character: true });
    else if (personality === 'bold') steps.push({ text: "I've been staring at your lips all evening, just so you know.", type: 'chat', character: true });
    else if (personality === 'funny') steps.push({ text: "You're lucky I'm here to provide premium entertainment for free.", type: 'chat', character: true });
    else if (personality === 'smart') steps.push({ text: "You challenge my perspective on things. That is highly attractive.", type: 'chat', character: true });
    else steps.push({ text: "You always make me feel so incredibly seen and appreciated.", type: 'chat', character: true });

    steps.push({ text: "As the date nears its peak, a sudden romantic tension heavily fills the air between you.", type: 'situation' });
    opt1 = "Lean in closely, gaze into their eyes, and smile warmly."; o1l = 45;
    opt2 = "Check your phone to see what time it is, looking bored."; o2l = -45;
  }

  return { bg, steps, opt1, o1l, opt2, o2l };
};
