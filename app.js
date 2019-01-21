/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
//Events are notifications that are sent to notify our code notify that an event happened. 

//function that is passed in another function as the argument is called callback function. 
//document.querySelector('.btn-roll').addEventListener('click', btn);
//we can also add an anonymous function

var scores, dice, groundscore, gamePlaying;
//intilialize the game
init();


document.querySelector('.btn-roll').addEventListener('click', function (){
	if(gamePlaying){
		//1. random number 
		var dice = Math.floor(Math.random() * 6) + 1;
		//2. display the result
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';

		//3. update the round score only if the rolled number != 1
		if (dice !== 1){
			//Add score
			roundscore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundscore;
		} else {
			nextPlayer();
		}
	}
});


document.querySelector('.btn-hold').addEventListener('click', function(){
	if(gamePlaying){
			//Add currentsore to global score
			scores[activePlayer] += roundscore;

			//Update the UI.
			document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

			//to check if the player won the game.
			if(scores[activePlayer] >= 20){
				document.querySelector("#name-" + activePlayer).textContent = 'Winner!';
				document.querySelector('.dice').style.display = 'none';
				document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('winner');
				gamePlaying = false;
			} else {	
			//Next Player
			nextPlayer();
			}
	   }
});

function nextPlayer(){
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundscore = 0;
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
		
	//removing , changin and adding classes.
	//document.querySelector('.player-0-panel').classList.remove('active');
	//document.querySelector('.player-1-panel').classList.add('active');
	//Use toggle instead
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	document.querySelector('.dice').style.display = 'none';
	//Dont repeat yourself principle should be applied
}

//Starts the game
function init(){
	scores = [0,0];
	roundscore = 0;
	activePlayer = 0;
	gamePlaying = true;
	document.querySelector('.dice').style.display = 'none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById("name-0").textContent = 'Player 1';
	document.getElementById("name-1").textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');

}

document.querySelector('.btn-new').addEventListener('click', init);