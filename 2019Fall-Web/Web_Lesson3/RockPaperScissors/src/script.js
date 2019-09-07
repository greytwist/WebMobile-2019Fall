/* Declare listenerss*/
let button = document.getElementsByClassName("button");

/* Use this object to standardize values, like an enum*/
const attack = {
    ROCK: 'ROCK',
    PAPER: 'PAPER',
    SCISSORS: 'SCISSORS'
};

/* Will gen random pick for computer*/
function computerChoose() {

    /* Gen randome flaot from 0 to 1*/
    let randomCompChoice = Math.random();
    let choice = "?"; /* Set default error state*/
    /* Requires upwards, can check for less than and greater than for more saftey in the future.*/
    if (randomCompChoice < 0.33) {
        choice = attack.ROCK;
    } else if (randomCompChoice <= 0.66) {
        choice = attack.PAPER;
    } else if (randomCompChoice <= 1) {
        choice = attack.SCISSORS;
    } else {
        /* Should not end up here but in the event .random() behavior changes before we can update
        we need to handle correctly.*/
        choice = "?";
        throw new Error('Illegal state choice for player 2');
    }

    return choice;
}

function compare(player1Choice, player2Choise) {
    /* Uncomment the line below in the event that we need to check what is happening internally
       I don't know how to properly set a log level
        console.log("Player1:" + player1Choice + "\t" + "Player2:" + player2Choise); */

    switch (true) {
        case  player1Choice === attack.ROCK && player2Choise === attack.ROCK: {
            console.log("TIE!");
            break;
        }
        case  player1Choice === attack.ROCK && player2Choise === attack.PAPER: {
            console.log("Player 2 Wins");
            break;
        }
        case  player1Choice === attack.ROCK && player2Choise === attack.SCISSORS: {
            console.log("Player 1 Wins");
            break;
        }
        case  player1Choice === attack.PAPER && player2Choise === attack.ROCK: {
            console.log("Player 1 Wins");
            break;
        }
        case  player1Choice === attack.PAPER && player2Choise === attack.PAPER: {
            console.log("TIE!");
            break;
        }
        case  player1Choice === attack.PAPER && player2Choise === attack.SCISSORS: {
            console.log("Player 2 Wins");
            break;
        }
        case  player1Choice === attack.SCISSORS && player2Choise === attack.ROCK: {
            console.log("Player 2 Wins");
            break;
        }
        case  player1Choice === attack.SCISSORS && player2Choise === attack.PAPER: {
            console.log("Player 1 Wins");
            break;
        }
        case  player1Choice === attack.SCISSORS && player2Choise === attack.SCISSORS: {
            console.log("TIE!");
            break;
        }
        default: {
            throw new Error('Attack for players is not defined')
        }
    }
}

for (let i = 0; i < button.length; i++) {
    /* Baseline event loop "Game state loop"   */


    button[i].addEventListener('click', function() {
        let computerSelection = computerChoose();

        switch (this.innerHTML) {
            case "Rock": {
                compare(attack.ROCK, computerSelection);
                break;
            }
            case "Paper": {
                compare(attack.PAPER, computerSelection);
                break;
            }
            case "Scissors": {
                compare(attack.SCISSORS, computerSelection);
                break;
            }
            default: {
                throw new Error('Attack for player 1 is not defined');
            }
        }
    });
}





