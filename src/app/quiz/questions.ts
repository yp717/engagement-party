export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  /** Optional image path (e.g. /photos/...) to show with the question */
  image?: string;
  /** Optional image path to show immediately after answering this question correctly */
  successImage?: string;
}

/** Image shown when the user completes all questions correctly */
export const QUIZ_SUCCESS_IMAGE =
  "/photos/black-and-white-post-engagement.jpeg";

/** Image shown when the user gets a question wrong */
export const QUIZ_FAILURE_IMAGE = "/photos/scotland-analog.jpeg";

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
    image: "/photos/scotland-analog.jpeg",
  },
  {
    question: "What central London park was the couple's first date in?",
    options: ["Regent's Park", "Green Park", "St James's Park", "Hyde Park"],
    correctIndex: 1,
  },
  {
    question:
      "When they finally went on their first dinner date (after 3 months - thanks COVID), what kind of cuisine did they eat?",
    options: ["British", "Italian", "Japanese", "French", "Indian"],
    correctIndex: 1,
  },
  {
    question: "What's the groom's middle name?",
    options: [
      "Nicholas",
      "Jacob",
      "Aris",
      "Konstantinos",
      "He doesn't have one",
    ],
    correctIndex: 2,
  },
  {
    question: "Which country has the couple not visited together?",
    options: ["Italy", "Spain", "Barbados", "Croatia"],
    correctIndex: 0,
  },
  {
    question:
      "Which of the following names does not occur in either couple's immediate family?",
    options: ["Panagiotis", "Doris", "Gürkan", "Caroline", "Eren", "Alexander"],
    correctIndex: 5,
    successImage: "/photos/alex-success.png",
  },
  {
    question:
      "One of Yannis and Alara's favourite pastimes is playing backgammon in their apartment. Who says they always win?",
    options: ["Alara", "Yannis"],
    correctIndex: 0,
  },
  {
    question: "Who actually always wins at backgammon?",
    options: ["Alara", "Yannis"],
    correctIndex: 1,
  },
  {
    question: "What's Yannis & Alara's favourite burger spot?",
    options: ["Black Bear Burger", "Bleeker Burger", "Five Guys", "McDonald's"],
    correctIndex: 0,
  },
  {
    question: "Which movie character most resembles Alara according to Yannis?",
    options: [
      "Sleeping Beauty",
      "Mort from Madagascar",
      "Dory from Finding Nemo",
      "The Cheshire Cat",
    ],
    correctIndex: 1,
    image: "/photos/alara-character.png",
    successImage: "/photos/alara-mort-same-picture.png",
  },
];
