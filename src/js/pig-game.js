/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

(function () {

    const scores = [0,0];

    let roundScore = 0,
        activePlayer = 0;

    let gamePlaying = true;

    //DOM elements
    const diceDOM = document.querySelector('.dice'),
        player0DOM = document.querySelector(`.player-0-panel`),
        player1DOM = document.querySelector(`.player-1-panel`),
        name0DOM = document.getElementById('name-0'),
        name1DOM = document.getElementById('name-1'),
        score0DOM = document.getElementById(`score-0`),
        score1DOM = document.getElementById(`score-1`),
        current0DOM = document.getElementById('current-0'),
        current1DOM = document.getElementById('current-1');

    resetGame();

    document.querySelector('.btn-roll').addEventListener('click', function (e) {

        if(gamePlaying) {
            let dice = Math.floor(Math.random() * 6) + 1;

            diceDOM.style.display = 'block';
            diceDOM.src = `img/pig-game/dice-${dice}.png`;

            if (dice !== 1) {
                roundScore += dice;
                document.getElementById(`current-${activePlayer}`).textContent = roundScore;
            } else {
                nextPlayer();
            }
        }
    });

    document.querySelector('.btn-hold').addEventListener('click', function (e) {

        if(gamePlaying) {

            scores[activePlayer] += roundScore;
            document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

            if(scores[activePlayer] >= 10) {
                document.getElementById(`name-${activePlayer}`).textContent = 'Winner !!!';
                document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
                gamePlaying = false;
            } else {
                nextPlayer();
            }
        }
    });

    document.querySelector('.btn-new').addEventListener('click', resetGame);

    //functions

    function nextPlayer() {
        activePlayer = activePlayer ? 0 : 1;
        roundScore = 0;
        current0DOM.textContent = 0;
        current1DOM.textContent = 0;
        player0DOM.classList.toggle('active');
        player1DOM.classList.toggle('active');
        diceDOM.style.display = 'none';
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

        diceDOM.style.display = 'none';

        gamePlaying = true;
    }

})();