/*jshint esversion: 6 */
'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;

const field = document.querySelector(".game__field");
const fieldRact = field.getBoundingClientRect();
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const gameBtn = document.querySelector('.game__button');

let started = false;
let score = 0;
let timer = undefined; // *게임이 시작되지 않으면 없다가 시작되면 타이머를 시작하도록. 

gameBtn.addEventListener('click', () => {
    if(started){
        stopGame();
    } else {
        startGame();
    }
    started = !started;
})

function stopGame(){
  
}
function startGame(){
    initGame();
    showStopBtn();
    showTimerAndScore();
}
function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function showStopBtn() {
    const icon = gameBtn.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function initGame() {
    //벌레와 당근을 생성하여 field에 추가해준다. 
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png');
}

function addItem(className, count, imgPath) {
const x1 = 0;
const y1 = 0;
const x2 = fieldRact.width - CARROT_SIZE;
const y2 = fieldRact.height - CARROT_SIZE;

for(let i = 0; i < count; i++){
const item = document.createElement('img');
item.setAttribute('class', className);
item.setAttribute('src', imgPath);
item.style.position = 'absolute';
const x = randomNumber(x1, x2);
const y = randomNumber(y1, y2);
item.style.left = `${x}px`;
item.style.top = `${y}px`;
field.appendChild(item);    
}
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
