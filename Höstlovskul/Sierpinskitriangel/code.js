let circles = [];
let startCircles = 0;


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

function preload() {
    this.load.image('circle', 'img/circle.png');
}

function create() {

    let circleP1 = this.add.sprite(window.innerWidth / 2, 10, 'circle');
    circleP1.setScale(0.003);
    circles.push(circleP1);
    let circleP2 = this.add.sprite(window.innerWidth / 4, window.innerHeight - 10, 'circle');
    circleP2.setScale(0.003);
    circles.push(circleP2);
    let circleP3 = this.add.sprite(window.innerWidth / 2 + window.innerWidth / 4, window.innerHeight - 10, 'circle');
    circleP3.setScale(0.003);
    circles.push(circleP3);
    // let circleP4 = this.add.sprite(window.innerWidth / 2 + window.innerWidth / 4, 10, 'circle');
    // circleP4.setScale(0.003);
    // circles.push(circleP4)


    startCircles = circles.length;
}

function update() {

    let positions = CalculatePos(circles[circles.length - 1].x, circles[circles.length - 1].y);
    let newCircle = this.add.sprite(positions[0], positions[1], 'circle');
    newCircle.setScale(0.002);
    circles.push(newCircle);
    console.log(circles)
}

const CalculatePos = (lastX, lastY) => {
    let random = Math.floor(Math.random() * startCircles)

    console.log(lastX + " " + lastY)


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