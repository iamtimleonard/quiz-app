//url: https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple
let quiz;
const menuToggle = document.querySelector(".header__toggle");
const menu = document.querySelector(".menu");
const categoriesMenu = document.querySelector(".categories");
const difficultyMenu = document.querySelector(".difficulty");
const questionText = document.querySelector(".question");
const answerList = document.querySelector(".answers");
const scoreHeading = document.querySelector(".score-heading");
const quizButton = document.querySelector(".quiz__button");
const responseHeading = document.querySelector(".response");
let categoryChoices;
let difficultyChoices;
const userChoices = {
  category: "9",
  difficulty: "easy",
};

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("menu--visible");
});

categories.forEach((category) => {
  const item = document.createElement("li");
  item.textContent = category.title;
  item.id = category.id;
  item.classList.add("category");
  item.classList.add("menu__item");
  categoriesMenu.appendChild(item);
  categoryChoices = document.querySelectorAll(".category");
});

difficulty.forEach((difficulty) => {
  const item = document.createElement("li");
  item.textContent = difficulty;
  item.id = difficulty;
  item.classList.add("difficulty");
  item.classList.add("menu__item");
  difficultyMenu.appendChild(item);
  difficultyChoices = document.querySelectorAll(".difficulty");
});

const initialize = (data) => (quiz = new Quiz(data));

const constructAnswer = (answer) => {
  item = document.createElement("li");
  item.textContent = atob(answer);
  item.classList.add("answer");
  item.setAttribute("id", answer);
  answerList.appendChild(item);
  return item;
};

const prepareNextQuestion = () => {
  removeAnswers();
  try {
    question = quiz.getNextQuestion();
  } catch {
    quiz.isActive = false;
    return (questionText.textContent = `Quiz over! You got ${quiz.score} out of ${quiz.questions.length} questions correct.`);
  }
  question.shuffleAnswers();
  questionText.textContent = atob(question.question);
};

const removeAnswers = () => {
  document.querySelectorAll(".answer").forEach(function (answer) {
    answer.remove();
  });
};

const reset = () => {
  removeAnswers();
  questionText.textContent = "";
  quizButton.classList.remove("hidden");
  quiz.currentQuestion = 0;
  quiz.score = 0;
};

const deliverResult = (userAnswer) => {
  quiz.handleResult(question.isCorrect(userAnswer));
  if (question.isCorrect(userAnswer)) {
    responseHeading.textContent = `Correct! The answer was: ${atob(
      question.correctAnswer
    )}`;
    responseHeading.classList.add("correct");
    responseHeading.classList.remove("incorrect");
  } else {
    responseHeading.textContent = `Incorrect! The answer was: ${atob(
      question.correctAnswer
    )}`;
    responseHeading.classList.add("incorrect");
    responseHeading.classList.remove("correct");
  }
};

const moveOn = () => {
  prepareNextQuestion();
  scoreHeading.textContent = `Your score: ${quiz.score}`;
  if (!quiz.isActive) {
    reset();
    quizButton.textContent = "Retake quiz";
    return;
  }
  let userAnswer = "";
  for (const answer of question.allAnswers) {
    item = constructAnswer(answer);
    item.addEventListener("click", (e) => {
      userAnswer = e.target.id;
      deliverResult(userAnswer);
      moveOn();
    });
  }
};

quizButton.addEventListener("click", () => {
  quiz.isActive = true;
  responseHeading.textContent = `Test your knowledge.`;
  responseHeading.classList.remove("correct");
  responseHeading.classList.remove("incorrect");
  moveOn();
  quizButton.classList.add("hidden");
});

const setMenu = () => {
  document.querySelectorAll(".menu--chosen").forEach((choice) => {
    choice.classList.remove("menu--chosen");
  });
  document.getElementById(userChoices.category).classList.add("menu--chosen");
  document.getElementById(userChoices.difficulty).classList.add("menu--chosen");
};

categoryChoices.forEach((category) => {
  category.addEventListener("click", async (e) => {
    userChoices.category = e.target.id;
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10&category=${userChoices.category}&difficulty=${userChoices.difficulty}&type=multiple&encode=base64`
    );
    initialize(data);
    setMenu();
    reset();
    quizButton.textContent = "Start new quiz";
  });
});

difficultyChoices.forEach((difficulty) => {
  difficulty.addEventListener("click", async (e) => {
    userChoices.difficulty = e.target.id;
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10&category=${userChoices.category}&difficulty=${userChoices.difficulty}&type=multiple&encode=base64`
    );
    initialize(data);
    setMenu();
    reset();
    quizButton.textContent = "Start new quiz";
  });
});
