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

  // Phase 1 Builder
  let steps1 = [];
  let choices1 = [];

  // Phase 2 Builder  
  let steps2 = [];
  let choices2 = [];

  // -------------------------------------------------------------
  // DYNAMIC CONTENT GENERATOR BY LOCATION & PERSONALITY
  // -------------------------------------------------------------

  if (locationId === 'coffee') {
    steps1.push({ text: "You push open the heavy glass door of 'The Rusty Mug'.", type: 'arrival' });
    if (personality === 'shy') {
      steps1.push({ text: "H-hi! I secured us a quiet corner booth.", type: 'chat', character: true });
      steps1.push({ text: "They look down nervously at their menu, unsure of what to say.", type: 'situation' });
      choices1 = [
        { text: "Ask them what they are reading lately.", love: 15, response: "Oh! Actually I'm reading this amazing fantasy novel..." },
        { text: "Stare at them silently waiting for them to order.", love: -10, response: "U-um... The menu is quite large..." }
      ];
      steps2.push({ text: "The drinks arrive. They seem much more relaxed now.", type: 'situation' });
      steps2.push({ text: "I'm really glad you're so patient with me. I appreciate that.", type: 'chat', character: true });
      steps2.push({ text: "Suddenly, a loud crash happens as a waiter drops plates!", type: 'situation' });
      choices2 = [
        { text: "Gently hold their hand to comfort them.", love: 25, response: "Y-you're holding my hand... I like it. 🥺" },
        { text: "Yell at the waiter for being annoying.", love: -30, response: "That was incredibly rude of you to shout..." }
      ];
    } else if (personality === 'bold') {
      steps1.push({ text: "Hey! Over here! I already ordered you an iced latte.", type: 'chat', character: true });
      steps1.push({ text: "They lean confidently across the table, intensely locking eyes with you.", type: 'situation' });
      choices1 = [
        { text: "Lean in closer too, returning the eye contact.", love: 20, response: "I like that confidence. Don't look away. 😉" },
        { text: "Look away uncomfortably and check your phone.", love: -15, response: "Oh, am I boring you already?" }
      ];
      steps2.push({ text: "An hour passes filled with heavy flirting and sharp banter.", type: 'situation' });
      steps2.push({ text: "You know, you're the first person I've met who can actually keep up with me.", type: 'chat', character: true });
      steps2.push({ text: "They reach over and playfully boop your nose.", type: 'situation' });
      choices2 = [
        { text: "Boop them back and wink.", love: 25, response: "Haha, you are officially amazing. 🔥" },
        { text: "Flinch away aggressively.", love: -35, response: "Whoa, okay. My bad, I guess." }
      ];
    } else {
      steps1.push({ text: "Hey! The roasted bean smell here is incredible, right?", type: 'chat', character: true });
      steps1.push({ text: "The barista brings over your warm drinks and smiles.", type: 'situation' });
      choices1 = [
        { text: "Pay for both drinks smoothly.", love: 15, response: "Aww, you didn't have to do that! Thank you! 😊" },
        { text: "Demand they pay for both.", love: -15, response: "Uh, sure... I can cover it, no worries." }
      ];
      steps2.push({ text: "You talk for hours. The sun begins to set outside the large cafe windows.", type: 'situation' });
      steps2.push({ text: "I honestly lost track of time talking to you. This was perfect.", type: 'chat', character: true });
      steps2.push({ text: "They pull out a tiny napkin doodle they drew of you.", type: 'situation' });
      choices2 = [
        { text: "Keep it forever in your wallet.", love: 30, response: "Haha, you're so dramatically sweet! 🎨" },
        { text: "Wipe your mouth with it.", love: -40, response: "Wow. That actually hurts." }
      ];
    }
  } 
  else if (locationId === 'movie') {
    steps1.push({ text: "The theater is intimately dark. The glowing screen faintly illuminates the seats.", type: 'arrival' });
    steps1.push({ text: "I hope you brought your glasses, we are in the very back row! 🍿", type: 'chat', character: true });
    steps1.push({ text: "The movie starts playing. It's a terrifying horror film.", type: 'situation' });
    choices1 = [
      { text: "Put your arm around them so they feel safe.", love: 20, response: "I'm normally not scared, but... I don't mind this." },
      { text: "Scream loudly as a joke during a quiet scene.", love: -20, response: "Shhh!! Everyone is staring at us!" }
    ];
    steps2.push({ text: "The movie reaches a quiet, emotional climax on screen.", type: 'situation' });
    steps2.push({ text: "This part always makes me cry...", type: 'chat', character: true });
    steps2.push({ text: "You both reach into the popcorn bucket at the exact same moment.", type: 'situation' });
    choices2 = [
      { text: "Lock fingers with them inside the bucket.", love: 30, response: "You're so distracting... in a good way. 🥰" },
      { text: "Snatch the popcorn aggressively and eat it loudly.", love: -30, response: "Could you chew a little louder? Unbelievable." }
    ];
  }
  else if (locationId === 'beach') {
    steps1.push({ text: "The pastel sunset dips over the horizon. The waves crash beautifully.", type: 'arrival' });
    steps1.push({ text: "Take your shoes off! The sand feels amazing. 🌊", type: 'chat', character: true });
    steps1.push({ text: "You walk side by side. Suddenly they spot a gorgeous seashell.", type: 'situation' });
    choices1 = [
      { text: "Pick it up and put it in their hair.", love: 25, response: "You think I look like a mermaid? I love it." },
      { text: "Crush it by stepping on it accidentally.", love: -15, response: "Oh no... that was a really pretty shell..." }
    ];
    steps2.push({ text: "The sky turns completely purple and stars begin to emerge.", type: 'situation' });
    steps2.push({ text: "I could stay out here forever with you. It's so quiet.", type: 'chat', character: true });
    steps2.push({ text: "A massive, unusually large wave rapidly approaches your feet!", type: 'situation' });
    choices2 = [
      { text: "Grab them tightly and pull them back to safety.", love: 35, response: "My hero! That was a close one! 💕" },
      { text: "Sprint away in terror, leaving them to get drenched.", love: -40, response: "I am entirely soaked and freezing. Date's over." }
    ];
  }
  else if (locationId === 'final') {
    steps1.push({ text: "Midnight. You stand atop the city's highest observation deck.", type: 'arrival' });
    steps1.push({ text: "Look at all those city lights... It's breathtaking. ✨", type: 'chat', character: true });
    steps1.push({ text: "They step extremely close to you by the glass railing, looking out.", type: 'situation' });
    choices1 = [
      { text: "Look at them and say: 'The view right here is better.'", love: 40, response: "You always know exactly what to say to me. 🥺" },
      { text: "Stare at your phone and ignore the view completely.", love: -30, response: "We didn't come all the way up here for you to check emails." }
    ];
    steps2.push({ text: "The wind is cold, but the atmosphere is immensely thick with romance.", type: 'situation' });
    steps2.push({ text: "Before we go... I have something I need to ask you. Seriously.", type: 'chat', character: true });
    steps2.push({ text: "They pull out a small velvet box and hold it gently.", type: 'situation' });
    choices2 = [
      { text: "Tear up, smile widely, and pull them into a passionate kiss.", love: 100, response: "I love you. Immeasurably. ✨💕" },
      { text: "Say 'Is it a watch? I already have a watch.'", love: -100, response: "Are you serious right now? I'm leaving." }
    ];
  }
  else {
    // Shared Deep Logic for Park, Amusement, Art, Dinner, generating unique dialogues
    steps1.push({ text: "You arrive. The ambiance matches the beautiful weather outside perfectly.", type: 'arrival' });
    if (personality === 'shy') steps1.push({ text: "I'm so glad we're doing this... I was practicing what to say all morning. 😅", type: 'chat', character: true });
    else if (personality === 'bold') steps1.push({ text: "Hope you're ready to make some incredible memories tonight! 🔥", type: 'chat', character: true });
    else if (personality === 'funny') steps1.push({ text: "I checked mapping routes, there is an 80% chance we get lost but who cares. 😂", type: 'chat', character: true });
    else steps1.push({ text: "I sincerely hope you enjoy this. I put a lot of thought into it. 🌷", type: 'chat', character: true });

    steps1.push({ text: "You spend an hour sharing deep interests and laughing at terrible jokes.", type: 'situation' });
    choices1 = [
      { text: "Compliment their incredibly unique mind.", love: 20, response: "That's quite possibly the best compliment I've ever gotten." },
      { text: "Give a very generic, bored response.", love: -15, response: "Well, that was incredibly underwhelming." }
    ];

    steps2.push({ text: "The core activity of the date comes to an end. It's getting late.", type: 'situation' });
    steps2.push({ text: "Time really flies, doesn't it? I feel very connected to you right now.", type: 'chat', character: true });
    steps2.push({ text: "They shyly try to brush their hand against yours.", type: 'situation' });
    choices2 = [
      { text: "Gently intertwine your fingers with theirs.", love: 30, response: "I've been wanting to do that all evening. 🥰" },
      { text: "Pull your hand away quickly and stretch.", love: -35, response: "Oh... okay. Nevermind then." }
    ];
  }

  return {
    bg,
    phases: [
      { steps: steps1, choices: choices1 },
      { steps: steps2, choices: choices2 }
    ]
  };
};
