export type Answer = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type Question = {
  id: number;
  title: string;
  text: string;
  answers: Answer[];
  isMystery?: boolean;
  penalty?: string;
};

export const questions: Question[] = [
  {
    id: 1,
    title: "The Philosophy of Typos",
    text: "If a word is misspelled in the dictionary, how would we ever know?",
    answers: [
      { id: "A", text: "The French Academy explodes", isCorrect: false },
      { id: "B", text: "Google sends us a notification", isCorrect: false },
      { id: "C", text: "We never know and we live a lie", isCorrect: true },
      { id: "D", text: "Impossible, the dictionary is always right", isCorrect: false },
    ],
    penalty: "The Crouching Scribe: Write the correct answer on a piece of paper while holding a squat position.",
  },
  {
    id: 2,
    title: "Historical Hardware",
    text: "Why did Kamikaze pilots wear helmets?",
    answers: [
      { id: "A", text: "To protect the radio inside the helmet", isCorrect: true },
      { id: "B", text: "Because they were optimists", isCorrect: false },
      { id: "C", text: "To look stylish in photos", isCorrect: false },
      { id: "D", text: "So they wouldn't get hurt before the impact", isCorrect: false },
    ],
    penalty: "Perfect Balance: Balance an object chosen by the audience on your head for 1 minute. If it falls, the timer restarts.",
  },
  {
    id: 3,
    title: "Aviation Mysteries",
    text: "What color is the 'black box' of an airplane?",
    answers: [
      { id: "A", text: "Transparent", isCorrect: false },
      { id: "B", text: "Rainbow", isCorrect: false },
      { id: "C", text: "Black", isCorrect: false },
      { id: "D", text: "Bright Orange", isCorrect: true },
    ],
    penalty: "The Musical Voice: You must sing every word you speak for the next 2 minutes.",
  },
  {
    id: 4,
    title: "Cosmic Commutes",
    text: "If a spaceship travels at the speed of light, do the headlights work?",
    answers: [
      { id: "A", text: "Yes, but you can’t see anything", isCorrect: true },
      { id: "B", text: "The bulb burns out instantly", isCorrect: false },
      { id: "C", text: "Only if you use high beams", isCorrect: false },
      { id: "D", text: "No, the light stays stuck in the bulb", isCorrect: false },
    ],
    penalty: "Truth Push-ups: Do one push-up for every word in the correct answer.",
  },
  {
    id: 5,
    title: "Linguistic Irony",
    text: "Why is the word 'abbreviation' so long?",
    answers: [
      { id: "A", text: "To test the patience of busy people", isCorrect: false },
      { id: "B", text: "It’s a translation error from Latin", isCorrect: false },
      { id: "C", text: "So we can abbreviate it to 'abbrev.'", isCorrect: false },
      { id: "D", text: "Because linguists have a niche sense of humor", isCorrect: true },
    ],
    penalty: "The Flamingo: Hop on one foot for 2 minutes without falling. If you fall, the timer restarts.",
  },
  {
    id: 6,
    title: "Party Aftermath",
    text: "Where do balloons go when they fly away into the sky?",
    answers: [
      { id: "A", text: "They form the asteroid belt", isCorrect: false },
      { id: "B", text: "They are recovered by NASA to save money", isCorrect: false },
      { id: "C", text: "They pop and turn into tiny pieces of plastic", isCorrect: true },
      { id: "D", text: "They go to clown heaven", isCorrect: false },
    ],
    penalty: "Sign Language: Explain the mistake you made using only gestures, without saying a single word.",
  },
  {
    id: 7,
    title: "The Snack Circuit (MYSTERY BONUS)",
    text: "If you plug a pickled cucumber directly into an electrical outlet, what happens?",
    isMystery: true,
    answers: [
      { id: "A", text: "It turns back into a regular cucumber", isCorrect: false },
      { id: "B", text: "It glows like a yellow lightbulb", isCorrect: true },
      { id: "C", text: "It trips the entire city's power grid", isCorrect: false },
      { id: "D", text: "It cooks a perfect hotdog", isCorrect: false },
    ],
    penalty: "Wall Sit: Hold a wall sit position (back against the wall, legs at 90 degrees) for 2 minutes. If you give up early, add 30 seconds to your time.",
  },
  {
    id: 8,
    title: "Farm Fashion",
    text: "Why don't sheep shrink when it rains?",
    answers: [
      { id: "A", text: "Their wool contains grease (lanolin) that repels water", isCorrect: true },
      { id: "B", text: "They wear invisible raincoats", isCorrect: false },
      { id: "C", text: "They do shrink, we just don't notice", isCorrect: false },
      { id: "D", text: "They drink the water before it touches their skin", isCorrect: false },
    ],
    penalty: "Cartoon Character: Answer all questions and speak in a cartoon character's voice (like Mickey Mouse or Donald Duck) for the next 2 minutes.",
  },
  {
    id: 9,
    title: "The Ultimate Paradox",
    text: "If you try to fail, and you succeed, what have you done?",
    answers: [
      { id: "A", text: "A failure", isCorrect: false },
      { id: "B", text: "A success", isCorrect: false },
      { id: "C", text: "A glitch in the Matrix", isCorrect: true },
      { id: "D", text: "A nap", isCorrect: false },
    ],
    penalty: "Truth Push-ups: Do one push-up for every word in the correct answer.",
  }
];
