/*----- constants -----*/

const SELECTED_SQUARE = 0.5;
const UNSELECTED_SQUARE = 1;

/*----- app's state (variables) -----*/

var simonArr, userChoice, board;

/*----- cached element references -----*/

const allSquares = document.querySelectorAll('section div');
const redSquare = document.getElementById('1');
const greenSquare = document.getElementById('2');
const blueSquare = document.getElementById('3');
const purpleSquare = document.getElementById('4');
const playButton = document.querySelector('button');

/*----- event listeners -----*/

playButton.addEventListener('click', init);

/*----- functions -----*/


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

function displayPicks(i = 0) {
    let pick = simonArr[i];
    setTimeout(function() {
            // exits and resets last color
            if(i === simonArr.length) {
                board[simonArr[i - 1]].style.opacity = UNSELECTED_SQUARE;
                return;
            }
        // resets colors
        redSquare.style.opacity = UNSELECTED_SQUARE;
        greenSquare.style.opacity = UNSELECTED_SQUARE;
        blueSquare.style.opacity = UNSELECTED_SQUARE;
        purpleSquare.style.opacity = UNSELECTED_SQUARE;
        
        //highlights pick
        board[pick].style.opacity = SELECTED_SQUARE;
        displayPicks(i + 1);
    }, 1000)
}
