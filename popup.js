const startBtn = document.getElementById("startBtn");
const timerStatus = document.getElementById("timerStatus");
const timerDuration = document.getElementById("timerDuration");
const timerDisplay = document.getElementById("timerDisplay");
const alarmSound = new Audio("alarm_sound.mp3");
let startTime = null;
let timerInterval = null;

function updateRemainingTime() {
  const minutes = parseInt(timerDuration.value) || 30;
  const elapsedTime = (Date.now() - startTime) / 1000 / 60;
  const remainingTime = minutes - elapsedTime;

  if (remainingTime <= 0) {
    timerDisplay.textContent = "Time's up!";
    clearInterval(timerInterval);
    alarmSound.play();
  } else {
    timerDisplay.textContent = `Time remaining: ${Math.floor(remainingTime)}m ${Math.floor((remainingTime * 60) % 60)}s`;
  }
}

startBtn.addEventListener("click", () => {
  const minutes = parseInt(timerDuration.value) || 30;
  chrome.alarms.create("pomodoroTimer", { delayInMinutes: minutes });
  startBtn.disabled = true;
  startTime = Date.now();
  timerInterval = setInterval(updateRemainingTime, 1000);
  timerStatus.textContent = `Timer started for ${minutes} minutes!`;
});

chrome.runtime.onMessage.addListener((request) => {
  if (request.type === "pomodoroAlarm") {
    startBtn.disabled = false;
    clearInterval(timerInterval);
    timerStatus.textContent = "";
  }
});
