/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
(function () {
  const scores = [0, 0];
  let roundScore = 0,
      activePlayer = 0,
      lastDice = 0,
      winScore = 100;
  let gamePlaying = true; //DOM elements

  const dice0DOM = document.getElementById('dice-0'),
        dice1DOM = document.getElementById('dice-1'),
        player0DOM = document.querySelector(`.player-0-panel`),
        player1DOM = document.querySelector(`.player-1-panel`),
        name0DOM = document.getElementById('name-0'),
        name1DOM = document.getElementById('name-1'),
        score0DOM = document.getElementById(`score-0`),
        score1DOM = document.getElementById(`score-1`),
        current0DOM = document.getElementById('current-0'),
        current1DOM = document.getElementById('current-1'),
        wivScore = document.getElementById('win-score_current');
  resetGame();
  document.querySelector('.btn-roll').addEventListener('click', function (e) {
    if (gamePlaying) {
      let dice0 = Math.floor(Math.random() * 6) + 1;
      let dice1 = Math.floor(Math.random() * 6) + 1;
      dice0DOM.style.display = 'block';
      dice1DOM.style.display = 'block';
      dice0DOM.src = `img/pig-game/dice-${dice0}.png`;
      dice1DOM.src = `img/pig-game/dice-${dice1}.png`;

      if (dice0 === 1 || lastDice === dice0 === 6 || dice1 === 1) {
        nextPlayer();
      } else {
        roundScore += dice0 + dice1;
        lastDice = dice0;
        document.getElementById(`current-${activePlayer}`).textContent = roundScore;
      }
    }
  });
  document.querySelector('.btn-hold').addEventListener('click', function (e) {
    if (gamePlaying) {
      scores[activePlayer] += roundScore;
      document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

      if (scores[activePlayer] >= winScore) {
        document.getElementById(`name-${activePlayer}`).textContent = 'Winner !!!';
        document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
        gamePlaying = false;
      } else {
        nextPlayer();
      }
    }
  });
  document.querySelector('.btn-new').addEventListener('click', resetGame);
  document.querySelector('#win-score_set').addEventListener('click', function (e) {
    winScore = +document.querySelector('#win-score_input').value;
    wivScore.innerHTML = winScore;
  }); //functions

  function nextPlayer() {
    activePlayer = activePlayer ? 0 : 1;
    roundScore = 0;
    lastDice = 0;
    current0DOM.textContent = 0;
    current1DOM.textContent = 0;
    player0DOM.classList.toggle('active');
    player1DOM.classList.toggle('active');
    dice0DOM.style.display = 'none';
    dice1DOM.style.display = 'none';
  }

  function resetGame() {
    player0DOM.classList.add('active');
    player1DOM.classList.remove('active');
    player0DOM.classList.remove('winner');
    player1DOM.classList.remove('winner');
    score0DOM.textContent = 0;
    score1DOM.textContent = 0;
    current0DOM.textContent = 0;
    current1DOM.textContent = 0;
    name0DOM.textContent = 'Player 1';
    name1DOM.textContent = 'Player 2';
    dice0DOM.style.display = 'none';
    dice1DOM.style.display = 'none';
    wivScore.innerHTML = winScore;
    gamePlaying = true;
    scores[0] = scores[1] = 0;
    roundScore = 0;
    activePlayer = 0;
    lastDice = 0;
  }
})();