const gameBoard = document.getElementById('game-board');
const timerDisplay = document.querySelector('.time');
const restartBtn = document.querySelector('.restart');
const victoryMessage = document.querySelector('.victory-message');
const bestTimeDiv = document.querySelector('.bestTime');

let firstCard = null;
let secondCard = null;
let lockBoard = false;  
let time = 0;
let timer;

let values = [];

function generateValues() {
  values = [];
for (let i= 1; i<=20; i++) {
    values.push(i);
    values.push(i); // Duplicate each value for matching pairs
}

//shuffle the values
values.sort(() => Math.random() - 0.5); // Randomly shuffle the array values 
}

function createCards() {
  gameBoard.innerHTML = ""; // clear the board
     // Create card elements
values.forEach((num) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = num;
    card.textContent = num; // Display the number on the card
    gameBoard.appendChild(card);
    card.addEventListener('click', handleCardClick);
});
}

// // add event listener to the card click
function handleCardClick(event) {
  if (lockBoard) return; // Prevent further clicks if the board is locked
  const clickedCard = event.target;
  if (clickedCard === firstCard) return; // Ignore if the same card is clicked again

  clickedCard.classList.add('flipped'); // Add a class to show the card is flipped
  if (!firstCard) {
    firstCard = clickedCard; // Set the first card
    return;
  }
  secondCard = clickedCard; // Set the second card
  lockBoard = true; // Lock the board to prevent further clicks
  checkForMatch(); // Check if the two cards match
}

function checkForMatch() {
  const isMatch = firstCard.dataset.value === secondCard.dataset.value; // comppare two cards 
  if (isMatch) {
    //If they match, keep them flipped
    firstCard.removeEventListener('click', handleCardClick);
    firstCard.classList.add('matched');
    secondCard.removeEventListener('click', handleCardClick);
    secondCard.classList.add('matched');
    resetBoard();

  } else {
    //If they dont match, flip them back after a delay
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetBoard();
    }, 1000); // Delay of 1 second before flipping back 
    
  }
  }
function resetBoard() {
  [firstCard, secondCard] = [null, null]; // Reset the first and second card variables
  lockBoard = false; // Unlock the board to allow further clicks
}

function startTimer() {
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  time++;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  if (gameBoard.querySelectorAll('.matched').length === values.length) {
    clearInterval(timer);
    victoryMessage.textContent = `🎉 You won in ${minutes}:${seconds.toString().padStart(2, '0')}!`   ;
    saveBestScore(time);
  }
}


function restartGame() {
  clearInterval(timer);     // stop old timer
  time = 0;
  timerDisplay.textContent = "0:00";
  victoryMessage.textContent = "";
  [firstCard, secondCard, lockBoard] = [null, null, false];

  generateValues();
  createCards();  
  startTimer();

  //keep showing best record
  const bestScore = localStorage.getItem("bestScore");
  if (bestScore) {
    bestTimeDiv.textContent = `Record: ${formatTime(parseInt(bestScore))}`; 
  }
}
function saveBestScore(currentTime) {
  const best = localStorage.getItem("bestScore");
  if (!best || currentTime < best) {
    localStorage.setItem("bestScore", currentTime);
    bestTimeDiv.textContent = `Record: ${formatTime(currentTime)}`;
  }
}
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
// Setup game
restartBtn.addEventListener('click', restartGame);
generateValues();
createCards();
startTimer();

// Show saved best score
const bestScore = localStorage.getItem("bestScore");
if (bestScore) {
  bestTimeDiv.textContent = `Record: ${formatTime(parseInt(bestScore))}`;
}
