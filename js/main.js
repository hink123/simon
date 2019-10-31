/*----- constants -----*/



/*----- app's state (variables) -----*/

var simonArr, userChoice;

/*----- cached element references -----*/

const redSquare = document.getElementById('1');
const greenSquare = document.getElementById('2');
const blueSquare = document.getElementById('3');
const purpleSquare = document.getElementById('4');

/*----- event listeners -----*/



/*----- functions -----*/

init();

function init() {
    simonArr = [];
    userChoice = null; 

    render();
}

function render() {
    simonPick();
    displayPicks();
}

function simonPick() {
    let randNum = Math.floor((Math.random() * 4) + 1)
    simonArr.push(randNum);
}

