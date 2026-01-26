export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "When did Yannis and Alara first meet?",
    options: ["2019", "2020", "2021", "2022"],
    correctIndex: 2,
  },
  {
    question: "Where did Yannis propose to Alara?",
    options: ["London", "Edinburgh", "Istanbul", "The Scottish Highlands"],
    correctIndex: 1,
  },
  {
    question: "On their engagement trip through the Scottish Highlands, which Scottish totem did they not see?",
    options: ["A Glenn", "A Nevis", "A Loch", "A Highland Cow", "They saw them all"],
    correctIndex: 1,
  },
  {
    question: "One of Yannis and Alara's favourite pasttimes is playing backgammon in their appartment. Who says they always win?",
    options: ["Alara", "Yannis"],
    correctIndex: 0,
  },
  {
    question: "Who actually always wins at backgammon?",
    options: ["Alara", "Yannis"],
    correctIndex: 1,
  },
  {
    question: "What's Alara and Yannis's favourite burget spot?",
    options: ["Black Bear Burger", "Bleeker Burger", "Five Guys", "McDonald's"],
    correctIndex: 0,
  },
  {
    question: "Which movie character most resembles Alara according to Yannis?",
    options: ["Sleeping Beauty", "Mort from Madagascar", "Dory from Finding Nemo", "The Cheshire Cat"],
    correctIndex: 1,
  },
];
