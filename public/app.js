const qwerty = document.querySelector("#qwerty");
const phrase = document.querySelector("#phrase");
const scoreBoard = document.querySelector('#scoreboard');
let missed = 0;

const phrases = [
  "hello world",
  "wheel of success",
  "social network",
  "facebook",
  "strafe gaming",
];
const btn = document.querySelector(".btn__reset");
btn.addEventListener("click", (e) => {
  const overlay = document.querySelector("#overlay");
  overlay.style.display = "none";
});

function getRandomPhraseAsArray(array) {
  const randomPhrase = array[Math.floor(Math.random() * array.length)];
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

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

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
    }
  checkWin();
<<<<<<< HEAD
  }


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
=======
>>>>>>> 82e573d0ca979c8d713c588aef4714c766056aa0
  }

});

function checkWin() {
  const letter = document.querySelectorAll('.letter');
  const showLetter = document.querySelectorAll('.show');
  const h2 = overlay.querySelector('h2');
  const a = overlay.querySelector('a');
  if ( letter.length === showLetter.length){
    const overlay = document.querySelector("#overlay");
    overlay.className = 'win';
    overlay.style.display = "flex";
    h2.textContent = "you won!";
    a.textContent = "Try again?";
  } else if ( missed > 4 ) {
    const overlay = document.querySelector("#overlay");
    overlay.className = 'lose';
    overlay.style.display = "flex";
    h2.textContent = "you lost :(";
    a.textContent = "Try again?";
  }
};
