export const exploreCards = [
  {
    id: 'nyu-mode',
    title: 'NYU Map',
    subtitle: 'First level: do normal life things alone.',
    description:
      'Difficulty: ****. First mission: do things alone. Eat alone, walk alone, get sick, buy medicine, go back to Bobst. Not cinematic. Very effective.',
  },
  {
    id: 'anxiety-mode',
    title: 'Background App',
    subtitle: 'Anxiety is open, but the system still runs.',
    description:
      'Status: running. Background anxiety checks school, plans, messages, deadlines, and whether everyone else secretly has a better manual. CaiOS still works. Battery drains faster.',
  },
  {
    id: 'rest-mode',
    title: 'Recovery Protocol',
    subtitle: 'Walking, shopping, eating, and calling it balance.',
    description:
      'Recovery items: walking around NYC, Japanese food, shopping, shows, carbs. Warning: may still think about tomorrow while pretending to rest. Leaving Bobst also helps.',
  },
  {
    id: 'memory-mode',
    title: 'Old Save File',
    subtitle: 'Yellow pencil lore and another version of me.',
    description:
      'Contains: yellow pencil, childhood excavator dream, serious little Chengkai, too much proving himself. Do not delete. Past me was dramatic, but he had stamina.',
  },
  {
    id: 'food-mode',
    title: 'Food Battery',
    subtitle: 'Japanese food, salmon, carbs, Diet Coke, system restored.',
    description:
      'Restore items: nigiri, salmon, curry rice, carbs, Japanese tea, Diet Coke. A good meal does not fix life. It does make the next two hours more reasonable.',
  },
]

export const modeQuestions = [
  {
    modeId: 'nyu',
    modeTitle: 'NYU Map',
    questions: [
      {
        id: 'nyu-feel',
        question: 'What was the first NYU level?',
        answer:
          'Eating alone was weird at first. Walking alone was fine until I realized I had to actually choose where to go. Getting sick and buying medicine by myself felt like a very boring boss fight. After that I thought: okay, annoying, but I can handle this.',
      },
      {
        id: 'nyu-growing-up',
        question: 'When did New York force a system update?',
        answer:
          'Probably the first time I had a full day of class, errands, food, subway confusion, and Bobst. Nobody was going to press pause for me. New York basically said: update now or crash later.',
      },
    ],
  },
  {
    modeId: 'anxiety',
    modeTitle: 'Background App',
    questions: [
      {
        id: 'anxiety-source',
        question: 'What does background anxiety sound like?',
        answer:
          'It sounds like a tiny tab asking: did you plan enough? did you study enough? why does that person look so relaxed? I can be eating salmon and still hear it refreshing.',
      },
      {
        id: 'anxiety-feeling',
        question: 'Does CaiOS still function with that tab open?',
        answer:
          'Yes. I go to class, reply to messages, make plans, drink Diet Coke, and look normal enough. Close friends get the unlocked version: jokes, overthinking, and a lot of “wait, but what if...”',
      },
    ],
  },
  {
    modeId: 'rest',
    modeTitle: 'Recovery Protocol',
    questions: [
      {
        id: 'rest-look',
        question: 'What counts as rest in CaiOS?',
        answer:
          'Walking around NYC counts. Eating Japanese food counts. Shopping counts if I do not look too closely at the receipt. Watching shows counts. Studying more does not count, even if my brain tries to sneak it in.',
      },
      {
        id: 'rest-guilt',
        question: 'Is Chengkai actually good at resting?',
        answer:
          'Medium. I like finishing the planned tasks first. Then I can rest without the deadline chasing me down the street. Ideal weekend: one study day, one life day. Reality: please do not audit.',
      },
    ],
  },
  {
    modeId: 'memory',
    modeTitle: 'Old Save File',
    questions: [
      {
        id: 'memory-shape',
        question: 'What is hidden in the old save file?',
        answer:
          'A yellow pencil. A childhood excavator dream. A younger Chengkai who thought proving himself was the main quest. He was too serious sometimes, but honestly, he carried.',
      },
      {
        id: 'memory-past-self',
        question: 'Would you restart from that save?',
        answer:
          'Restart? No. Visit? Maybe. I would tell him to keep the weird lore and stop treating every small mistake like a final exam. Also the yellow pencil becomes funnier later.',
      },
    ],
  },
  {
    modeId: 'food',
    modeTitle: 'Food Battery',
    questions: [
      {
        id: 'food-alive',
        question: 'What restores Food Battery fastest?',
        answer:
          'Japanese food. Nigiri, salmon, curry rice, gyudon, soba, and carbs in general. Japanese tea if I want to feel calm. Diet Coke if I want to feel like I made a questionable but correct decision.',
      },
      {
        id: 'food-meaning',
        question: 'Why does food fix the mood so fast?',
        answer:
          'Because it is simple. Pick a place, walk there, sit down, eat something good. No essay needed. The day is not solved, but it becomes less annoying for a while.',
      },
    ],
  },
]

export const quizQuestions = [
  {
    id: 'favorite-club',
    question: 'Which club owns the Chengkai football save file?',
    options: ['FC Barcelona', 'Real Madrid', 'Atlético Madrid', 'Valencia CF'],
    correctAnswer: 'FC Barcelona',
  },
  {
    id: 'favorite-player',
    question: 'Which Barcelona midfielder has suspiciously strong Chengkai lore?',
    options: ['Andrés Iniesta', 'Xavi', 'Ivan Rakitić', 'Sergio Busquets'],
    correctAnswer: 'Ivan Rakitić',
  },
  {
    id: 'favorite-food',
    question: 'Which food category restores Chengkai fastest?',
    options: ['Japanese food', 'Korean food', 'Chinese food', 'Thai food'],
    correctAnswer: 'Japanese food',
  },
  {
    id: 'rest-in-new-york',
    question: 'What counts as a very Chengkai rest activity in New York?',
    options: ['Sit in a coffee shop', 'Walk around', 'Browse bookstores', 'Go shopping'],
    correctAnswer: 'Walk around',
  },
  {
    id: 'usual-drink',
    question: 'Which drink appears in the Chengkai settings surprisingly often?',
    options: ['Iced Americano', 'Diet Coke', 'Coke Zero', 'Sparkling water'],
    correctAnswer: 'Diet Coke',
  },
  {
    id: 'schedule-style',
    question: 'Which schedule setting fits Chengkai best?',
    options: ['Morning person', 'Night owl', 'Late-morning person', 'Deadline-driven schedule'],
    correctAnswer: 'Morning person',
  },
  {
    id: 'city-vibe',
    question: 'Which city vibe feels most like a Chengkai comfort map?',
    options: ['Tokyo', 'Kyoto', 'Osaka', 'Nara'],
    correctAnswer: 'Kyoto',
  },
  {
    id: 'eating-style',
    question: 'Which eating setup is most Chengkai-coded?',
    options: ['Alone', 'With one close friend', 'With a small group', 'With a big group'],
    correctAnswer: 'Alone',
  },
  {
    id: 'stress-relief',
    question: 'Which low-effort stress relief setting gets used a lot?',
    options: ['Watch shows', 'Take a nap', 'Eat something good', 'Walk outside'],
    correctAnswer: 'Watch shows',
  },
  {
    id: 'remembered-for',
    question: 'Which trait would Chengkai be happiest to be remembered for?',
    options: ['Thoughtful', 'Sincere', 'Humorous', 'Hardworking'],
    correctAnswer: 'Humorous',
  },
]
