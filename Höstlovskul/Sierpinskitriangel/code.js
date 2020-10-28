let circles = [];
let startCircles = 0;
let corners = 3;
let toDegrees = Math.PI / 180;


var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var graphics;

function preload() {
    this.load.image('circle', 'img/circle.png');
}

function create() {

    graphics = this.add.graphics();

    graphics.lineStyle(4, 0xffff00, 0);

    let a = new Phaser.Geom.Point(window.innerWidth / 2, window.innerHeight / 2);
    let radius = window.innerHeight / 2 - 10;

    graphics.strokeCircle(a.x, a.y, radius);


    let degrees = 360 / corners;
    let offset = -90;


    for (let i = 0; i < corners; i++) {
        let x = a.x + radius * Math.cos(((degrees * i) + offset) * toDegrees)
        let y = a.y + radius * Math.sin(((degrees * i) + offset) * toDegrees)
        let circleP = this.add.sprite(x, y, 'circle');
        circleP.setScale(0.01);
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

function update() {

    let positions = CalculatePos(circles[circles.length - 1].x, circles[circles.length - 1].y);
    let newCircle = this.add.sprite(positions[0], positions[1], 'circle');
    newCircle.setScale(0.002);
    circles.push(newCircle);
    changeRGB();

}

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

function changeRGB() {

    if (corners == 3) {

        let distance = Phaser.Math.Distance.BetweenPoints(circles[0], circles[1]);
        let colorDistance = 255 + distance;

        let red = (distance - Phaser.Math.Distance.BetweenPoints(circles[circles.length - 1], circles[0])) / colorDistance;
        let green = (distance - Phaser.Math.Distance.BetweenPoints(circles[circles.length - 1], circles[1])) / colorDistance;
        let blue = (distance - Phaser.Math.Distance.BetweenPoints(circles[circles.length - 1], circles[2])) / colorDistance;

        circles[circles.length - 1].tint = Phaser.Display.Color.GetColor(red * 255, green * 255, blue * 255);
    }
}