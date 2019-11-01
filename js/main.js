/*----- constants -----*/

const SELECTED_SQUARE = 0.5;
const UNSELECTED_SQUARE = null;
const LOSE_MESSAGE = 'WRONG! Hit play to try again';

/*----- app's state (variables) -----*/

var simonArr, userChoice, board, pointer, level;

/*----- cached element references -----*/

const allSquares = document.querySelector('section');
const redSquare = document.getElementById('1');
const greenSquare = document.getElementById('2');
const blueSquare = document.getElementById('3');
const purpleSquare = document.getElementById('4');
const playButton = document.querySelector('button');
const displayMessage = document.querySelector('h2');

/*----- event listeners -----*/

playButton.addEventListener('click', init);
allSquares.addEventListener('click', userPicks);

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
    level = 1;
    displayMessage.textContent = `Level: ${level}`;
    render();
}

function render() {
    pointer = 0;
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
        setTimeout(function() {
            redSquare.style.opacity = UNSELECTED_SQUARE;
            greenSquare.style.opacity = UNSELECTED_SQUARE;
            blueSquare.style.opacity = UNSELECTED_SQUARE;
            purpleSquare.style.opacity = UNSELECTED_SQUARE;
        }, 1000)
        //highlights pick
        board[pick].style.opacity = SELECTED_SQUARE;
        displayPicks(i + 1);
    }, 2000)
}

function userPicks(evt) {
    userChoice = evt.target;
    let userChoiceAttr = parseInt(userChoice.getAttribute('id'));
    if(displayMessage.textContent === LOSE_MESSAGE || userChoice.tagName !== 'DIV') {
        return;
    }
    if(userChoiceAttr === simonArr[pointer]) {
        pointer += 1;
        if(pointer === simonArr.length) {
            level += 1;
            displayMessage.textContent = `Level: ${level}`;
            return render();
        }
    } else {
        return displayMessage.textContent = LOSE_MESSAGE;
    }
    
}
