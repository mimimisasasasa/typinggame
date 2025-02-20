const words = ["apple", "banana", "cherry", "dog", "elephant", "flower", "guitar", "house", "island", "jungle"];
const wordDisplay = document.getElementById("word-display");
const inputField = document.getElementById("input-field");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const timeBar = document.getElementById("time-bar");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const gameOverScreen = document.getElementById("game-over-screen");
const finalScoreDisplay = document.getElementById("final-score");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
let score = 0;
let currentWord = "";
let timeLeft = 10;
let timer;

document.body.style.backgroundImage = "url('haikei_hanagara.png')";
document.body.style.backgroundSize = "auto 120%"; // 高さを120%に拡大
document.body.style.backgroundPosition = "center bottom";
document.body.style.backgroundRepeat = "repeat";


document.addEventListener("DOMContentLoaded", () => {
    startScreen.style.display = "block";
    gameScreen.style.display = "none";
    gameOverScreen.style.display = "none";
});

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function newWord() {
    currentWord = getRandomWord();
    wordDisplay.textContent = currentWord;
    inputField.value = "";
}

function startTimer() {
    timeLeft = 10;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    timeBar.style.width = "100%";
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}s`;
        timeBar.style.width = `${(timeLeft / 10) * 100}%`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            inputField.disabled = true;
            endGame();
        }
    }, 1000);
}

function startGame() {
    startScreen.style.display = "none";
    gameScreen.style.display = "block";
    gameOverScreen.style.display = "none";
    inputField.disabled = false;
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    newWord();
    startTimer();
}

function endGame() {
    gameScreen.style.display = "none";
    gameOverScreen.style.display = "block";
    finalScoreDisplay.textContent = `Final Score: ${score}`;
}

inputField.addEventListener("input", () => {
    if (inputField.value === currentWord) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        newWord();
        startTimer();
    }
});

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);

document.addEventListener("DOMContentLoaded", () => {
    startScreen.style.display = "block";
    gameScreen.style.display = "none";
    gameOverScreen.style.display = "none";
});

