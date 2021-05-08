/*jshint esversion: 6 */
'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 50;
const GAME_DURATION_SEC = 70;

const field = document.querySelector(".game__field");
const fieldRact = field.getBoundingClientRect();
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const gameBtn = document.querySelector('.game__button');
const gamePopUp = document.querySelector('.pop-up');
const gamePopUpText = document.querySelector('.pop-up__message');
const gamePopUpRefresh = document.querySelector('.pop-up__refresh');
var bgAudio = new Audio('sound/bg.mp3');
var bugAudio = new Audio('sound/bug_pull.mp3');
var carrotAudio = new Audio('sound/carrot_pull.mp3');
var alertAudio = new Audio('sound/alert.mp3');
var winAudio = new Audio('sound/game_win.mp3');

let started = false;
let score = 0;
let timer = undefined; // *게임이 시작되지 않으면 없다가 시작되면 타이머를 시작하도록. (setInterval과 clearinterval의 ID가 return;)
gameBtn.addEventListener('click', () => {
    gameBtn.style.visibility = 'visible';
    if(started){
        stopGame();
    } else {
        startGame();
    
    started = !started;
}   
})

field.addEventListener('click', onFieldClick)

function onFieldClick(e) {
    if(e.target.className == 'bug') {
        bugAudio.play();
        clearInterval(timer);
        showPopUpWithText('WTF🤯');
    } else {
    field.removeChild(e.target);
    carrotAudio();
    const leftcarrot = field.querySelectorAll('.carrot').length;
    gameScore.innerText = leftcarrot;
    if(leftcarrot===0){
        clearInterval(timer);
        winAudio.play();
        showPopUpWithText('Congratulations!🥳');
    }}
}

gamePopUpRefresh.addEventListener('click', () => {
    const icon = gameBtn.querySelector('.fa-stop');
    icon.classList.add('fa-play');
    icon.classList.remove('fa-stop');
    showGameButton();
    hideGamePopUp();
    startGame();
})

function hideGamePopUp() {
    gamePopUp.classList.add('pop-up--hide');
}

function showGameButton() {
    gameBtn.style.visibility = 'visible'
}
function stopGame(){
        bgAudio.pause();
        alertAudio.play();
        stopGameTimer();
        hideGameButton();
        showPopUpWithText('🤷🏻‍♂Play Again?🤷🏻‍♂️');
}
function startGame(){
    bgAudio.play();
    initGame();
    showStopBtn();
    showTimerAndScore();
    startGameTimer();
}

function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => { 
        if(remainingTimeSec<=0){
            clearInterval(timer);
            showPopUpWithText('🤷🏻‍♂️Play Again?🤷🏻‍♂️');
            return;
        }
        updateTimerText(--remainingTimeSec);
    },1000);
}

function stopGameTimer() {
    clearInterval(timer);
}
function updateTimerText(time) {
    const minutes = Math.floor(time/60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
}
function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
}

function showPopUpWithText(text) {
    gamePopUp.classList.remove('pop-up--hide');
    gamePopUpText.innerText= `${text}`;
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
    gameScore.innerText = CARROT_COUNT;
    field.innerHTML=''; 
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
