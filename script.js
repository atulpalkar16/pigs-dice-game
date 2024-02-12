'use strict';

const dice = document.querySelector('.dice');
const currentScore0El = document.getElementById('current-score-0');
const currentScore1El = document.getElementById('current-score-1');
const score0El = document.getElementById('score-0');
const score1El = document.getElementById('score-1');

// buttons
const rollDice = document.querySelector('.btn-roll');
const holdBtn = document.querySelector('.btn-hold');
const resetGame = document.querySelector('.btn-newGame');

// variables
const MIN_VALUE= 1;
const MAX_VALUE= 6;
const MAX_POINTS= 100;
let randomNumber;
let activePlayer =0;
let currentScore= 0;
let playing = true;
let arrayScores = [0,0];

// functions

// Generates a random number between MIN_VALUE and MAX_VALUE
const randomNumberGenerator = function(){
    return Math.floor(Math.random()*(MAX_VALUE - MIN_VALUE +1 ) + MIN_VALUE);
}

// Switches the active player and resets the current score
const switchPlayer = function () {
    document.querySelector(`.player-${activePlayer}`).classList.remove('active-player');
    currentScore =0;
    activePlayer = activePlayer === 0 ? 1 :0;
    document.querySelector(`.player-${activePlayer}`).classList.add('active-player');
}


// Checks the result of the dice roll and updates the current score accordingly
function updateScore(){
    if(randomNumber !== 1){
        currentScore += randomNumber;
        document.getElementById(`current-score-${activePlayer}`).textContent = currentScore;
     }
     else{
         // If the dice is 1 then switch the player
         switchPlayer();
     }
}


// Initializes the game state when the "New Game" button is clicked
const init = function () {
    document.querySelector(`.name-${activePlayer}`). textContent = `PLAYER ${activePlayer + 1}`;
    document.querySelector(`.player-${activePlayer}`).classList.remove('winner-player');
    arrayScores = [0, 0];
    activePlayer =0;
    currentScore =0;
    playing = true;

    document.querySelector(`.player-0`).classList.add('active-player');
    document.querySelector(`.player-1`).classList.remove('active-player');
    
    currentScore0El.textContent = currentScore;
    currentScore1El.textContent = currentScore;
    score0El.textContent = currentScore;
    score1El.textContent = currentScore;
}


// Event Listners
resetGame.addEventListener('click', init);

dice.classList.add('hidden');


rollDice.addEventListener('click', function(){
    if(playing){

        randomNumber= randomNumberGenerator();
        console.log(randomNumber);
    
        dice.classList.remove('hidden');
        dice.src = `dice-${randomNumber}.png`;
    
        updateScore();
    }
});


holdBtn.addEventListener('click', function () {
    
    if(playing){
        arrayScores[activePlayer] += currentScore;
        document.getElementById(`score-${activePlayer}`).textContent = arrayScores[activePlayer];

        if(arrayScores[activePlayer] >= MAX_POINTS){
            // If the player reaches the Maximum points then end the game
            document.querySelector(`.player-${activePlayer}`).classList.add('winner-player');
            document.querySelector(`.name-${activePlayer}`). textContent = 'winner 🎉';
            dice.classList.add('hidden');
            playing = false;
        }
        else{
            // Switch to the other player if no winner yet
            switchPlayer();
        }
    }

});
