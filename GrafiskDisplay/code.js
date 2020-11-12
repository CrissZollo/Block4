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

        let black = false;


        for (let i = 0; i < this.amountOfRec * this.amountOfRec; i++) {


            // if (black) {

            //     this.draw.fillStyle = `#000000`;
            // } else {
            //     this.draw.fillStyle = `#FFFFFF`;

            // }

            let r = Math.floor(Math.random() * 256);
            let g = Math.floor(Math.random() * 256);
            let b = Math.floor(Math.random() * 256);
            this.draw.fillStyle = `rgb(${r},${g},${b})`;

            // this.draw.fillStyle = `#704214`;

            this.colorArr.push(this.draw.fillStyle);
            if (i % this.amountOfRec == 0 && i != 0) {
                this.xPos = 0;
                this.yPos++;
            }
            this.draw.fillRect((canvas.width / this.amountOfRec) * this.xPos, (canvas.width / this.amountOfRec) * this.yPos, (canvas.width / this.amountOfRec), (canvas.height / this.amountOfRec));
            this.recArr.push([(canvas.width / this.amountOfRec) * this.xPos, (canvas.width / this.amountOfRec) * this.yPos, (canvas.width / this.amountOfRec), (canvas.height / this.amountOfRec)]);

            this.xPos++;
            black = !black;
        }
    }

    clear(color) {
        this.draw.clearRect(0, 0, canvas.width, canvas.height)

        for (let i = 0; i < this.recArr.length; i++) {
            this.draw.fillStyle = color;
            this.draw.fillRect(this.recArr[i][0], this.recArr[i][1], this.recArr[i][2], this.recArr[i][3])
        }

    }


    fadeIn() {

        let target = 255;
        let index = 0;


        let interval = setInterval(() => {

            if (index >= 16) {

                clearInterval(interval);
                return;
            }

            for (let i = 0; i < this.recArr.length; i++) {

                let r = parseInt(this.colorArr[i][1] + this.colorArr[i][2], 16);
                let g = parseInt(this.colorArr[i][3] + this.colorArr[i][4], 16);
                let b = parseInt(this.colorArr[i][5] + this.colorArr[i][6], 16);

                let newR = ((target - r) / 16) * (index + 1) + r;
                let newG = ((target - g) / 16) * (index + 1) + g;
                let newB = ((target - b) / 16) * (index + 1) + b;


                this.draw.fillStyle = `rgb(${newR},${newG},${newB})`
                this.draw.fillRect(this.recArr[i][0], this.recArr[i][1], this.recArr[i][2], this.recArr[i][3])
            }
            index++;

        }, 100)
    }


    fadeOut() {
        let index = 0;


        let interval = setInterval(() => {

            if (index > 16) {

                clearInterval(interval);
                return;
            }

            for (let i = 0; i < this.recArr.length; i++) {

                let r = parseInt(this.colorArr[i][1] + this.colorArr[i][2], 16);
                let g = parseInt(this.colorArr[i][3] + this.colorArr[i][4], 16);
                let b = parseInt(this.colorArr[i][5] + this.colorArr[i][6], 16);

                let newR = r - ((r / 16) * index + 1);
                let newG = g - ((g / 16) * index + 1);
                let newB = b - ((b / 16) * index + 1);


                this.draw.fillStyle = `rgb(${newR},${newG},${newB})`
                this.draw.fillRect(this.recArr[i][0], this.recArr[i][1], this.recArr[i][2], this.recArr[i][3])
            }
            index++;

        }, 100)
    }

    scrollLeft() {


        for (let i = 0; i < this.recArr.length; i++) {

            this.draw.fillStyle = this.colorArr[i + 1];
            this.draw.fillRect(this.recArr[i][0], this.recArr[i][1], this.recArr[i][2], this.recArr[i][3])
        }

        this.draw.clearRect(0, 0, canvas.width / this.amountOfRec, canvas.height)
        this.draw.clearRect(canvas.width - canvas.width / this.amountOfRec, 0, canvas.width / this.amountOfRec, canvas.height)
    }

    scrollRight() {

        for (let i = 0; i < this.recArr.length; i++) {

            this.draw.fillStyle = this.colorArr[i - 1];
            this.draw.fillRect(this.recArr[i][0], this.recArr[i][1], this.recArr[i][2], this.recArr[i][3])
        }

        this.draw.clearRect(canvas.width - (canvas.width / this.amountOfRec), 0, canvas.width / this.amountOfRec, canvas.height)
        this.draw.clearRect(0, 0, canvas.width / this.amountOfRec, canvas.height)
    }

    putPixle(x, y, color) {
        if (x >= 0 && x < this.amountOfRec && y >= 0 && y < this.amountOfRec) {
            let index = this.amountOfRec * y + x;
            this.draw.clearRect(this.recArr[index][0], this.recArr[index][1], this.recArr[index][2], this.recArr[index][3])
            this.draw.fillStyle = color;
            this.draw.fillRect(this.recArr[index][0], this.recArr[index][1], this.recArr[index][2], this.recArr[index][3])
        }
    }

    line(x1, y1, x2, y2, color) {
        this.putPixle(x1, y1, color);
        this.putPixle(x2, y2, color);

        for (let i = 0; i < 100; i++) {
            let x = x1 + i;
            let y = Math.round(y1 + ((y2 - y1) / (x2 - x1)) * i);
            this.putPixle(x, y, color);
            if (x == x2) {
                break;
            }
        }
        // if (y2 - y1 > x2 - x1 || y1 - y2 > x1 - x2) {
        // } else {
        //     for (let i = 0; i < 100; i++) {
        //         let x = x1 + i
        //         let y = Math.round(y1 + ((y2 - y1) / (x2 - x1)) * i);
        //         this.putPixle(x, y, color);
        //         if (x == x2) {
        //             break;
        //         }
        //     }
        // }

    }

    circle(x, y, radius, color) {
        this.putPixle(x, y, color)
        for (let i = 1; i < 360; i++) {
            this.putPixle(Math.round(Math.cos(i) * radius) + x, Math.round(Math.sin(i) * radius) + y, color)
        }
    }
}

let data = new Canvas();



// data.clear("#ff0000");
// data.putPixle(22, 10, "#00FF00");
// data.line(0, 0, 20, 35, "#000000");
// data.circle(20, 20, 10, "#000000");

// Inte klara //
// data.fadeIn();
data.fadeOut();
// data.scrollLeft();
// data.scrollRight();