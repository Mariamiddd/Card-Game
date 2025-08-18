const gameBoard = document.getElementById('game-board');
const timerDisplay = document.getElementById('time');
let firstCard = null;
let secondCard = null;
let lockBoard = false;  
let time = 0;
let timer;

const values = [];
for (let i= 1; i<=20; i++) {
    values.push(i);
    values.push(i); // Duplicate each value for matching pairs
}

//shuffle the values
values.sort(() => Math.random() - 0.5); // Randomly shuffle the array values 

// // add event listener to the card click
// function handleCardClick(event) {

// Create card elements
values.forEach((num) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = num;
    card.textContent = num; // Display the number on the card
    gameBoard.appendChild(card);
    // card.addEventListener('click', handleCardClick);
});

// Step 4: Timer start
timer = setInterval(() => {
  time++;
  timerDisplay.textContent = time;
}, 1000);


console.log("js loaded");