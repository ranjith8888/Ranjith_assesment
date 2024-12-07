const colors = ["green", "red", "yellow", "blue"];
let gameSequence = [];
let userSequence = [];
let level = 0;

const startButton = document.getElementById("start-btn");
const colorBoxes = document.querySelectorAll(".color-box");

function playSound(color) {
  console.log(`Sounds/${color}.mp3`);
  const audio = new Audio(`Sounds/${color}.mp3`);
  audio.play();
}

function flashColor(color) {
  const box = document.getElementById(color);
  box.classList.add("active");
  playSound(color);
  setTimeout(() => box.classList.remove("active"), 500);
}

function nextSequence() {
  userSequence = [];
  level++;
  document.querySelector("h1").textContent = `Level ${level}`;
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  gameSequence.push(randomColor);
  gameSequence.forEach((color, index) => {
    setTimeout(() => flashColor(color), (index + 1) * 1000);
  });
}

function checkSequence(index) {
  if (userSequence[index] !== gameSequence[index]) {
    document.querySelector("h1").textContent = "Game Over! Press Start to Retry";
    gameSequence = [];
    level = 0;
    return;
  }

  if (userSequence.length === gameSequence.length) {
    setTimeout(nextSequence, 1000);
  }
}

colorBoxes.forEach(box => {
  box.addEventListener("click", () => {
    const color = box.id;
    userSequence.push(color);
    flashColor(color);
    playSound(color);
    checkSequence(userSequence.length - 1);
  });
});

startButton.addEventListener("click", () => {
  gameSequence = [];
  userSequence = [];
  level = 0;
  nextSequence();
});
