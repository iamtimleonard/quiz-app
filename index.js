//url: https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple
let quiz;

const questionText = document.querySelector(".quiz__question");
const answerList = document.querySelector(".quiz__answers");
const scoreHeading = document.querySelector(".quiz__score");
const quizButton = document.querySelector(".quiz__button");
const responseHeading = document.querySelector(".quiz__response");
const userChoices = {
  category: "9",
  difficulty: "easy",
};

const initialize = (data) => (quiz = new Quiz(data));

const constructAnswer = (answer) => {
  let item = document.createElement("li");
  item.textContent = atob(answer);
  item.classList.add("quiz__answer");
  item.setAttribute("id", answer);
  item.setAttribute("role", "button");
  item.setAttribute("tabindex", "0");
  answerList.appendChild(item);
  return item;
};

const prepareNextQuestion = () => {
  removeAnswers();
  try {
    question = quiz.getNextQuestion();
  } catch {
    quiz.isActive = false;
    return;
  }
  question.shuffleAnswers();
  questionText.textContent = atob(question.question);
};

const removeAnswers = () => {
  document.querySelectorAll(".quiz__answer").forEach(function (answer) {
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
  quiz.handleResult(question.isCorrect(userAnswer), userAnswer);
};

const moveOn = () => {
  prepareNextQuestion();
  responseHeading.textContent = "";
  if (!quiz.isActive) {
    quizButton.textContent = "Retake quiz";
    showResults();
    reset();
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
    item.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        userAnswer = e.target.id;
        deliverResult(userAnswer);
        moveOn();
      }
    });
  }
};

quizButton.addEventListener("click", () => {
  quiz.isActive = true;
  scoreHeading.textContent = "";
  responseHeading.textContent = `Test your knowledge.`;
  document.querySelectorAll(".res").forEach((item) => {
    item.remove();
  });
  moveOn();
  quizButton.classList.add("hidden");
});

const showResults = () => {
  scoreHeading.textContent = `Your got ${quiz.score} out of ${quiz.questions.length} questions right`;
  questionText.textContent = "";
  responseHeading.textContent = "Replay or choose a new quiz";
  for (let {
    question,
    correct_answer,
    userAnswer,
    correct,
  } of quiz.questions) {
    constructResult(question, "quiz__res-q", correct);
    constructResult(correct_answer, "quiz__res-correct", correct);
    constructResult(userAnswer, "quiz__res-user", correct);
  }
};

const constructResult = (text, type, isCorrect) => {
  let item = document.createElement("p");
  item.textContent = `${atob(text)}`;
  item.classList.add(type);
  let showCorrect = isCorrect ? "quiz--correct" : "quiz--incorrect";
  item.classList.add("res");
  item.classList.add(showCorrect);
  document.querySelector(".quiz").appendChild(item);
};
