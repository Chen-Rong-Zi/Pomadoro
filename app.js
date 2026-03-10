// Pomodoro timer logic
let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;
let isBreak = false;

function updateDisplay() {
  document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
  document.getElementById('mode').textContent = isBreak ? 'Break Time' : 'Focus Time';
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          // Timer completed
          clearInterval(timer);
          isRunning = false;
          isBreak = !isBreak;
          minutes = isBreak ? 5 : 25;
          updateDisplay();
          document.getElementById('alert').play();
          return;
        }
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }
      updateDisplay();
    }, 1000);
  }
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  minutes = isBreak ? 5 : 25;
  seconds = 0;
  updateDisplay();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  updateDisplay();
  
  document.getElementById('start').addEventListener('click', startTimer);
  document.getElementById('pause').addEventListener('click', pauseTimer);
  document.getElementById('reset').addEventListener('click', resetTimer);
});