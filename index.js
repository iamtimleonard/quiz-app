const newQuiz = new Quiz(questionData);
const questionText = document.querySelector(".question");
const answerList = document.querySelector(".answers");
const scoreHeading = document.querySelector(".score-heading");
const button = document.querySelector("button");
const responseHeading = document.querySelector(".response")

const prepareNextQuestion = () => {
    document.querySelectorAll(".answer").forEach(function (answer) {
        answer.remove();
    });
    try {
        question = newQuiz.getNextQuestion();
    } catch {
        newQuiz.isActive = false
        return questionText.textContent = `Quiz over! You got ${newQuiz.score} out of ${newQuiz.questions.length} questions correct.`
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

const deliverResult = (userAnswer) => {
    newQuiz.handleResult(question.isCorrect(userAnswer));
    if (question.isCorrect(userAnswer)) {
        responseHeading.textContent = `Correct! The answer was ${question.correctAnswer}`
        responseHeading.classList.add("correct");
        responseHeading.classList.remove("incorrect");
    } else {
        responseHeading.textContent = `Incorrect! The answer was ${question.correctAnswer}`
        responseHeading.classList.add("incorrect");
        responseHeading.classList.remove("correct");
    }
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
            deliverResult(userAnswer);
            moveOn();
        });
    }
}

button.addEventListener("click", () => {
    newQuiz.isActive = true;
    responseHeading.textContent = `Test your tech knowledge.`
    responseHeading.classList.remove("correct")
    responseHeading.classList.remove("incorrect")
    moveOn();
    button.classList.add("hidden");
});