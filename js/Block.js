const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
const blockSize = 20;
const widthInBlocks = width / blockSize;
const heightInBlocks = height / blockSize;
let score = 0;

const intervalId = setInterval (function () {
    ctx.clearRect(0, 0, width, height);
    drawScore();
    snake.move();
    snake.draw();
    apple.draw();
    drawBorder();

   if(score > BestScoreTable) {
       BestScore();
       clearBord();
    } 

}, 100);

const drawBorder = function () {
    ctx.fillStyle = "Gray";
    ctx.fillRect(0, 0, width, blockSize);
    ctx.fillRect(0, height - blockSize, width, blockSize);
    ctx.fillRect(0, 0, blockSize, height);
    ctx.fillRect(width - blockSize, 0, blockSize, height);
};

const drawScore = function () {
    ctx.font = "20px Courier";
    ctx.fillStyle = "Black";
    ctx.fillText("Score: " + score, blockSize, blockSize);
    ctx.fillText("Best Score: " + BestScoreTable, 390, blockSize);
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
};

let BestScoreTable = localStorage.getItem("score");
        
const BestScore = function () {
    let BestScoreTable2 = localStorage.setItem("score", score);
    ctx.font = "20px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    if (BestScoreTable2 > score) {
        localStorage.setItem("score", score)
    }
};

const gameOver = function () {
    clearInterval(intervalId);
    ctx.font = "60px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over ", width / 2, height / 2);
};

const restartButton = function () {
    let button = `<button>Restart</button>`;

    let buttonStyle = $(button);

    buttonStyle.css ({
        position: "relative",
        bottom: "300px",
        padding: "0",
        background: "transparent",
        border: "none",
        outline: "none",
        cursor: "pointer",
        margin: "5px 10px",
        padding: "10px 15px",
        color: "white",
        background: "#315efb",
        transition: "0.3s"
    });

    $("body").append(buttonStyle);

    $(buttonStyle).on("click", function(){
        location.reload(true);
    });
};

let circle = function (x, y, radius, fillCircle) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fillCircle) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
};

const Block = function (col, row) {
    this.col = col;
    this.row = row;
};

Block.prototype.drawSquare = function (color) {
    let x = this.col * blockSize;
    let y = this.row * blockSize;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, blockSize, blockSize); 
};

Block.prototype.drawCircle = function (color) {
    let centerX = this.col * blockSize + blockSize / 2;
    let centerY = this.row * blockSize + blockSize / 2;
    ctx.fillStyle = color;
    circle (centerX, centerY, blockSize / 2, true);
};

Block.prototype.equal = function (otherBlock) {
    return this.col === otherBlock.col && this.row === otherBlock.row;
};

let head = new Block (3, 5);

const Snake = function () {
    this.segments = [
        new Block(19, 19),
        new Block(18, 19),
        new Block(17, 19)
    ];

    this.direction = "right";
    this.nextDirection = "right";
};

Snake.prototype.draw = function() {
    this.segments[0].drawSquare("Green")
    
    for (let i = 1; i < this.segments.length; i++) {

        if (i % 2 === 0 ) {
            this.segments[i].drawSquare("Blue");
        } else {
            this.segments[i].drawSquare("Orange")
        }
    };

};

Snake.prototype.move = function () {
    let head = this.segments[0]; 
    let newHead; 

    this.direction = this.nextDirection; 

    if (this.direction === "right") { 
        newHead = new Block(head.col + 1, head.row);
    } else if (this.direction === "down") {
        newHead = new Block(head.col, head.row + 1);
    } else if (this.direction === "left") {
        newHead = new Block(head.col - 1, head.row);
    } else if (this.direction === "up") {
        newHead = new Block(head.col, head.row - 1);
    }

    if (this.checkCollision(newHead)) {
        gameOver();
        restartButton()
        return;
    }

    this.segments.unshift(newHead);

    if (newHead.equal(apple.position)) {
        score++;
        apple.move();
    } else {
        this.segments.pop();
    }

    
};

Snake.prototype.checkCollision = function (head) {
    let leftCollision = (head.col === 0);
    let topCollision = (head.row === 0);
    let rightCollision = (head.col === widthInBlocks - 1);
    let bottomCollision = (head.row === heightInBlocks - 1);

    let wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;

    let selfCollision = false;

    for (let i = 0; i < this.segments.length; i++) {
        if (head.equal(this.segments[i])) {
            selfCollision = true;
        }
    }

    return wallCollision || selfCollision;
};

let directions = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
};

$("body").keydown(function (event) {
    let newDirection = directions[event.keyCode];
    if (newDirection !== undefined) {
        snake.setDirection(newDirection);
    }
});

Snake.prototype.setDirection = function (newDirection) {
    if (this.direction === "up" && newDirection === "down") {
        return;
    } else if (this.direction === "right" && newDirection === "left") {
        return;
    } else if (this.direction === "down" && newDirection === "up") {
        return;
    } else if (this.direction === "left" && newDirection === "right") {
        return;
    }

    this.nextDirection = newDirection;
};

let Apple = function () {
    this.position = new Block (10, 10);
};

Apple.prototype.draw = function () {
    this.position.drawCircle("rgb(80, 10, 134)");
};

Apple.prototype.move = function () {
    let randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
    let randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
    this.position = new Block(randomCol, randomRow);

    for (let i = 0; i < snake.segments.length; i++) {
        if (apple.position.equal(snake.segments[i])) {
            apple.move()
        }
    }

};

let snake = new Snake();
let apple = new Apple();