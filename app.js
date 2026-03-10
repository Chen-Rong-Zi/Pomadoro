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
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
});

// Theme toggle
let currentTheme = 'tokyo-dark';

function toggleTheme() {
  const body = document.body;
  if (currentTheme === 'tokyo-dark') {
    body.classList.remove('tokyo-dark');
    body.classList.add('blur-white');
    currentTheme = 'blur-white';
    document.querySelector('.theme-toggle').textContent = '🌙';
  } else {
    body.classList.remove('blur-white');
    body.classList.add('tokyo-dark');
    currentTheme = 'tokyo-dark';
    document.querySelector('.theme-toggle').textContent = '☀️';
  }
}

// New variables
let sessionCount = 0;
let totalSeconds = 0;
let currentSeconds = 0;

// Update progress bar
function updateProgress() {
  const progress = (currentSeconds / totalSeconds) * 100;
  document.querySelector('.progress-fill').style.width = `${progress}%`;
}

// Update session count
function updateSessionCount() {
  document.getElementById('session-count').textContent = `Sessions: ${sessionCount}`;
}

// Task management
function addTask() {
  const taskInput = document.getElementById('task-input');
  const taskText = taskInput.value.trim();
  
  if (taskText) {
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    
    const span = document.createElement('span');
    span.textContent = taskText;
    
    const button = document.createElement('button');
    button.textContent = 'X';
    button.addEventListener('click', () => {
      taskList.removeChild(li);
    });
    
    li.appendChild(span);
    li.appendChild(button);
    taskList.appendChild(li);
    
    taskInput.value = '';
  }
}

// Update timer display
function updateDisplay() {
  document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
  document.getElementById('mode').textContent = isBreak ? 'Break Time' : 'Focus Time';
  
  // Calculate current progress
  currentSeconds = (isBreak ? breakMinutes : focusMinutes) * 60 - (minutes * 60 + seconds);
  updateProgress();
}

// Initialize with settings
let focusMinutes = 25;
let breakMinutes = 5;

function applySettings() {
  focusMinutes = parseInt(document.getElementById('focus-time').value) || 25;
  breakMinutes = parseInt(document.getElementById('break-time').value) || 5;
  
  if (!isRunning) {
    minutes = isBreak ? breakMinutes : focusMinutes;
    seconds = 0;
    updateDisplay();
  }
  
  totalSeconds = (isBreak ? breakMinutes : focusMinutes) * 60;
}

// Play selected sound
function playAlert() {
  const soundSelect = document.getElementById('sound-select');
  const alertSound = new Audio(soundSelect.value);
  alertSound.play();
}

// Timer logic
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    
    // Apply current settings
    applySettings();
    
    timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          // Timer completed
          clearInterval(timer);
          isRunning = false;
          isBreak = !isBreak;
          
          if (!isBreak) {
            sessionCount++;
            updateSessionCount();
          }
          
          minutes = isBreak ? breakMinutes : focusMinutes;
          playAlert();
          updateDisplay();
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Apply default settings
  document.getElementById('focus-time').value = focusMinutes;
  document.getElementById('break-time').value = breakMinutes;
  
  updateDisplay();
  updateSessionCount();
  
  document.getElementById('start').addEventListener('click', startTimer);
  document.getElementById('pause').addEventListener('click', pauseTimer);
  document.getElementById('reset').addEventListener('click', resetTimer);
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
  document.getElementById('add-task').addEventListener('click', addTask);
  
  // Apply settings when changed
  document.getElementById('focus-time').addEventListener('change', applySettings);
  document.getElementById('break-time').addEventListener('change', applySettings);
  
  // Allow adding task with Enter key
  document.getElementById('task-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  });
});