const inputsContainer = document.querySelector(".inputs"),
  discTitle = document.querySelector(".disc"),
  guessCount = document.querySelector(".guess_count"),
  resetButton = document.querySelector("button"),
  typing = document.querySelector(".typing"),
  succ = new Audio("../audios/succ.mp3"),
  winner = document.querySelector(".winner");

// all words
const words = [
  {
    word: "react",
    disc: "JavaScript library",
  },
  {
    word: "vue",
    disc: "JavaScript Framework",
  },
  {
    word: "angular",
    disc: "JavaScript MVW Framework",
  },
  {
    word: "nodejs",
    disc: "JavaScript runtime environment",
  },
  {
    word: "php",
    disc: "general-purpose scripting language",
  },
  {
    word: "ruby",
    disc: "open source programming language",
  },
  {
    word: "python",
    disc: "Programming Language",
  },
  {
    word: "tailwind",
    disc: "A utility-first CSS framework",
  },
  {
    word: "bootstrap",
    disc: "world's most famous free CSS framework",
  },
];

let word,
  maxGuess = 12,
  countToWin = [];
// focus input after user keydown
document.addEventListener("keydown", () => typing.focus());
// start game after user keydown
typing.addEventListener("input", startGame);

// handle click resetButton change game
resetButton.addEventListener("click", getRandomWord);

// get Random Word
function getRandomWord() {
  // handle reset element
  reset();
  let randomObject = words[Math.floor(Math.random() * words.length)];
  let disc = randomObject.disc;
  // overwrite values
  word = randomObject.word;
  // add discrebtion
  discTitle.innerText = disc;
  // add guess count
  guessCount.innerText = maxGuess;
  // creaet inputs
  let inputs = "";
  for (let i = 0; i < word.length; i++) {
    inputs += `<input type="text" disabled/>`;
  }
  inputsContainer.innerHTML = inputs;
}
getRandomWord();

// start game
function startGame(e) {
  let char = e.target.value;
  if (!char.match(/[a-z]/i)) return;
  if (word.includes(char)) {
    for (let i = 0; i < word.length; i++) {
      //  add char in poisiton && cheack poisiton is found or no
      if (
        word[i] === char &&
        !inputsContainer.querySelectorAll("input")[i].value
      ) {
        inputsContainer.querySelectorAll("input")[i].value = char;
        countToWin.push(char);
      }
    }
  } else {
    maxGuess--;
  }
  guessCount.innerText = maxGuess;
  typing.value = "";

  // winner
  if (countToWin.length === word.length) {
    winner.classList.remove("hidden");
    succ.play();
    countToWin = [];
  }

  // lose
  setTimeout(() => {
    if (maxGuess <= 0) {
      alert("  😄  ياخسران صعب تكسب :)");
      for (let i = 0; i < word.length; i++) {
        inputsContainer.querySelectorAll("input")[i].value = word[i];
      }
    }
  });
}

// reset element
function reset() {
  // guees count
  maxGuess = 12;
  // hidden winneer
  winner.classList.add("hidden");
  // countToWin
  countToWin = [];
  // paues audio
  succ.pause();
}
