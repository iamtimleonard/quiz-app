const Quiz = require("../classes/quizClass");
const Question = require("../classes/questionClass");
const data = require("./sample.json");

const quiz = new Quiz(data);

test("Quiz", () => {
  expect(quiz).toBeInstanceOf(Quiz);
  expect(quiz).toHaveProperty("score", 0);
});

test("Question", () => {
  const question = new Question(data.results[0]);
  expect(question).toBeInstanceOf(Question);
  expect(question).toHaveProperty(
    "question",
    "In past times, what would a gentleman keep in his fob pocket?"
  );
});
