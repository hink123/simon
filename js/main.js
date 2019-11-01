/*----- constants -----*/

const SELECTED_SQUARE = 0.5;
const UNSELECTED_SQUARE = 1;

/*----- app's state (variables) -----*/

var simonArr, userChoice, board, counter;

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
    displayMessage.textContent = "Good Luck!";
    render();
}

function render() {
    counter = 0;
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
            board[simonArr[i - 1]].style.opacity = null;
            return;
        }
        // resets colors
        redSquare.style.opacity = null;
        greenSquare.style.opacity = null;
        blueSquare.style.opacity = null;
        purpleSquare.style.opacity = null;
        
        //highlights pick
        board[pick].style.opacity = SELECTED_SQUARE;
        displayPicks(i + 1);
    }, 1000)
}

function userPicks(evt) {
    if(displayMessage.textContent === 'Fail') {
        return;
    }
    userChoice = evt.target;
    let userChoiceAttr = parseInt(userChoice.getAttribute('id'));
    if(userChoiceAttr === simonArr[counter]) {
        counter += 1;
        if(counter === simonArr.length) {
            return render();
        }
    } else {
        return displayMessage.textContent = 'Fail';
    }
    
}
