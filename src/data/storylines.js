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

  let phases = [];

  const addPhase = (steps, choices) => {
    phases.push({ steps, choices });
  };

  const modifyText = (pers, defaultText, options) => {
      return options[pers] || defaultText;
  };

  if (locationId === 'coffee') {
    addPhase([
      { text: "You push open the glass door of 'The Rusty Mug'. The smell of roasted coffee hits you.", type: 'arrival' },
      { text: modifyText(personality, "You actually showed up! ☕", {
        shy: "H-hi... I was hoping you'd wear that. It looks... nice. ☕",
        bold: "You made it. I was starting to think you were intimidated by me. 😉",
        funny: "I was practicing my cool coffee-drinking pose. Did you catch it? ☕😅",
        smart: "You have excellent timing. Almost suspiciously perfect. 📚",
        caring: "I guessed your order. If I'm wrong, you owe me another date. 😊",
        mature: "It's good to see you. I saved us the best spot in the place. ☕",
        bubbly: "You're here! I was literally counting the minutes! 🌟",
        rebel: "Not a bad spot. You clean up pretty nicely, by the way. ☕"
      }), type: 'chat', character: true },
    ], [
      { text: "I wouldn't miss this. You know I've been looking forward to it.", response: "I'll take your word for it. Let's see if it lives up to the hype.", love: 15 },
      { text: "Thanks for the spot. I needed a break.", response: "Well, hopefully I'm a good distraction.", love: 5 }
    ]);

    addPhase([
      { text: "You sit down. They idly spin their coffee cup, occasionally glancing up at you.", type: 'situation' },
      { text: modifyText(personality, "So, what's been keeping you busy?", {
        shy: "I usually come here to read, but you're a lot more interesting than my book.",
        bold: "Tell me something about yourself that isn't on your resume.",
        funny: "I'm trying to decide if you're trouble or just a lot of fun.",
        smart: "I'm reading your expressions. You're a very interesting puzzle.",
        caring: "You've been working hard lately, haven't you? You can relax now.",
        mature: "Let's skip the small talk. What are you really passionate about?",
        bubbly: "Okay, spill! What's the best thing that happened to you today before you saw me?",
        rebel: "I'm trying to figure you out. You're giving me mixed signals."
      }), type: 'chat', character: true },
      { text: "A nervous barista trips! A splash of coffee lands on your partner's sleeve.", type: 'situation' },
    ], [
      { text: "Grab a napkin and dab it playfully. 'You're a mess.'", response: "Careful, you're enjoying taking care of me a bit too much. But thanks. ❤️", love: 20 },
      { text: "Laugh. 'I guess your shirt was thirsty!'", response: "Hilarious. Remind me to ruin your outfit next time. 😄", love: 10 },
      { text: "Sigh. 'This place is a disaster, let's go.'", response: "Wow, okay. It's just water. I think I'm just going to head out. 😞", love: -35 }
    ]);
  }
  else if (locationId === 'park') {
    addPhase([
      { text: "The park is beautifully lit by the afternoon sun. A slight breeze rustles the trees.", type: 'arrival' },
      { text: modifyText(personality, "I claimed this spot before anyone else could.", {
        shy: "I brought some snacks... I hope I didn't misremember what you like. 🧺",
        bold: "Perfect view from here. The trees aren't bad either. 😏",
        funny: "I brought sandwiches. They're slightly smushed, adding to the rustic aesthetic. 🥪",
        smart: "The weather is optimal. I must say, your company is proving to be as well. ⛅",
        caring: "I made sure to bring extra blankets. I wanted you to be super comfortable. 🌞",
        mature: "The fresh air is nice. Sit down, let's pretend we don't have responsibilities.",
        bubbly: "It's so pretty out here! Come sit next to me! 🐕✨",
        rebel: "Nature's alright. Especially when you're the one sitting across from me."
      }), type: 'chat', character: true },
    ], [
      { text: "'It really is a great view from here.' (Look at them)", response: "Right back at you. 😉", love: 15 },
      { text: "It's a bit bright, but I'm having fun.", response: "We can move under the shade if you want.", love: 5 }
    ]);

    addPhase([
      { text: "You spend an hour lying on the blanket, pointing out weirdly shaped clouds.", type: 'situation' },
      { text: "Unexpectedly, a muddy golden retriever bursts out of the bushes and steals your sandwich!", type: 'situation' }
    ], [
      { text: "Watch it run away laughing. 'Guess it's just you and me now.'", response: "Haha, I guess so! We'll just have to grab pizza later to make up for it. 🍕❤️", love: 20 },
      { text: "Playfully try to wrestle it back, but give up.", response: "You really thought you could out-stubborn a dog? Cute try. 😄", love: 10 },
      { text: "Yell at the dog. 'My day is completely ruined!'", response: "Hey, take it easy. If a dog ruins your entire day, maybe we shouldn't be here. 😕", love: -35 }
    ]);
  }
  else if (locationId === 'movie') {
    addPhase([
      { text: "The theater is dimly lit and smells of fresh buttered popcorn.", type: 'arrival' },
      { text: modifyText(personality, "Right this way. I got us tickets.", {
        shy: "If the movie gets boring... I hope you don't mind if I whisper to you. 🍿",
        bold: "Back row. Just in case the dialogue isn't holding our attention. 😏",
        funny: "If you try to steal from my popcorn side, there will be consequences. 🍫",
        smart: "I've analyzed the plot twists already. But I won't spoil anything. 🎬",
        caring: "I got your favorite drink too. Let's find our seats. 😊",
        mature: "I've heard good things about this film. It better live up to my expectations of tonight.",
        bubbly: "I am SO hyped! I promise I'll try not to talk the entire time! 💖",
        rebel: "Let's sit in the back. Darker back there."
      }), type: 'chat', character: true },
    ], [
      { text: "Offer your hand to guide them up the dark stairs.", response: "Thanks... you really know how to play the gentleman/lady role. ✨", love: 15 },
      { text: "Follow them to the seats.", response: "Let's get comfortable.", love: 5 }
    ]);

    addPhase([
      { text: "During a quiet scene, they lean over, their shoulder pressing lightly against yours.", type: 'situation' },
      { text: "Are you actually paying attention to the screen?", type: 'chat', character: true },
    ], [
      { text: "Whisper back: 'Honestly, I'm trying to, but I'm a bit distracted.'", response: "Good. That was the plan. Keep watching... or don't. 😉❤️", love: 25 },
      { text: "Whisper: 'Yeah, it's getting really good.'", response: "Yeah, the pacing is finally picking up.", love: 10 },
      { text: "Loudly whisper: 'No, this movie is a total waste of my time.'", response: "People are looking at us... honestly, don't be that person. 😑", love: -35 }
    ]);
  }
  else if (locationId === 'amusement') {
    addPhase([
      { text: "The sounds of rollercoasters and carnival games ring through the air.", type: 'arrival' },
      { text: modifyText(personality, "Where to first?", {
        shy: "They look so fast... you might have to hold onto me. 🎡",
        bold: "Rollercoaster. Front row. Let's see if you can handle it. 🎢",
        funny: "I'm going to win you some ridiculous prize that you'll have to carry all day. 🎯",
        smart: "The structural integrity of that wooden coaster is questionable. Shall we? 🧐",
        caring: "Make sure you stay close. The crowd gets thick around here. 😊",
        mature: "It's chaotic, but seeing you in this lighting is pretty nice.",
        bubbly: "COTTON CANDY! Let's get a sugar rush before the rides! 🍭",
        rebel: "Skip the lines, let's find the ride that actually drops."
      }), type: 'chat', character: true }
    ], [
      { text: "'Lead the way. I'm right behind you.'", response: "I was hoping you'd say that. Let's go. 🎢❤️", love: 15 },
      { text: "Let's just get some food first.", response: "Fair enough, fueling up is smart.", love: 5 }
    ]);

    addPhase([
      { text: "You spend an hour laughing on rides. You end up at the top of the Ferris Wheel.", type: 'situation' },
      { text: "The cart rocks slightly. They shift their weight closer to the center... next to you.", type: 'situation' },
      { text: "It's quieter up here. Which is a nice change of pace.", type: 'chat', character: true }
    ], [
      { text: "'Yeah. It's nice just having you to myself for a minute.'", response: "I agree. This view isn't bad... the city looks okay too. 😉💕", love: 25 },
      { text: "'Yeah, the city looks really cool from here.'", response: "It really does. Glad we did this.", love: 10 },
      { text: "Rock the cart forcefully. 'Check this out!'", response: "Hey! Don't do that, I'm actually terrified! Wow, completely ruined the mood. 😡", love: -40 }
    ]);
  }
  else if (locationId === 'art') {
    addPhase([
      { text: "The studio smells of fresh paint. Canvases are neatly arranged.", type: 'arrival' },
      { text: "I thought getting a bit messy could be an interesting experiment. 🎨", type: 'chat', character: true }
    ], [
      { text: "'Hopefully I don't get too distracted to paint.'", response: "I make no promises about not distracting you. 😉", love: 15 },
      { text: "Let's try our best and see what happens.", response: "It's not about being good, it's about having fun.", love: 5 }
    ]);

    addPhase([
      { text: "You both start painting. They playfully bump your elbow, messing up your line.", type: 'situation' },
      { text: "Oh, my bad. Looks like you'll just have to turn that into a 'happy accident'.", type: 'chat', character: true }
    ], [
      { text: "Dab a tiny spot of paint on their cheek. 'Happy accident.'", response: "Oh, you're playing a dangerous game now... I like it. 😆❤️", love: 20 },
      { text: "Laugh and try to fix the painting.", response: "You're taking this very seriously! I admire the focus.", love: 10 },
      { text: "Sigh and put the brush down. 'You ruined it.'", response: "I was just playing around... you really don't know how to have fun, do you? 😞", love: -35 }
    ]);
  }
  else if (locationId === 'beach') {
    addPhase([
      { text: "The sunset reflects off the waves. The beach is mostly empty.", type: 'arrival' },
      { text: "I love it when it's this quiet. Just the sound of the water. 🌊", type: 'chat', character: true }
    ], [
      { text: "'It's almost too perfect of a setup.'", response: "Maybe I planned it that way on purpose. ☺️", love: 20 },
      { text: "It really is a nice evening for a walk.", response: "Definitely.", love: 10 }
    ]);

    addPhase([
      { text: "You take off your shoes and walk near the water. They casually match your pace perfectly.", type: 'situation' },
      { text: "A sudden wave rushes past your ankles, splashing their jeans.", type: 'situation' }
    ], [
      { text: "Catch their arm so they don't slip. 'Gotcha.'", response: "Thanks... guess you're my anchor for the evening. 💦❤️", love: 25 },
      { text: "Ask if they're okay and offer to walk higher up.", response: "Yeah, let's move up before we're swimming.", love: 10 },
      { text: "Complain, 'I hate sandy wet shoes, let's just go.'", response: "We're literally at a beach... what did you think would happen? Nevermind, let's leave. 🙄", love: -35 }
    ]);
  }
  else if (locationId === 'dinner') {
    addPhase([
      { text: "Crystal chandeliers light the intimate dining room.", type: 'arrival' },
      { text: "This place is fancy. But I think I'm slightly underdressed compared to you. 🍽️", type: 'chat', character: true }
    ], [
      { text: "'I don't know, I think you look exactly right.'", response: "I'll take the compliment. Let's see if the food matches the company.", love: 20 },
      { text: "Yeah, the ambiance is pretty intense.", response: "It really is.", love: 5 }
    ]);

    addPhase([
      { text: "The dinner goes smoothly. Over dessert, they rest their chin on their hand, watching you.", type: 'situation' },
      { text: "You know, you're a lot more intriguing than I originally thought.", type: 'chat', character: true }
    ], [
      { text: "Hold their gaze. 'Is that a good thing or a bad thing?'", response: "Oh, it's definitely a good thing. A very good thing. 🥂❤️", love: 30 },
      { text: "Smile. 'I try my best to keep things interesting.'", response: "Well, you're succeeding.", love: 15 },
      { text: "Check your phone under the table.", response: "Am I boring you? We can just get the check if you have somewhere to be. 🙁", love: -40 }
    ]);
  }
  else if (locationId === 'final') {
    addPhase([
      { text: "You arrive at a beautiful rooftop garden glowing with string lights.", type: 'arrival' },
      { text: "I thought this place had the right kind of atmosphere for us tonight. ✨", type: 'chat', character: true }
    ], [
      { text: "'You read my mind. It's stunning out here.'", response: "I was hoping I'd get that reaction.", love: 25 },
      { text: "It's very peaceful.", response: "I'm glad you think so.", love: 5 }
    ]);

    addPhase([
      { text: "You step over to the edge to look at the city. They stand right beside you, their arm brushing yours.", type: 'situation' },
      { text: "I'm really glad we met. You've made lately... very interesting.", type: 'chat', character: true }
    ], [
      { text: "Turn to face them. 'I think you're really starting to grow on me.'", response: "Just starting to? I'll have to try harder then. 💖", love: 40 },
      { text: "Bump their shoulder. 'I've had a really good time too.'", response: "Me too. More than a good time, actually. 💕", love: 20 },
      { text: "Step back slightly. 'Yeah, you've been a really good friend.'", response: "Oh. Right. Friends. I see. Well... let's head out then. 💔", love: -50 }
    ]);
  }

  return { bg, phases };
};
