const newQuiz = new Quiz(questionData);
const questionText = document.querySelector(".question");
const answerList = document.querySelector(".answers");
const scoreHeading = document.querySelector(".score-heading");
const button = document.querySelector("button");

const prepareNextQuestion = () => {
    document.querySelectorAll(".answer").forEach(function (answer) {
        answer.remove();
    });
    try {
        question = newQuiz.getNextQuestion();
    } catch {
        newQuiz.isActive = false
        return questionText.textContent = "Quiz over!"
    }
    question.shuffleAnswers();
    questionText.textContent = question.question;
}

const constructAnswer = (answer) => {
    item = document.createElement('li');
    item.textContent = answer;
    item.classList.add("answer");
    item.setAttribute("id", answer);
    answerList.appendChild(item);
    return item;
}

const reset = () => {
    button.classList.remove("hidden");
    button.textContent = "Try again";
    newQuiz.currentQuestion = 0;
    newQuiz.score = 0;
}

const moveOn = () => {
    prepareNextQuestion();
    scoreHeading.textContent = `Your score: ${newQuiz.score}`
    if (!newQuiz.isActive) {
        reset();
        return;
    }
    let userAnswer = '';
    for (const answer of question.allAnswers) {
        item = constructAnswer(answer);
        item.addEventListener("click", (e) => {
            userAnswer = e.target.id;
            newQuiz.handleResult(question.isCorrect(userAnswer))
            moveOn();
        });
    }
}

button.addEventListener("click", () => {
    newQuiz.isActive = true;
    moveOn();
    button.classList.add("hidden");
});