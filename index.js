//url: https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple

let quiz;
const questionText = document.querySelector(".question");
const answerList = document.querySelector(".answers");
const scoreHeading = document.querySelector(".score-heading");
const button = document.querySelector("button");
const responseHeading = document.querySelector(".response");
const categoryChoices = document.querySelectorAll(".category")

const initialize = (data) => quiz = new Quiz(data);

initialize(questionData);

const prepareNextQuestion = () => {
    document.querySelectorAll(".answer").forEach(function (answer) {
        answer.remove();
    });
    try {
        question = quiz.getNextQuestion();
    } catch {
        quiz.isActive = false
        return questionText.textContent = `Quiz over! You got ${quiz.score} out of ${quiz.questions.length} questions correct.`
    }
    question.shuffleAnswers();
    questionText.textContent = atob(question.question);
}

const constructAnswer = (answer) => {
    item = document.createElement('li');
    item.textContent = atob(answer);
    item.classList.add("answer");
    item.setAttribute("id", answer);
    answerList.appendChild(item);
    return item;
}

const reset = () => {
    button.classList.remove("hidden");
    button.textContent = "Try again";
    quiz.currentQuestion = 0;
    quiz.score = 0;
}

const deliverResult = (userAnswer) => {
    quiz.handleResult(question.isCorrect(userAnswer));
    if (question.isCorrect(userAnswer)) {
        responseHeading.textContent = `Correct! The answer was: ${atob(question.correctAnswer)}`
        responseHeading.classList.add("correct");
        responseHeading.classList.remove("incorrect");
    } else {
        responseHeading.textContent = `Incorrect! The answer was: ${atob(question.correctAnswer)}`
        responseHeading.classList.add("incorrect");
        responseHeading.classList.remove("correct");
    }
}

const moveOn = () => {
    prepareNextQuestion();
    scoreHeading.textContent = `Your score: ${quiz.score}`
    if (!quiz.isActive) {
        reset();
        return;
    }
    let userAnswer = '';
    for (const answer of question.allAnswers) {
        item = constructAnswer(answer);
        item.addEventListener("click", (e) => {
            userAnswer = (e.target.id);
            deliverResult(userAnswer);
            moveOn();
        });
    }
}

button.addEventListener("click", () => {
    quiz.isActive = true;
    responseHeading.textContent = `Test your tech knowledge.`
    responseHeading.classList.remove("correct")
    responseHeading.classList.remove("incorrect")
    moveOn();
    button.classList.add("hidden");
});

categoryChoices.forEach((category) => {
    category.addEventListener("click", async (e) => {
        const {
            data
        } = await axios.get(`https://opentdb.com/api.php?amount=10&category=${e.target.id}&difficulty=easy&type=multiple&encode=base64`);
        console.log(data)
        initialize(data);
        reset();
    });
});