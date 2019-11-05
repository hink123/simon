/*----- constants -----*/

const SELECTED_SQUARE = 0.5;
const UNSELECTED_SQUARE = null;
const LOSE_MESSAGE = 'FAIL! Hit "PLAY" To Try Again';
const SOUNDS = {
    1: 'sounds/alien.wav',
    2: 'sounds/camera-click.wav',
    3: 'sounds/robot-drip.wav',
    4: 'sounds/zoom.wav',
    5: 'sounds/glitch-robot.wav',
    6: 'sounds/robot-sneeze.wav',
    fail: 'sounds/game-over.wav'
}
/*----- app's state (variables) -----*/

var simonArr, userChoice, board, pointer, level, running, numSquares, difficulty, time;
var  highScore = 0;

/*----- cached element references -----*/

const simonBoard = document.querySelector('section');
const firstSquare = document.getElementById('1');
const secondSquare = document.getElementById('2');
const thirdSquare = document.getElementById('3');
const fourthSquare = document.getElementById('4');
const fifthSquare = document.getElementById('5');
const sixthSquare = document.getElementById('6');
const playButton = document.querySelector('button');
const displayMessage = document.querySelector('h2.message');
const scoreTracker = document.querySelector('h2.score');
const allSquares = document.querySelectorAll('section div');

const player = new Audio();

/*----- event listeners -----*/

playButton.addEventListener('click', init);
simonBoard.addEventListener('click', userPicks);

/*----- functions -----*/


function init() {
    simonArr = [];
    userChoice = null; 
    difficulty = document.querySelector('input[name="difficulty"]:checked');
    setDifficulty(difficulty.value);
    board = {
        1: firstSquare,
        2: secondSquare,
        3: thirdSquare, 
        4: fourthSquare,
        5: fifthSquare,
        6: sixthSquare
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
    let randNum = Math.floor((Math.random() * numSquares) + 1)
    simonArr.push(randNum);
}

function displayPicks(i = 0) {
    let simonPick = simonArr[i];
    running = true;

    setTimeout(function() {
        // exits and resets last color
        if(i === simonArr.length) {
            board[simonArr[i - 1]].style.opacity = UNSELECTED_SQUARE;
            running = false;
            return;
        }
        // resets colors
        setTimeout(function() {
            allSquares.forEach(function(square) {
                square.style.opacity = UNSELECTED_SQUARE;
            })
        }, time/2)
        //highlights pick
        board[simonPick].style.opacity = SELECTED_SQUARE;
        //play sound
        playSound(simonPick);

        displayPicks(i + 1);
    }, time)
}

function userPicks(evt) {
    userChoice = evt.target;
    let userChoiceAttr = parseInt(userChoice.getAttribute('id'));
    
    if(displayMessage.textContent === LOSE_MESSAGE || userChoice.tagName !== 'DIV') {
        player.src = SOUNDS.fail;
        player.play();
        return;
    } 
    else if(!simonArr) {
        playSound(userChoiceAttr);
        return;
    } 
    // prevent clicking when displayPicks running
    else if (running) {
        return;
    } 
    else if(userChoiceAttr === simonArr[pointer]) {
        pointer += 1;
        playSound(userChoiceAttr);
        if(pointer === simonArr.length) {
            level += 1;
            displayMessage.textContent = `Level: ${level}`;
            return render();
        }
    } 
    else {
        player.src = SOUNDS.fail;
        player.play();
        if (highScore < level) {
            highScore = level;
            scoreTracker.textContent = `Current High Score: ${highScore}`;
        }
        return displayMessage.textContent = LOSE_MESSAGE; 
    }
}

function playSound(key) {
    player.src = SOUNDS[key];
        player.play();
}

function setDifficulty(value) {
    if(value === 'hard') {
        simonBoard.style.gridTemplateColumns = `repeat(3, 25vmin)`;
        fifthSquare.style.display = 'block';
        sixthSquare.style.display = 'block';
        numSquares = 6;
        time = 750;
    }
    else {
        simonBoard.style.gridTemplateColumns = `repeat(2, 25vmin)`;
        fifthSquare.style.display = 'none';
        sixthSquare.style.display = 'none';
        numSquares = 4;
        time = 1000;
    }
}


