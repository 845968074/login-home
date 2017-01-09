
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const spaceShip = {x: 135, y: 370};
const chips = [];
let isover = false;
ctx.fillRect(0, 0, 300, 400);
var rectMoved = self.setInterval("setMoved()", 50);
function buildSpaceShip() {
    ctx.fillStyle = "white";
    ctx.fillRect(spaceShip.x, spaceShip.y, 20, 20);
}
function buildRandom() {
    let x = Math.floor((Math.random() * 300) + 1);
    chips.push({x: x, y: 0});
    buildChips();
}
function buildChips() {
    for (let i = 0; i < chips.length; i++) {
        ctx.fillStyle = "red";
        ctx.fillRect(chips[i].x, 0, 20, 20);
    }
}
function setMoved() {
    document.onkeydown = keydownMove;

    buildSpaceShip();
    if (Math.floor((Math.random() * 100)) % 10 === 0) {

        buildRandom();
    }
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 300, 400);
    buildSpaceShip();
    for (let j = 0; j < chips.length; j++) {
        ctx.fillStyle = "red";
        chips[j].y = chips[j].y + 1;
        // console.log("j: "+j+" "+chips[j].y);
        ctx.fillRect(chips[j].x, chips[j].y, 20, 20);
    }

    isOver();
    if (isover === true) {
        console.log("space: " + spaceShip.x + "   " + spaceShip.y);

        clearInterval(rectMoved);
        drawText();

    }

}

function keydownMove(e) {

    if (e.keyCode === 37) {
        spaceShip.x -= 5;
        judgeShip();
    }
    if (e.keyCode === 39) {
        spaceShip.x += 5;
        judgeShip();
    }
    if (e.keyCode === 38) {
        spaceShip.y -= 5;
        judgeShip();
    }
    if (e.keyCode === 40) {
        spaceShip.y += 5;
        judgeShip();
    }
}
function isOver() {
    for (let i = 0; i < chips.length; i++) {
        if ((Math.abs(spaceShip.x - chips[i].x) <= 20) && (Math.abs(spaceShip.y - chips[i].y) <= 20)) {
            console.log(chips[i]);
            isover = true;
            break;
        }
    }
}
function judgeShip() {
    if (spaceShip.x < 0)
        spaceShip.x = canvas.width;
    if (spaceShip.x > canvas.width)
        spaceShip.x = 0;
    if (spaceShip.y < 0)
        spaceShip.y = 0;
    if (spaceShip.y > canvas.height - 20)
        spaceShip.y = canvas.height - 20;
}

function drawText() {
    let message = "Game Over!";
    ctx.font = "48px serif";
    ctx.fillStyle = 'blue';
    ctx.fillText(message, 10, canvas.height / 2);
}
