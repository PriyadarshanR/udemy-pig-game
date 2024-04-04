'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// Starting conditions
let currentScore, activePlayer, score, playing;

const init = function () {
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

init();

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);

    //   diceEl.attributes.src.textContent = `dice-${dice}.png`;
    diceEl.src = `dice-${dice}.png`;
    // Display the dice
    diceEl.classList.remove('hidden');

    // Check dice roll 1 if true switch player
    if (dice !== 1) {
      currentScore += dice;
    } else {
      currentScore = 0;
      switchPlayer();
    }
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  }
});

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  // toggling activeplayer
  activePlayer = activePlayer ? 0 : 1;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = 0;

    if (score[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.querySelector(`#score--${activePlayer}`).textContent =
        score[activePlayer];
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceEl.classList.add('hidden');
    } else {
      document.querySelector(`#score--${activePlayer}`).textContent =
        score[activePlayer];
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
