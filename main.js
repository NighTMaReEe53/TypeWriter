// Word's

let words = [
  "Programming",
  "Code",
  "Scala",
  "Javascript",
  "Python",
  "Php",
  "Destructing",
  "LeetCode",
  "FontAwesome",
  "Legacy",
];

// level's of Game

const lvls = {
  Easy: 6,
  Normal: 5,
  Hard: 4,
};

let defaultGamePlay = "Normal";

let defaultGameSecond = lvls[defaultGamePlay];

// Selector's

let msgLevel = document.querySelector(".lvl");

let msgSecond = document.querySelector(".second");

let theWord = document.querySelector(".theWord");

let startGame = document.querySelector(".btn");

let typingInput = document.querySelector(".typing");

let upComingWord = document.querySelector(".upcoming-word");

let theTime = document.querySelector(".time");

let got = document.querySelector(".got");

let total = document.querySelector(".total");

let theFinished = document.querySelector(".finish");

// Set
msgLevel.innerHTML = defaultGamePlay;
msgSecond.innerHTML = defaultGameSecond;
theTime.innerHTML = defaultGameSecond;
total.innerHTML = words.length;

typingInput.onpaste = function () {
  return false;
};

startGame.onclick = function () {
  this.remove();

  typingInput.focus();

  playingTheGame();
};

function playingTheGame() {
  // Get Word Random;

  let randomWord = words[Math.floor(Math.random() * words.length)];

  theWord.innerHTML = randomWord;

  // GetIndexWord;

  let theIndex = words.indexOf(randomWord);

  // Remove Word From Array

  words.splice(theIndex, 1);

  // Clear upComing Word
  upComingWord.innerHTML = "";

  // Looping on Data

  words.forEach((el) => {
    let theDiv = document.createElement("div");

    theDiv.appendChild(document.createTextNode(el));

    upComingWord.appendChild(theDiv);
  });
  endPoint();
}

function endPoint() {
  theTime.innerHTML = defaultGameSecond;
  let start = setInterval(() => {
    theTime.innerHTML--;


    if (theTime.innerHTML === "0") {
      clearInterval(start);

      if (theWord.innerHTML.toLowerCase() === typingInput.value.toLowerCase()) {
        typingInput.value = "";
        got.innerHTML++;
        if (words.length > 0) {
          playingTheGame();
        } else {
          typingInput.remove();
          upComingWord.remove();
          theWord.remove();
          let span = document.createElement("span");
          span.classList.add("good");
          span.appendChild(document.createTextNode("Congratulation"));
          theFinished.appendChild(span);
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        span.appendChild(document.createTextNode("Game Over !!"));
        theFinished.appendChild(span);
      }



    }

  }, 1000);
}
