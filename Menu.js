const menuToggle = document.querySelector(".header__toggle");
const menuHeadings = document.querySelectorAll(".menu__heading");
const menu = document.querySelector(".menu");
const categoriesMenu = document.querySelector(".categories");
const difficultyMenu = document.querySelector(".difficulty");
let categoryChoices;
let difficultyChoices;

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

const closeList = (target) => {
  target.style.height = "0px";
  target.classList.remove("menu--active");
};

const openList = (target) => {
  target.classList.add("menu--active");
  let targetHeight =
    target.children[0].clientHeight * (target.childElementCount + 2);
  target.style.height = `${targetHeight}px`;
};

menuHeadings.forEach((heading) => {
  heading.addEventListener("click", () => {
    if (window.innerWidth < 700) {
      return;
    }
    let targetList = heading.nextElementSibling;
    if (targetList.classList.contains("menu--active")) {
      closeList(targetList);
    } else {
      openList(targetList);
    }
  });
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

window.addEventListener("resize", () => {
  if (window.innerWidth > 700) {
    menu.classList.remove("menu--visible");
  }
});

document.addEventListener("click", (e) => {
  console.dir(e.target);
});
