const menuToggle = document.querySelector(".header__toggle");
const menuHeadings = document.querySelectorAll(".menu__heading");
const menu = document.querySelector(".menu");
const categoriesMenu = document.querySelector(".categories");
const difficultyMenu = document.querySelector(".difficulty");
const categoryDisplay = document.querySelector(".display__category");
const difficultyDisplay = document.querySelector(".display__difficulty");
let categoryChoices;
let difficultyChoices;

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("menu--visible");
});

const constructMenuItem = (node, className, parent) => {
  const item = document.createElement("li");
  item.textContent = node.title;
  item.id = node.data;
  item.classList.add(className);
  item.classList.add("menu__item");
  item.setAttribute("tabindex", "0");
  parent.appendChild(item);
};

categories.forEach((category) => {
  constructMenuItem(category, "category", categoriesMenu);
  categoryChoices = document.querySelectorAll(".category");
});

difficulties.forEach((difficulty) => {
  constructMenuItem(difficulty, "difficulty", difficultyMenu);
  difficultyChoices = document.querySelectorAll(".difficulty");
});

document.addEventListener("click", (e) => {
  const openMenus = document.querySelectorAll(".menu--active");
  openMenus.forEach((menu) => {
    if (menu.parentElement !== e.target.parentElement) {
      closeList(menu);
    }
  });
});

document.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    const openMenus = document.querySelectorAll(".menu--active");
    openMenus.forEach((menu) => {
      if (menu.parentElement !== e.target.parentElement) {
        closeList(menu);
      }
    });
  }
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

const openMenu = (heading) => {
  let targetList = heading.nextElementSibling;
  if (targetList.classList.contains("menu--active")) {
    closeList(targetList);
  } else {
    openList(targetList);
  }
};

menuHeadings.forEach((heading) => {
  heading.addEventListener("click", () => {
    if (window.innerWidth < 700) {
      return;
    }
    openMenu(heading);
  });
  heading.addEventListener("keypress", (e) => {
    if (window.innerWidth < 700) {
      return;
    }
    if (e.keyCode === 13) {
      openMenu(heading);
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

const setDisplay = () => {
  categoryDisplay.textContent = categories.find(
    (category) => category.data === parseInt(userChoices.category)
  ).title;
  difficultyDisplay.textContent =
    userChoices.difficulty[0].toUpperCase() + userChoices.difficulty.slice(1);
};

const setUserChoice = async (e, type) => {
  userChoices[type] = e.target.id;
  const { data } = await axios.get(
    `https://opentdb.com/api.php?amount=10&category=${userChoices.category}&difficulty=${userChoices.difficulty}&type=multiple&encode=base64`
  );
  initialize(data);
  setDisplay();
  setMenu();
  reset();
  menu.classList.remove("menu--visible");
  quizButton.textContent = "Start new quiz";
};

categoryChoices.forEach((category) => {
  category.addEventListener("click", async (e) => {
    await setUserChoice(e, "category");
  });
  category.addEventListener("keyup", async (e) => {
    if (e.keyCode === 13) {
      await setUserChoice(e, "category");
    }
  });
});

difficultyChoices.forEach((difficulty) => {
  difficulty.addEventListener("click", async (e) => {
    await setUserChoice(e, "difficulty");
  });
  difficulty.addEventListener("keyup", async (e) => {
    if (e.keyCode === 13) {
      await setUserChoice(e, "difficulty");
    }
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 700) {
    menu.classList.remove("menu--visible");
  }
});
