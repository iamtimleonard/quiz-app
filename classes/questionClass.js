class Question {
  constructor({ question, correct_answer, incorrect_answers }) {
    this.question = question;
    this.correctAnswer = correct_answer;
    this.allAnswers = [...incorrect_answers, correct_answer];
  }
  isCorrect = (answer) => (answer === this.correctAnswer ? true : false);
  shuffleAnswers() {
    for (let i = this.allAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.allAnswers[i], this.allAnswers[j]] = [
        this.allAnswers[j],
        this.allAnswers[i],
      ];
    }
  }
}

module.exports = Question;
