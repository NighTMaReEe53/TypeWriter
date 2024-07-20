// Word's

let words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// level's of Game

const lvls = {
  Easy: 6,
  Normal: 5,
  Hard: 4,
};

let defaultGamePlay = "" || "Normal";
let defaultGameSecond = lvls[defaultGamePlay];

let theSelected = document.getElementById("selection");

theSelected.addEventListener("change", (e) => {
  defaultGamePlay = e.target.value;

  defaultGameSecond = lvls[defaultGamePlay];

  msgSecond.innerHTML = defaultGameSecond;
  theTime.innerHTML = defaultGameSecond;
});

// Selector's

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
msgSecond.innerHTML = defaultGameSecond;
theTime.innerHTML = defaultGameSecond;
total.innerHTML = words.length;

// Set Option's

let array = [];

let counter = 0;

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
          theWord.remove();
          typingInput.remove();
          upComingWord.remove();
          wrongWords(array);
        }
      } else {
        array.push(theWord.innerHTML.toLowerCase());

        if (words.length > 0) {
          playingTheGame();
        } else {
          wrongWords(array);
          theWord.remove();
          typingInput.remove();
          upComingWord.remove();
        }
        typingInput.value = "";
      }
    }
  }, 1000);
}

function wrongWords(array) {
  if (array.length == 0) {
    let span = document.createElement("span");

    span.className = "good";

    span.appendChild(document.createTextNode("Congratulation"));

    theFinished.appendChild(span);
  } else {
    let span = document.createElement("span");

    span.className =
      parseInt(got.innerHTML) <= array.length / 2 ? "bad" : "well";

    span.appendChild(
      parseInt(got.innerHTML) <= array.length / 2
        ? document.createTextNode("Game Over... !!")
        : document.createTextNode("Good Well")
    );
    console.log(array.length);
    theFinished.appendChild(span);
  }

  let mainDivWrong = document.createElement("div");

  mainDivWrong.className = "wrong";

  let heading = document.createElement("h2");

  heading.appendChild(
    document.createTextNode(
      `Wrong ${array.length === 1 ? "Word" : "Word's"} You Have`
    )
  );

  mainDivWrong.appendChild(heading);

  let mainBoxDiv = document.createElement("div");

  mainBoxDiv.className = "box";

  array.forEach((el) => {
    let theDiv = document.createElement("div");

    theDiv.appendChild(document.createTextNode(el));

    mainBoxDiv.appendChild(theDiv);

    mainDivWrong.appendChild(mainBoxDiv);

    theFinished.after(mainDivWrong);
  });
}
