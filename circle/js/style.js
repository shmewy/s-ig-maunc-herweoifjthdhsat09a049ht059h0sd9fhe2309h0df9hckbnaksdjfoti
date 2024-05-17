var canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var c = canvas.getContext("2d");

var canvasHidden = document.querySelector(".canvas-web");
var menu = document.querySelector(".menu");
var difficulty = document.querySelector("#difficulty");

var color = ["#ffff01", "#ffc801", "#ff9000", "#ff6400", "#fe0000", "#c8007d", "#c8007d", "#6400a0", "#0011a9", "#005eb5", "#01a0c8", "#0eaf01", "#8bc800"];
var circleArray = [];

var keypress = document.addEventListener("keydown", handleStart);
let counter = 0;
let score = 0;

function submitClicked() {
    canvasHidden.classList.remove("canvas-web");
    menu.classList.add("canvas-web");
}

c.font = "50px Arial";
c.fillStyle = "white";
c.textAlign = "center";
c.fillText("Press Any Key to Start", canvas.width / 2, canvas.height / 2);

function handleStart() {
    counter++;
    if (counter <= 1) {
        animate();
        if (difficulty.value == 1) {
            generateRandomCircles(10);
        } else if (difficulty.value == 2) {
            generateRandomCircles(50);
        } else if (difficulty.value == 3) {
            generateRandomCircles(120);
        }
    }
}

function Circle(x, y, dx, dy, r, colorIndex) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.colorIndex = colorIndex;
    this.update = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, 2 * Math.PI); //(x,y,r,stAngle,endAngle)
        c.fillStyle = color[this.colorIndex];
        c.fill();
        c.closePath();
        if (this.x > window.innerWidth || this.x < 0) {
            this.x = Math.random() * window.innerWidth;
            this.dx = (Math.random() - 0.5) * 5;
            this.dy = (Math.random() - 0.5) * 5;
            (Math.random() > 0.5) ? this.y = 0 : this.y = window.innerHeight;
            this.colorIndex = parseInt(Math.random() * color.length);
            this.r = (Math.random() * 30) + 10;
        }
        if (this.y > window.innerHeight || this.y < 0) {
            this.y = Math.random() * window.innerHeight;
            this.dx = (Math.random() - 0.5) * 5;
            this.dy = (Math.random() - 0.5) * 5;
            (Math.random() > 0.5) ? this.x = 0 : this.x = window.innerWidth;
            this.colorIndex = parseInt(Math.random() * color.length);
            this.r = (Math.random() * 30) + 10;
        }
        this.y += this.dy;
        this.x += this.dx;
    }
}

function generateRandomCircles(difficultyValue) {
    for (var i = 0; i < difficultyValue; i++) {
        var x = window.innerWidth;
        var y = window.innerHeight;
        var dx = (Math.random() - 0.5) * 5;
        var dy = (Math.random() - 0.5) * 5;
        var r = (Math.random() * 30) + 10;
        var colorIndex = parseInt(Math.random() * color.length);
        circleArray.push(new Circle(x, y, dx, dy, r, colorIndex));
    }
}

var mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
};
window.addEventListener("mousemove", (e) => {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
});
var player = {
    radius: 20,
    increment: 0,
    finish: false
};

function animate() {
    c.beginPath();
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.closePath();
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
        var dist = Math.sqrt(Math.pow(circleArray[i].x - mouse.x, 2) + Math.pow(circleArray[i].y - mouse.y, 2));
        if (dist < player.radius + 10 && circleArray[i].r < player.radius) {
            if (Math.random() > 0.5) {
                circleArray[i].x = window.innerWidth;
            } else {
                circleArray[i].x = 0;
            }
            circleArray[i].y = Math.random() * window.innerHeight;
            player.increment = circleArray[i].r / 5;
            circleArray[i].r += player.radius + ((Math.random() - 0.5) * 20);
            score += circleArray[i].r; // Increase score by the radius of the eaten circle
        } else if (dist < player.radius + 10 && circleArray[i].r > player.radius) {
            player.finish = true;
        }
    }

    c.beginPath();
    c.arc(mouse.x, mouse.y, player.radius, 0, 2 * Math.PI);
    c.fillStyle = "white";
    c.fill();
    c.closePath();

    c.font = "30px Arial";
    c.fillStyle = "white";
    c.fillText("Score: " + score.toFixed(2), canvas.width - 150, 50); // Display score with two decimal points

    if (player.increment > 0) {
        player.radius += player.increment;
        player.increment = 0;
    }

    if (player.finish) {
        cancelAnimationFrame(animate);
        reset();
        return;
    }

    requestAnimationFrame(animate);
}

function reset() {
    c.font = "50px Arial";
    c.fillStyle = "red";
    c.textAlign = "center";
    c.fillText("Game Over", canvas.width / 2, (canvas.height / 2) - 100);
    c.fillText("Score: " + score.toFixed(2), canvas.width / 2, canvas.height / 2); // Display the score on the game over screen
    c.fillText("Press Any Key to Reset", canvas.width / 2, (canvas.height / 2) + 100);
    document.addEventListener("keydown", () => {
        document.location.reload(true);
    });
}
