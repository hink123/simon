/*----- constants -----*/



/*----- app's state (variables) -----*/

var simonArr, userChoice, board;

/*----- cached element references -----*/

const allSquares = document.querySelectorAll('section div');
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
    board = {
        1: redSquare,
        2: greenSquare,
        3: blueSquare, 
        4: purpleSquare
    }
    

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

// maybe recurssion for time interval, remove iteration and pass in i = 0
function displayPicks(i = 0) {
    simonArr = [1, 2, 4];
    let pick = simonArr[i];
    setTimeout(function() {
            if(i === simonArr.length) {
                board[simonArr[i - 1]].style.opacity = 1;
                return;
            }
        redSquare.style.opacity = 1;
        greenSquare.style.opacity = 1;
        blueSquare.style.opacity = 1;
        purpleSquare.style.opacity = 1;
        
        board[pick].style.opacity = 0.5;
        displayPicks(i + 1);
    }, 1000)
}
