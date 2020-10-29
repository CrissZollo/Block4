let canvasX = 800;
let canvasY = 800;
let line;

var config = {
    type: Phaser.AUTO,
    width: canvasX,
    height: canvasY,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var graphics;

// Function y = A sin(Fx)

function preload() {

}

function create() {

    graphics = this.add.graphics();

    graphics.lineStyle(4, 0xffff00, 1);

    line = new Phaser.Geom.Line(0, 400, 800, 400)

    graphics.strokeLineShape(line);


}

function update() {

    let destination = line.setTo(400, 500, 800, 500);
    line = Phaser.Geom.Line.CopyFrom(line, destination)


    console.log(line)

}