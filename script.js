//Gameboard module
let playing = '';
const game = (() => {
    const gameboard = [null]; //Gameboard
    let gamePlaying = () => { //Check is the game is playing
        let placed;
        for (let i = 1; i <= 9; ++i) {
            if (gameboard[i] != undefined) {
                placed = 'true';
                break;
            }
        }
        if (placed == 'true') {
            playing = 'true';
        }
    }
    return {gameboard, gamePlaying};
})();

//Get Winner Module 
const checkWinner = (() => {
    const check = () => {
        if (playing == 'true') {
            if (game.gameboard[1] == 'X' && game.gameboard[2] == 'X' && game.gameboard[3] == 'X' || game.gameboard[1] == 'O' && game.gameboard[2] == 'O' && game.gameboard[3] == 'O') {
                playing = 'false';
                console.log('winner');
        }
        }
    }
    return {check};
})();

//Players Factory Function
const players = () => {
    let marker;
    const chooseMarker = mark => {
        marker = mark;
    };
    const placeMarker = id => {
        const quad = document.getElementById(id);
        if (game.gameboard[parseInt(id)] == null) { // Logic so marker can't be placed where another marker is
            if (marker != undefined) {
                quad.innerHTML = marker; 
                quad.classList.add(`mark-${marker}`);
                game.gameboard[parseInt(id)] = marker;
            }
        }
    }
    return {chooseMarker, placeMarker}
}
//Initialize Players
const player1 = players();
const player2 = players();

//Controls Flow of Game module
let playerTurn = 'player1';
const flow = (() => {
    const turn = (player) => {
        if (player == 'player1') {
            playerTurn = 'player1'
        } else {
            playerTurn = 'player2'
            comp.compChoice();
        }
    }
    return {turn};
})();

//Event listeners for choice
const choiceX = document.querySelector('#X');
choiceX.addEventListener('click', () => {
    player1.chooseMarker('X');
    player2.chooseMarker('O');
})
const choiceO = document.querySelector('#O');
choiceO.addEventListener('click', () => {
    player1.chooseMarker('O');
    player2.chooseMarker('X');
})

//Event listener to place marker
const board = document.querySelectorAll('.quadrant');
board.forEach(quad => {
    quad.addEventListener('click', () => {
        if (playing == '' || playing == 'true') {
            const id = quad.getAttribute('id');
            if (playerTurn == 'player1') { //Check if player 1 turn
                player1.placeMarker(id); 
                game.gamePlaying('true'); //Sets game to playing
                checkWinner.check(); //Check if won
                let count = 0;
                for (let i = 0; i < 9; ++i) { //If space avaible on board gets comp choice
                    if (game.gameboard[i] == null) {
                        ++count;
                    }
                }
                if (count > 1 && playing == 'true') {
                    flow.turn('player2');
                }
            }
        }   
    });
});

//Computer choice module
const comp = (() => {
    const compChoice = () => {
        let placed = 'false';
        while (placed == 'false') {
            let comp = Math.floor(Math.random() * (9) + 1);
            if (game.gameboard[comp] == null) {
                player2.placeMarker(comp.toString());
                placed = 'true';
                flow.turn('player1');
                checkWinner.check();
            }
        }
    }
    return {compChoice};
})();

