const menuToggle = document.querySelector(".header__toggle");
const menu = document.querySelector(".menu");
const categoriesMenu = document.querySelector(".categories");
const difficultyMenu = document.querySelector(".difficulty");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("menu--visible");
});

categories.forEach((category) => {
  const item = document.createElement("li");
  item.textContent = category.title;
  item.id = category.id;
  item.classList.add("category");
  item.classList.add("menu__item");
  categoriesMenu.appendChild(item);
  categoryChoices = document.querySelectorAll(".category");
});

difficulty.forEach((difficulty) => {
  const item = document.createElement("li");
  item.textContent = difficulty;
  item.id = difficulty;
  item.classList.add("difficulty");
  item.classList.add("menu__item");
  difficultyMenu.appendChild(item);
  difficultyChoices = document.querySelectorAll(".difficulty");
});

const setMenu = () => {
  document.querySelectorAll(".menu--chosen").forEach((choice) => {
    choice.classList.remove("menu--chosen");
  });
  document.getElementById(userChoices.category).classList.add("menu--chosen");
  document.getElementById(userChoices.difficulty).classList.add("menu--chosen");
};

categoryChoices.forEach((category) => {
  category.addEventListener("click", async (e) => {
    userChoices.category = e.target.id;
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10&category=${userChoices.category}&difficulty=${userChoices.difficulty}&type=multiple&encode=base64`
    );
    initialize(data);
    setMenu();
    reset();
    quizButton.textContent = "Start new quiz";
  });
});

difficultyChoices.forEach((difficulty) => {
  difficulty.addEventListener("click", async (e) => {
    userChoices.difficulty = e.target.id;
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10&category=${userChoices.category}&difficulty=${userChoices.difficulty}&type=multiple&encode=base64`
    );
    initialize(data);
    setMenu();
    reset();
    quizButton.textContent = "Start new quiz";
  });
});
