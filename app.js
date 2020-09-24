const qwerty = document.querySelector("#qwerty");
const phrase = document.querySelector("#phrase");

const btn = document.querySelector(".btn__reset");
const overlay = document.querySelector("#overlay");

let missed = 0;

const phrases = [
  "Change the world",
  "Strive for greatness",
  "Never regret anything",
  "Everything you can imagine is real",
  "What we think  we become",
];

btn.addEventListener("click", (e) => {
  overlay.style.display = "none";
  if (overlay.className === "start") {
    loadGame();
  } else {
    resetGame();
  }
});

function loadGame() {
  const phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
}



function resetGame() {
  const gameReset = {
    resetKeyboard: () => {
      const chosenKey = document.querySelectorAll(".chosen");
      for (let i = 0; i < chosenKey.length; i++) {
        let item = chosenKey[i].classList.remove("chosen");
        let item2 = chosenKey[i].disabled = false;
       chosenKey[i].style.background = "";
      }
    },
    resetHearts: () => {
      const hearts = document.querySelectorAll("img");
      for (let i = 0; i < hearts.length; i++) {
        hearts[i].src = "images/liveHeart.png";
      }
    },
    resetPhrase: () => {
      const li = phrase.querySelectorAll("li");
      for (let i = 0; i < li.length; i += 1) {
        li[i].remove();
      }
    },
  };
  gameReset.resetKeyboard();
  gameReset.resetHearts();
  gameReset.resetPhrase();
  missed = 0;
  loadGame();
}

function getRandomPhraseAsArray(array) {
  const randomPhrase = array[
    Math.floor(Math.random() * array.length)
  ].toLowerCase();
  return randomPhrase.split("");
}

function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement("li");
    phrase.appendChild(li);
    li.textContent = arr[i];
    if (arr[i] !== " ") {
      li.className = "letter";
    } else {
      li.className = "space";
    }
  }
}

function checkWin() {
  const title = document.querySelector(".title");
  const letter = document.querySelectorAll(".letter").length;
  const showLetter = document.querySelectorAll(".show").length;
  function overlayState(
    overlayClass,
    overlayDisplay,
    overlayTitle,
    overlayButton
  ) {
    overlay.className = overlayClass;
    overlay.style.display = overlayDisplay;
    title.textContent = overlayTitle;
    btn.textContent = overlayButton;
  }
  const gameState = {
    gameWin: () => {
      overlayState("win", "flex", "Wooah! You win.", "CONTINUE");
    },
    gameLose: () => {
      overlayState("lose", "flex", "Darn! You lost.", "RESTART");
    },
  };

  if (letter === showLetter) {
    gameState.gameWin();
  } else if (missed > 4) {
    gameState.gameLose();
  }
}

qwerty.addEventListener("click", (event) => {
  const button = event.target;
  if (button.tagName === "BUTTON") {
    button.classList.add("chosen");
    button.disabled = true;
    if (checkLetter(button)) {
      button.style.background = "#76CE82";
    } else {
      const hearts = document.querySelectorAll("img");
      hearts[missed].src = "images/lostHeart.png";
      missed += 1;
    }
    checkWin();
  }

  function checkLetter(button) {
    const checkLetter = document.querySelectorAll(".letter");
    let match = null;
    for (let i = 0; i < checkLetter.length; i += 1) {
      if (button.textContent === checkLetter[i].textContent) {
        checkLetter[i].classList.add("show");
        match = button.textContent;
      }
    }
    return match;
  }
});
