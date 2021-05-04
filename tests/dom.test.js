const constructAnswer = require("../components/Answer");

test("answer", () => {
  const answer = constructAnswer("hello world");
  expect(answer).toBeTruthy();
  expect(answer).toBeInstanceOf(HTMLLIElement);
});
