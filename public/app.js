const qwerty = document.querySelector("#qwerty");
const phrase = document.querySelector("#phrase");
const scoreBoard = document.querySelector('#scoreboard');
let missed = 0;

// phrases
const phrases = [
  "hello world",
  "wheel of success",
  "social network",
  "facebook",
  "strafe gaming",
];

// event listener - start game
const btn = document.querySelector(".btn__reset");
btn.addEventListener("click", (e) => {
  const overlay = document.querySelector("#overlay");
  overlay.style.display = "none";
});

// This function gets random phrase from array
function getRandomPhraseAsArray(array) {
  const randomPhrase = array[Math.floor(Math.random() * array.length)];
  return randomPhrase.split("");
}

// function that add  letters as a list item and adds a class letter or space
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

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

function checkLetter(button) {
  const checkLetter = document.querySelectorAll('.letter');
  let match = null;
  for( let i = 0 ; i < checkLetter.length ; i += 1) {
      if ( button.textContent === checkLetter[i].textContent ) {
        checkLetter[i].classList.add('show');
        match = button.textContent;
      }
  }
  return match;
}

qwerty.addEventListener('click', (event) => {
  const button = event.target;
  if ( button.tagName === "BUTTON" ) {
    button.classList.add('chosen');
    button.disabled = true;
    if (checkLetter(button)) {
      button.style.background = '#76CE82';
    } else {
      const hearts = document.querySelectorAll("img");
      hearts[missed].src = "images/lostHeart.png";
      hearts.length--;
      missed += 1;
    };
  }


});
