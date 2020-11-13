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

            //     this.draw.fillStyle = `#00AA00`;
            // } else {
            //     this.draw.fillStyle = `#AA0000`;

            // }

            let r = Math.floor(Math.random() * 256);
            let g = Math.floor(Math.random() * 256);
            let b = Math.floor(Math.random() * 256);
            // this.draw.fillStyle = `rgb(${r},${g},${b})`;

            this.draw.fillStyle = `#704214`;

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
        let smoothness = 16;


        let interval = setInterval(() => {

            if (index >= smoothness) {

                clearInterval(interval);
                for (let i = 0; i < this.colorArr.length; i++) {
                    this.colorArr[i] = "#ffffff";
                }
                return;
            }

            for (let i = 0; i < this.recArr.length; i++) {

                let r = parseInt(this.colorArr[i][1] + this.colorArr[i][2], 16);
                let g = parseInt(this.colorArr[i][3] + this.colorArr[i][4], 16);
                let b = parseInt(this.colorArr[i][5] + this.colorArr[i][6], 16);

                let newR = ((target - r) / smoothness) * (index + 1) + r;
                let newG = ((target - g) / smoothness) * (index + 1) + g;
                let newB = ((target - b) / smoothness) * (index + 1) + b;


                this.draw.fillStyle = `rgb(${newR},${newG},${newB})`
                this.draw.fillRect(this.recArr[i][0], this.recArr[i][1], this.recArr[i][2], this.recArr[i][3])
            }
            index++;

        }, 100)


    }


    fadeOut() {
        let index = 0;
        let smoothness = 16;


        let interval = setInterval(() => {

            if (index > smoothness) {

                clearInterval(interval);
                for (let i = 0; i < this.colorArr.length; i++) {
                    this.colorArr[i] = "#000000";
                }
                return;
            }

            for (let i = 0; i < this.recArr.length; i++) {

                let r = parseInt(this.colorArr[i][1] + this.colorArr[i][2], 16);
                let g = parseInt(this.colorArr[i][3] + this.colorArr[i][4], 16);
                let b = parseInt(this.colorArr[i][5] + this.colorArr[i][6], 16);

                let newR = r - ((r / smoothness) * index + 1);
                let newG = g - ((g / smoothness) * index + 1);
                let newB = b - ((b / smoothness) * index + 1);


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

        this.draw.clearRect(0 - canvas.width / this.amountOfRec, 0, canvas.width / this.amountOfRec, canvas.height)
        this.draw.clearRect(canvas.width - canvas.width / this.amountOfRec, 0, canvas.width / this.amountOfRec, canvas.height)
    }

    scrollRight() {

        let tempArr = [];
        console.log(this.colorArr)
        for (let i = this.recArr.length; i > 0; i--) {
            if (i % this.amountOfRec != 0) {
                tempArr.push(this.colorArr[i - 1]);
                this.draw.fillStyle = tempArr[i];
                this.draw.fillRect(this.recArr[i][0], this.recArr[i][1], this.recArr[i][2], this.recArr[i][3])
                // this.colorArr[i + 2] = this.draw.fillStyle; fun bug when changing the number
            }
        }
        this.colorArr = tempArr;
        console.log(tempArr)


        this.draw.clearRect(canvas.width + canvas.width / this.amountOfRec, 0, canvas.width / this.amountOfRec, canvas.height)
        this.draw.clearRect(0, 0, (canvas.width / this.amountOfRec) + (this.amountOfRec - (this.colorArr.length / this.amountOfRec)), canvas.height)
    }

    putPixle(x, y, color) {
        if (x >= 0 && x < this.amountOfRec && y >= 0 && y < this.amountOfRec) {
            let index = this.amountOfRec * y + x;
            this.draw.clearRect(this.recArr[index][0], this.recArr[index][1], this.recArr[index][2], this.recArr[index][3])
            this.draw.fillStyle = color;
            this.draw.fillRect(this.recArr[index][0], this.recArr[index][1], this.recArr[index][2], this.recArr[index][3])
        }
    }


    // Bresenham’s Line Algorithm
    // https://classic.csunplugged.org/wp-content/uploads/2014/12/Lines.pdf

    line(x1, y1, x2, y2, color) {
        this.putPixle(x1, y1, color);
        this.putPixle(x2, y2, color);

        let dy = y2 - y1;
        let dx = x2 - x1;
        let A = 0
        let B = 0
        let P = 0;

        if (dx > dy) {
            A = dy * 2
            B = A - (dx * 2)
            P = A - dx

            let lastY = y1;

            for (let x = x1 + 1; x <= x2; x++) {
                console.log(P)
                if (P < 0) {
                    this.putPixle(x, lastY, color)
                    P += A;
                } else if (P >= 0) {
                    this.putPixle(x, lastY + 1, color)
                    lastY++;
                    P += B;
                }

            }
        } else if (dy > dx) {
            A = dx * 2
            B = A - (dy * 2)
            P = A - dy

            let lastX = x1;

            for (let y = y1 + 1; y <= y2; y++) {
                console.log(P)
                if (P < 0) {
                    this.putPixle(lastX, y, color)
                    P += A;
                } else if (P >= 0) {
                    this.putPixle(lastX + 1, y, color)
                    lastX++;
                    P += B;
                }

            }
        }
    }

    circle(x, y, radius, color) {
        this.putPixle(x, y, color)
        // for (let i = 1; i < 360 * radius; i++) {
        //     this.putPixle(Math.round(Math.cos(i) * radius) + x, Math.round(Math.sin(i) * radius) + y, color)
        // }



        let E = -radius
        let X = radius
        let Y = 0

        while (true) {

            this.putPixle(X + x, Y + y)
            E += (2 * Y + 1);
            Y++;

            if (E >= 0) {
                E -= (2 * X - 1);
                X--;
            }

            if (Y > X) {
                break;
            }
        }

    }
}

let data = new Canvas();



// data.clear("#ff0000");
// data.putPixle(22, 10, "#00FF00");
data.circle(20, 20, 10, "#000000");
// data.fadeIn();
// data.fadeOut();

// Inte klara //
// data.line(1, 20, 25, 25, "#000000");
// data.scrollLeft();
// data.scrollRight();