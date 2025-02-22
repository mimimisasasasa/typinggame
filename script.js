
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
let words = [];
let difficulty = "easy"; // デフォルトはイージー

//Supabase の接続情報（あなたのプロジェクトURL & APIキーを入力）
const SUPABASE_URL = "https://iizoiacvhtzprxuykkzk.supabase.co";  // ← ここを自分のURLに変更
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlpem9pYWN2aHR6cHJ4dXlra3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwNTM4ODksImV4cCI6MjA1NTYyOTg4OX0.cRod-qhaTlG3a7i0_teZBSP40g0avB5axz0autlN4TQ";  // ← ここを自分のAPIキーに変更

// Supabase クライアントを作成
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// Supabase からワードを取得
async function loadWords() {
    // const { data, error } = await supabase
    //     .from("words")
    //     .select("word")
    //     .eq("difficulty", difficulty);// 難易度に応じたワードを取得
    const { data, error } = await supabase
        .from("typing2")
        .select("word")
        .eq("difficulty", difficulty);// 難易度に応じたワードを取得
    if (error) {
        console.error("データ取得失敗:", error);
        return;
    }

    words = data.map(row => row.word);
    newWord();
}

// ランダムなワードを取得
function getRandomWord() {
    if (words.length === 0) return "loading...";
    return words[Math.floor(Math.random() * words.length)];
}

// ゲーム開始時にワードを読み込む
document.addEventListener("DOMContentLoaded", () => {
    loadWords();
    console.log(words);
});


document.body.style.backgroundImage = "url('haikei_hanagara.png')";
document.body.style.backgroundSize = "auto 120%"; // 高さを120%に拡大
document.body.style.backgroundPosition = "center bottom";
document.body.style.backgroundRepeat = "repeat";

document.getElementById("start-button").addEventListener("click", async () => {
    console.log("スタートボタンが押されました");

    difficulty = document.getElementById("difficulty-select").value;
    
    await loadWords(); // ワードを取得
    if (words.length === 0) {
        console.error("ワードリストが空です。データベースを確認してください。");
        return; // ゲームを開始しない
    }

    startGame(); // 確実にワードを取得してからゲームを開始
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
    inputField.value = "";
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


restartButton.addEventListener("click", startGame);

document.addEventListener("DOMContentLoaded", () => {
    startScreen.style.display = "block";
    gameScreen.style.display = "none";
    gameOverScreen.style.display = "none";
});


