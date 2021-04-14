class Quiz {
  constructor({ results }) {
    this.questions = results;
  }
  currentQuestion = 0;
  score = 0;
  isActive = true;
  getNextQuestion = () => {
    const nextQuestion = new Question(this.questions[this.currentQuestion]);
    this.currentQuestion++;
    return nextQuestion;
  };

  handleResult = (result) => {
    if (result) {
      this.score++;
    }
    this.questions[this.currentQuestion - 1].correct = result;
  };
}
