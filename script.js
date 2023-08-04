//Gameboard module
const gameboard = (() => {
     const gameboard = [9];
     return {gameboard};

})();

//Controls Flow of Game module
const flow = (() => {

})();

//Players Factory Function
const players = () => {
    let marker;
    const chooseMarker = mark => {
        marker = mark;
    };
    const placeMarker = id => {
        const quad = document.getElementById(id);
        if (marker != undefined) {
            quad.innerHTML = marker; 
            if (quad.classList.contains('mark-X')) {
                quad.classList.remove('mark-X');
            } 
            if (quad.classList.contains('mark-O')) {
                quad.classList.remove('mark-O');
            }
            quad.classList.add(`mark-${marker}`);
            gameboard[parseInt(id)] = marker;
        }
    }
    return {chooseMarker, placeMarker}
}
//Initialize Players
const player1 = players();
const player2 = players();

//Event listeners for choice
const choiceX = document.querySelector('#X')
choiceX.addEventListener('click', () => {
    player1.chooseMarker('X')
})
const choiceO = document.querySelector('#O')
choiceO.addEventListener('click', () => {
    player1.chooseMarker('O')
})

//Event listener to place marker
const board = document.querySelectorAll('.quadrant')
board.forEach(quad => {
    quad.addEventListener('click', () => {
        const id = quad.getAttribute('id');
        player1.placeMarker(id);
    });
});

