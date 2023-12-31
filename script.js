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

let token;
let winner;
let checker = false;
//Get Winner Module 
const checkWinner = (() => {
    const check = () => {
        console.log(checker)
        if (playing == 'true') {
            if (game.gameboard[1] == 'X' && game.gameboard[2] == 'X' && game.gameboard[3] == 'X' || game.gameboard[1] == 'O' && game.gameboard[2] == 'O' && game.gameboard[3] == 'O') {
                if (checker) {
                    playing = 'false';
                    filter(1, 2, 3);
                }
                winner = token === game.gameboard[1] ? 0 : 1;
            }
            else if (game.gameboard[4] == 'X' && game.gameboard[5] == 'X' && game.gameboard[6] == 'X' || game.gameboard[4] == 'O' && game.gameboard[5] == 'O' && game.gameboard[6] == 'O') {
                if (!checker) {
                    playing = 'false';
                    filter(4, 5, 6);
                }
                winner = token === game.gameboard[4] ? 0 : 1;

            }
            else if (game.gameboard[7] == 'X' && game.gameboard[8] == 'X' && game.gameboard[9] == 'X' || game.gameboard[7] == 'O' && game.gameboard[8] == 'O' && game.gameboard[9] == 'O') {
                if (!checker) {
                    playing = 'false';
                    filter(7, 8, 9);
                }
                winner = token === game.gameboard[7] ? 0 : 1;

            }
            else if (game.gameboard[1] == 'X' && game.gameboard[4] == 'X' && game.gameboard[7] == 'X' || game.gameboard[1] == 'O' && game.gameboard[4] == 'O' && game.gameboard[7] == 'O') {
                if (!checker) {
                    playing = 'false';
                    filter(1, 4, 7);
                }
                winner = token === game.gameboard[1] ? 0 : 1;
            }
            else if (game.gameboard[2] == 'X' && game.gameboard[5] == 'X' && game.gameboard[8] == 'X' || game.gameboard[2] == 'O' && game.gameboard[5] == 'O' && game.gameboard[8] == 'O') {
                if (!checker) {
                    playing = 'false';
                    filter(2, 5, 8);
                }
                winner = token === game.gameboard[2] ? 0 : 1;
            }
            else if (game.gameboard[3] == 'X' && game.gameboard[6] == 'X' && game.gameboard[9] == 'X' || game.gameboard[3] == 'O' && game.gameboard[6] == 'O' && game.gameboard[9] == 'O') {
                if (!checker) {
                    playing = 'false';
                    filter(3, 6, 9);
                }
                winner = token === game.gameboard[3] ? 0 : 1;
            }
            else if (game.gameboard[1] == 'X' && game.gameboard[5] == 'X' && game.gameboard[9] == 'X' || game.gameboard[1] == 'O' && game.gameboard[5] == 'O' && game.gameboard[9] == 'O') {
                if (!checker) {
                    playing = 'false';
                    filter(1, 5, 9);
                }
                winner = token === game.gameboard[1] ? 0 : 1;
            }
            else if (game.gameboard[3] == 'X' && game.gameboard[5] == 'X' && game.gameboard[7] == 'X' || game.gameboard[3] == 'O' && game.gameboard[5] == 'O' && game.gameboard[7] == 'O') {
                if (!checker) {
                    playing = 'false';
                    filter(3, 5, 7);
                }
                winner = token === game.gameboard[3] ? 0 : 1;
            }
            else if (game.gameboard[1] != undefined && game.gameboard[2] != undefined && game.gameboard[3] != undefined && game.gameboard[4] != undefined && game.gameboard[5] != undefined && game.gameboard[6] != undefined && game.gameboard[7] != undefined && game.gameboard[8] != undefined && game.gameboard[9] != undefined) {
                playing = 'false'
                filterDraw();
                winner = 2;
            }
        }
    }
    return {check};
})();

//Displays Winner
function filter(id1, id2, id3) {
    let quad = document.getElementById(id1)
    quad.classList.add('quad-filter-win');
    quad = document.getElementById(id2)
    quad.classList.add('quad-filter-win');
    quad = document.getElementById(id3)
    quad.classList.add('quad-filter-win');
    for (let i = 1; i <= 9; ++i) {
        if (i == id1 || i == id2 || i == id3) {
        } else {
            let quad = document.getElementById(i)
            quad.classList.add('quad-filter');
        }
    }
}
//Displays draw
function filterDraw() {
    for (let i = 1; i <= 9; ++i) {
        let quad = document.getElementById(i)
        quad.classList.add('draw-filter');
    }
}

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
            let diff = document.querySelector('#diff').value;
            if (diff == 'impossible') {
                comp.imposChoice();
            } else {
                comp.easyChoice();
            }
        }
    }
    return {turn};
})();

//Event listeners for choice
const choiceX = document.querySelector('#X');
const choiceO = document.querySelector('#O');
choiceX.addEventListener('click', () => {
    if (playing == '') {
        token = 'X';
        if (choiceO.classList.contains('sel-o')) {
            choiceO.classList.remove('sel-o')
        }
        choiceX.classList.add('sel-x');
        player1.chooseMarker('X');
        player2.chooseMarker('O');
    }
})
choiceO.addEventListener('click', () => {
    token = 'O';
    if (playing == '') {
        if (choiceX.classList.contains('sel-x')) {
            choiceX.classList.remove('sel-x')
        }
        choiceO.classList.add('sel-o');
        player1.chooseMarker('O');
        player2.chooseMarker('X');
    }
})
//Select difficulty dropdown
function disableDropdown() {
    const dropdown= document.getElementById('diff');
    dropdown.disabled = true;
}
function undisableDropdown() {
    const dropdown= document.getElementById('diff');
    dropdown.disabled = false;
}

//Event listener to place marker
const board = document.querySelectorAll('.quadrant');
board.forEach(quad => {
    quad.addEventListener('click', () => {
        if (playing == '' || playing == 'true') {
            let id = quad.getAttribute('id');
            id = id.split('')
            id = id[1];
            if (game.gameboard[parseInt(id)] == undefined) {
                if (playerTurn == 'player1') { //Check if player 1 turn
                    player1.placeMarker(id); 
                    disableDropdown();
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
        }   
    });
});

//Computer choice module
const comp = (() => {
    const easyChoice = () => {
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
    const imposChoice = () => {
        let bestScore = -Infinity;
        let bestMove;
        for (let i = 1; i <= 9; ++i) {
            if (game.gameboard[i] == undefined) {
                if (token == 'X') {
                    game.gameboard[i] = 'O';
                } else {
                    game.gameboard[i] = 'X'
                }
                let score = minimax(game.gameboard[i], 0, false);
                console.log(score)
                game.gameboard[i] = undefined;
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        player2.placeMarker(bestMove.toString());
        placed = 'true';
        checker = false;
        flow.turn('player1');
        checkWinner.check();
    }
    return {easyChoice, imposChoice};
})();

const scores = [10, -10, 0];

function minimax(board, depth, maximizingPlayer) {
    checker = true;
    checkWinner.check()
    let result = winner;
    if (result !== undefined) {
        console.log(winner)
        return scores[winner];
    }
    if (maximizingPlayer) {
        let bestScore = -Infinity
        for (let i = 1; i <= 9; ++i) {
            if (game.gameboard[i] == undefined) {
                if (token == 'X') {
                    game.gameboard[i] = 'O';
                } else {
                    game.gameboard[i] = 'X'
                }
                let score = minimax(board, depth + 1, false);
                game.gameboard[i] = undefined;
                bestScore = Math.max(bestScore, score);
            }
        }
        return bestScore;          
    } else {
        let bestScore = Infinity
        for (let i = 1; i <= 9; ++i) {
            if (game.gameboard[i] == undefined) {
                game.gameboard[i] = token;
                let score = minimax(board, depth + 1, true);
                game.gameboard[i] = undefined;
                bestScore = Math.min(bestScore, score);
            }
        }
        return bestScore;
    }
}

const rstBtn = document.querySelector('#restart') 
rstBtn.addEventListener('click', Restart);
//Restart Button
function Restart() {
    for (let i = 1; i <= 9; ++i) {
        game.gameboard[i] = undefined;
        let quad = document.getElementById(i);
        quad.innerHTML = '';
        quad.classList.remove('quad-filter');
        quad.classList.remove('quad-filter-win');
        quad.classList.remove('draw-filter');
        quad.classList.remove('mark-X');
        quad.classList.remove('mark-O');
        playing = '';
        undisableDropdown();
    }
}

