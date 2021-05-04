const constructAnswer = (answer) => {
  let item = document.createElement("li");
  item.textContent = atob(answer);
  item.classList.add("quiz__answer");
  item.setAttribute("id", answer);
  item.setAttribute("role", "button");
  item.setAttribute("tabindex", "0");
  return item;
};

module.exports = constructAnswer;
