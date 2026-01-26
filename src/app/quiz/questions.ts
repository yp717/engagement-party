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
    options: ["London", "Edinburgh's Old Town", "Istanbul", "The Highlands"],
    correctIndex: 1,
  },
  {
    question: "In what year did they get engaged?",
    options: ["2023", "2024", "2025", "2026"],
    correctIndex: 2,
  },
  {
    question: "What was their first trip together?",
    options: ["Scotland", "Paris", "Istanbul", "London"],
    correctIndex: 0,
  },
  {
    question: "How did they travel to Edinburgh for the proposal?",
    options: ["By car", "By sleeper train", "By plane", "By highland cow"],
    correctIndex: 1,
  },
  {
    question: "Where is the engagement party held?",
    options: ["The Libertine", "Core by Clare Smyth", "Zaika", "Bank"],
    correctIndex: 0,
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
  {
    question: "What is the dress code?",
    options: ["Casual", "Smart casual", "Cocktail formal", "Black tie"],
    correctIndex: 2,
  },
];
