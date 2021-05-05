/*jshint esversion: 6 */
'use strict';
const field = document.querySelector(".game__field");
const fieldRact = field.getBoundingClientRect();
const carrotWidth = 80;
function initGame() {
    //벌레와 당근을 생성하여 field에 추가해준다. 
    addItem('carrot', 7, 'img/carrot.png');
    addItem('bug', 7, 'img/bug.png');
}


function addItem(className, count, imgPath) {
const x1 = 0;
const y1 = 0;
const x2 = fieldRact.width - carrotWidth;
const y2 = fieldRact.height - carrotWidth;

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


const startBtn = document.querySelector('.game__button');
startBtn.addEventListener('click', (e) => {
    const timer = document.querySelector('.game__timer');
    const score = document.querySelector('.game__score');
    timer.style.display = 'block';
    score.style.display = 'block';
    initGame();
})