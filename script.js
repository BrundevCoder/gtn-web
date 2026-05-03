// screens
const rangeScreen = document.getElementById("modesScreen");
const mainGameScreen = document.getElementById("mainGameScreen");
const winScreen = document.getElementById("winScreen");
const loseScreen = document.getElementById("LoseScreen");

// inputs
const maxRangeInput = document.getElementById("range2Input");
const guessInput = document.getElementById("userGuessInput");

// buttons
const costumRangeStartButton = document.getElementById("startCustomRangeBtn");
const tryButton = document.getElementById("tryBtn");

// range buttons
const FiftyRangeButton = document.getElementById("50RangeBtn");
const hundredRangeButton = document.getElementById("100RangeBtn");
const twoHundredRangeButton = document.getElementById("250RangeBtn");

// displays
const tipsDisplay = document.getElementById("tipsDisplay");
const triesDisplay = document.getElementById("triesDisplay");
const livesDisplay = document.getElementById("livesDisplay");

// variables
let defaultColor = "#7187ff";
let wrongColor = "#e72929";
let winColor = "#d1a000";

let LIVES = NaN;
let maxNumber = 1;
let tries = 0;
let secretNumber = NaN;
let win = false;

// functions
function wrongScreenAnimation() {
  document.body.style.setProperty("--bg-color", wrongColor);

  setTimeout(() => {
    document.body.style.setProperty("--bg-color", defaultColor);
  }, 1250);
}

function winScreenAnimation() {
  document.body.style.setProperty("--bg-color", winColor);
}

function randomNumber(max) {
  return Math.floor(Math.random() * max)
}

function handleStartScreen() {
  // controll screens
  rangeScreen.classList.remove("active");
  mainGameScreen.classList.add("active");

  // disable buttons to prevent any bugs
  FiftyRangeButton.disabled = true;
  hundredRangeButton.disabled = true;
  twoHundredRangeButton.disabled = true;
  costumRangeStartButton.disabled = true;

  // get random number
  secretNumber = randomNumber(maxNumber);

  livesDisplay.innerText = String(LIVES);

  return;
}

function handleCustomRange() {
  let max = Number(maxRangeInput.value);

  if (max === 0 || max < 1) {
    alert("Max number needs to be positive and more than 0");
    return;
  }

  // set the max variable to the max given by the input
  maxNumber = max;
  LIVES = Math.floor(max / 6) + 5

  livesDisplay.innerText = String(LIVES);

  // controll screens
  handleStartScreen();

  return;
}

function resetGame() {
  // active btns again
  FiftyRangeButton.disabled = false;
  hundredRangeButton.disabled = false;
  twoHundredRangeButton.disabled = false;
  costumRangeStartButton.disabled = false;

  // reset variables
  LIVES = NaN;
  maxNumber = 1;
  tries = 0;
  secretNumber = NaN;
  win = false;

  // return to start screen
  winScreen.classList.remove("active");
  loseScreen.classList.remove("active");

  rangeScreen.classList.add("active");

  // set background to default
  setTimeout(() => {
    document.body.style.setProperty("--bg-color", defaultColor);
  }, 700);

  guessInput.value = "";

  return;
}

function winOrLoseControll(screenType) {
  if (screenType === "winScreen") {
    mainGameScreen.classList.remove("active");
    winScreen.classList.add("active");

    new Audio("sounds/win.mp3").play();

    setTimeout(() => {
      resetGame();
    }, 3000);

    return;
  }
  else if (screenType === "loseScreen") {
    mainGameScreen.classList.remove("active");
    loseScreen.classList.add("active");

    new Audio("sounds/lose.mp3").play();

    setTimeout(() => {
      resetGame();
    }, 3000);

    return;
  }

  return;
}

// main Game controlls functions
function controllGame() {
  if (win) return;
  let userGuess = Number(guessInput.value);

  tries++;

  // in case someone use this function the console and there is no Lives
  if (isNaN(LIVES)) {
    alert("Cannot continue with NaN Lives");
    console.error("NaN Lives")
    return;
  }

  if (userGuess < secretNumber) {
    tipsDisplay.innerText = `Greater than ${userGuess}`;
    wrongScreenAnimation();
  }
  else if (userGuess > secretNumber) {
    tipsDisplay.innerText = `Less than ${userGuess}`;
    wrongScreenAnimation();
  }
  else {
    // win
    win = true;
    winScreenAnimation()
    winOrLoseControll("winScreen");
    return;
  }

  LIVES--;

  livesDisplay.innerText = String(LIVES);

  if (LIVES <= 0) {
    winOrLoseControll("loseScreen");
  }

  triesDisplay.innerText = String(tries);

  guessInput.value = "";
  return;
}

// event listeners
costumRangeStartButton.addEventListener("click", handleCustomRange);

FiftyRangeButton.addEventListener("click", () => {
  maxNumber = 50;
  LIVES = 25;
  handleStartScreen();
});
hundredRangeButton.addEventListener("click", () => {
  maxNumber = 100;
  LIVES = 20;
  handleStartScreen();
});
twoHundredRangeButton.addEventListener("click", () => {
  maxNumber = 250;
  LIVES = 15;
  handleStartScreen();
});

tryButton.addEventListener("click", controllGame);
guessInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    controllGame();
  }
})
