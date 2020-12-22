const questionData = {
    "response_code": 0,
    "results": [{
            "category": "Science: Computers",
            "type": "multiple",
            "difficulty": "easy",
            "question": "According to the International System of Units, how many bytes are in a kilobyte of RAM?",
            "correct_answer": "1000",
            "incorrect_answers": [
                "512",
                "1024",
                "500"
            ]
        },
        {
            "category": "Science: Computers",
            "type": "multiple",
            "difficulty": "easy",
            "question": "When Gmail first launched, how much storage did it provide for your email?",
            "correct_answer": "1GB",
            "incorrect_answers": [
                "512MB",
                "5GB",
                "Unlimited"
            ]
        },
        {
            "category": "Science: Computers",
            "type": "multiple",
            "difficulty": "easy",
            "question": "HTML is what type of language?",
            "correct_answer": "Markup Language",
            "incorrect_answers": [
                "Macro Language",
                "Programming Language",
                "Scripting Language"
            ]
        },
        {
            "category": "Science: Computers",
            "type": "multiple",
            "difficulty": "easy",
            "question": "The series of the Intel HD graphics generation succeeding that of the 5000 and 6000 series (Broadwell) is called:",
            "correct_answer": "HD Graphics 500",
            "incorrect_answers": [
                "HD Graphics 700 ",
                "HD Graphics 600",
                "HD Graphics 7000"
            ]
        },
        {
            "category": "Science: Computers",
            "type": "multiple",
            "difficulty": "easy",
            "question": "What is the most preferred image format used for logos in the Wikimedia database?",
            "correct_answer": ".svg",
            "incorrect_answers": [
                ".png",
                ".jpeg",
                ".gif"
            ]
        },
        {
            "category": "Science: Computers",
            "type": "multiple",
            "difficulty": "easy",
            "question": "What is the domain name for the country Tuvalu?",
            "correct_answer": ".tv",
            "incorrect_answers": [
                ".tu",
                ".tt",
                ".tl"
            ]
        },
        {
            "category": "Science: Computers",
            "type": "multiple",
            "difficulty": "easy",
            "question": "This mobile OS held the largest market share in 2012.",
            "correct_answer": "iOS",
            "incorrect_answers": [
                "Android",
                "BlackBerry",
                "Symbian"
            ]
        },
        {
            "category": "Science: Computers",
            "type": "multiple",
            "difficulty": "easy",
            "question": "Which programming language shares its name with an island in Indonesia?",
            "correct_answer": "Java",
            "incorrect_answers": [
                "Python",
                "C",
                "Jakarta"
            ]
        },
        {
            "category": "Science: Computers",
            "type": "multiple",
            "difficulty": "easy",
            "question": "In computing, what does MIDI stand for?",
            "correct_answer": "Musical Instrument Digital Interface",
            "incorrect_answers": [
                "Musical Interface of Digital Instruments",
                "Modular Interface of Digital Instruments",
                "Musical Instrument Data Interface"
            ]
        },
        {
            "category": "Science: Computers",
            "type": "multiple",
            "difficulty": "easy",
            "question": "What language does Node.js use?",
            "correct_answer": "JavaScript",
            "incorrect_answers": [
                "Java",
                "Java Source",
                "Joomla Source Code"
            ]
        }
    ]
}

class Quiz {
    constructor({
        results
    }) {
        this.questions = results;
    };
    currentQuestion = 0;
    score = 0;
    isActive = true;
    getNextQuestion = () => {
        if (this.currentQuestion - 1 == this.questions.length) {
            this.isActive = false;
            return this.isActive;
        }
        const nextQuestion = new Question(this.questions[this.currentQuestion]);
        this.currentQuestion++
        return nextQuestion
    };
    handleResult = (result) => result ? this.score++ : null;
}

class Question {
    constructor({
        question,
        correct_answer,
        incorrect_answers
    }) {
        this.question = question;
        this.correctAnswer = correct_answer;
        this.allAnswers = [...incorrect_answers, correct_answer]
    };
    isCorrect = (answer) => answer === this.correctAnswer ? true : false;
    shuffleAnswers() {
        for (let i = this.allAnswers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.allAnswers[i], this.allAnswers[j]] = [this.allAnswers[j], this.allAnswers[i]];
        }
    };
}

const newQuiz = new Quiz(questionData);
const questionText = document.querySelector(".question")
const answerList = document.querySelector(".answers")

const moveOn = () => {
    document.querySelectorAll(".answer").forEach(function (item) {
        item.remove();
    });
    question = newQuiz.getNextQuestion();
    question.shuffleAnswers();
    questionText.textContent = question.question;
    for (const answer of question.allAnswers) {
        item = document.createElement('li');
        item.textContent = answer;
        item.classList.add("answer")
        answerList.appendChild(item);
    }
}