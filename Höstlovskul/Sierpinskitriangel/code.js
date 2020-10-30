let iterationText = document.querySelector(".iterations");

let circles = [];
let startCircles = 0;
let corners = 3;
let toDegrees = Math.PI / 180;
let canvasSize = 800
let iterations = 0;

var config = {
    type: Phaser.AUTO,
    width: canvasSize,
    height: canvasSize,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var graphics;

function preload() {
    this.load.image('circle', 'img/circleWhite.png');
}

function create() {

    graphics = this.add.graphics();

    graphics.lineStyle(4, 0xffff00, 0);

    let a = new Phaser.Geom.Point(canvasSize / 2, canvasSize / 2);
    let radius = canvasSize / 2 - 10;

    graphics.strokeCircle(a.x, a.y, radius);


    let degrees = 360 / corners;
    let offset = -90;


    for (let i = 0; i < corners; i++) {
        let x = a.x + radius * Math.cos(((degrees * i) + offset) * toDegrees)
        let y = a.y + radius * Math.sin(((degrees * i) + offset) * toDegrees)
        let circleP = this.add.sprite(x, y, 'circle');
        circleP.setScale(0.002);
        circles.push(circleP);
        console.log(x + " " + y);
    }

    if (corners == 3) {
        circles[0].tint = Phaser.Display.Color.GetColor(255, 0, 0); //Red
        circles[1].tint = Phaser.Display.Color.GetColor(0, 255, 0); // Green
        circles[2].tint = Phaser.Display.Color.GetColor(0, 0, 255); // Blue
    }



    startCircles = circles.length;
}

// Creates two new circles every frame
function update() {

    if (iterations < 15000) {

        let positions1 = CalculatePos(circles[circles.length - 1].x, circles[circles.length - 1].y);
        let positions2 = CalculatePos(circles[circles.length - 2].x, circles[circles.length - 2].y);
        let newCircle1 = this.add.sprite(positions1[0], positions1[1], 'circle');
        let newCircle2 = this.add.sprite(positions2[0], positions2[1], 'circle');
        newCircle1.setScale(0.002);
        newCircle2.setScale(0.002);
        circles.push(newCircle1);
        circles.push(newCircle2);
        changeRGB();
        iterations++;
        iterationText.innerHTML = "Iterations: " + iterations * 2;
    }

}

// Calculates a position for a new circle
const CalculatePos = (lastX, lastY) => {
    let random = Math.floor(Math.random() * startCircles)

    let randomCircle = circles[random];

    let biggestX = 0;
    let biggestY = 0;

    let dx = 0;
    let dy = 0;

    if (randomCircle.x > lastX) {
        dx = randomCircle.x - lastX;
        biggestX = randomCircle.x;

    } else {
        dx = lastX - randomCircle.x;
        biggestX = lastX;
    }

    if (randomCircle.y > lastY) {
        dy = randomCircle.y - lastY;
        biggestY = randomCircle.y;

    } else {
        dy = lastY - randomCircle.y;
        biggestY = lastY;
    }

    let posX = biggestX - (dx / 2);
    let posY = biggestY - (dy / 2);

    return [posX, posY];
}

// Changes the color to the right RGB Color
function changeRGB() {

    if (corners == 3) {

        let distance = Phaser.Math.Distance.BetweenPoints(circles[0], circles[1]);
        let colorDistance = 255 + distance;

        let red = (distance - Phaser.Math.Distance.BetweenPoints(circles[circles.length - 1], circles[0])) / colorDistance;
        let green = (distance - Phaser.Math.Distance.BetweenPoints(circles[circles.length - 1], circles[1])) / colorDistance;
        let blue = (distance - Phaser.Math.Distance.BetweenPoints(circles[circles.length - 1], circles[2])) / colorDistance;

        circles[circles.length - 1].tint = Phaser.Display.Color.GetColor(red * 255, green * 255, blue * 255);

        let red2 = (distance - Phaser.Math.Distance.BetweenPoints(circles[circles.length - 2], circles[0])) / colorDistance;
        let green2 = (distance - Phaser.Math.Distance.BetweenPoints(circles[circles.length - 2], circles[1])) / colorDistance;
        let blue2 = (distance - Phaser.Math.Distance.BetweenPoints(circles[circles.length - 2], circles[2])) / colorDistance;

        circles[circles.length - 2].tint = Phaser.Display.Color.GetColor(red2 * 255, green2 * 255, blue2 * 255);
    } else {

        // circles[circles.length - 1].tint = Phaser.Display.Color.GetColor(255, 0, 0);
        // circles[circles.length - 2].tint = Phaser.Display.Color.GetColor(255, 0, 0);
    }

}