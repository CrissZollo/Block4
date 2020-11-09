class Canvas {

    constructor() {
        this.canvas = document.querySelector("#canvas");
        this.draw = canvas.getContext("2d");

        canvas.width = 800;
        canvas.height = 800;

        this.amountOfRec = 40;

        this.recArr = [];
        this.colorArr = [];
        this.xPos = 0;
        this.yPos = 0;


        for (let i = 0; i < this.amountOfRec * this.amountOfRec; i++) {
            this.draw.fillStyle = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)} ,${Math.floor(Math.random() * 256)})`;
            // this.draw.fillStyle = `#704214`;
            this.colorArr.push(this.draw.fillStyle);
            if (i % this.amountOfRec == 0 && i != 0) {
                this.xPos = 0;
                this.yPos++;
            }
            this.draw.fillRect((canvas.width / this.amountOfRec) * this.xPos, (canvas.width / this.amountOfRec) * this.yPos, (canvas.width / this.amountOfRec), (canvas.height / this.amountOfRec));
            this.recArr.push([(canvas.width / this.amountOfRec) * this.xPos, (canvas.width / this.amountOfRec) * this.yPos, (canvas.width / this.amountOfRec), (canvas.height / this.amountOfRec)]);

            this.xPos++;
        }
    }

    fadeIn() {
        let target = 255;
        this.draw.clearRect(0, 0, canvas.width, canvas.height)
        for (let i = 0; i < this.recArr.length; i++) {

            let startRed = parseInt(this.colorArr[i][1] * this.colorArr[i][2] - 1);
            let startGreen = parseInt(this.colorArr[i][3] * this.colorArr[i][4] - 1)
            let startBlue = parseInt(this.colorArr[i][6] * this.colorArr[i][7] - 1);

            let red = (target - parseInt(this.colorArr[i][1] * this.colorArr[i][2] - 1)) / this.recArr.length;
            let green = (target - parseInt(this.colorArr[i][3] * this.colorArr[i][4] - 1)) / this.recArr.length;
            let blue = (target - parseInt(this.colorArr[i][6] * this.colorArr[i][7] - 1)) / this.recArr.length;

            this.draw.fillStyle = `rgb(${startRed = red},${startGreen += green},${startBlue += blue})`;
            this.draw.fillRect(this.recArr[i][0], this.recArr[i][1], this.recArr[i][2], this.recArr[i][3])
        }
        // setInterval(function () {
        //     clearInterval(interval);
        // }, 25);

    }

    clear(color) {
        this.draw.clearRect(0, 0, canvas.width, canvas.height)

        for (let i = 0; i < this.recArr.length; i++) {
            this.draw.fillStyle = color;
            this.draw.fillRect(this.recArr[i][0], this.recArr[i][1], this.recArr[i][2], this.recArr[i][3])
        }

    }

    fadeOut() {}

    scrollLeft() {}

    scrollRight() {}

    putPixle(x, y, color) {
        if (x >= 0 && x < this.amountOfRec && y >= 0 && y < this.amountOfRec) {
            let index = this.amountOfRec * y + x;
            this.draw.clearRect(this.recArr[index][0], this.recArr[index][1], this.recArr[index][2], this.recArr[index][3])
            this.draw.fillStyle = color;
            this.draw.fillRect(this.recArr[index][0], this.recArr[index][1], this.recArr[index][2], this.recArr[index][3])
        }
    }

    line() {}

    circle() {}
}

let data = new Canvas();



// data.fadeIn();
// data.clear("#FFFFFF");
// data.fadeOut();
// data.scrollLeft();
// data.scrollRight();
// data.putPixle(38, 25, "#00FF00");
// data.line();
// data.circle();