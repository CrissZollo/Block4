// Sinus 1
let amp1 = document.querySelector("#sinA1")
let hz1 = document.querySelector("#sinF1")
let sin1Btn = document.querySelector("#sin1Btn");

amp1.value = 0;
hz1.value = 0;

// Sinus 2
let amp2 = document.querySelector("#sinA2")
let hz2 = document.querySelector("#sinF2")
let sin2Btn = document.querySelector("#sin2Btn");

amp2.value = 0;
hz2.value = 0;

// Sinus 3
let amp3 = document.querySelector("#sinA3")
let hz3 = document.querySelector("#sinF3")
let sin3Btn = document.querySelector("#sin3Btn");

amp3.value = 0;
hz3.value = 0;

let toDegree = Math.PI / 180;
let limit = 10;

let c = document.querySelector("canvas");
let ctx = c.getContext("2d");



let t = 0;

setInterval(function () {

    if (!Number.isNaN(parseFloat(amp1.value)) &&
        !Number.isNaN(parseFloat(hz1.value)) &&
        !Number.isNaN(parseFloat(amp2.value)) &&
        !Number.isNaN(parseFloat(hz2.value)) &&
        !Number.isNaN(parseFloat(amp3.value)) &&
        !Number.isNaN(parseFloat(hz3.value))) {

        ctx.clearRect(0, 0, c.width, c.height)


        // ctx.moveTo(0, c.height / 2);
        // ctx.lineTo(c.width, c.height / 2);
        // ctx.strokeStyle = '#ffffff';
        // ctx.stroke();

        A1 = parseFloat(amp1.value);
        F1 = parseFloat(hz1.value);

        A2 = parseFloat(amp2.value);
        F2 = parseFloat(hz2.value);

        A3 = parseFloat(amp3.value);
        F3 = parseFloat(hz3.value);

        t += 1;

        for (let i = 0; i < c.width + t; i++) {

            let y1 = A1 * Math.sin(F1 * (i * toDegree));
            let y2 = A2 * Math.sin(F2 * (i * toDegree));
            let y3 = A3 * Math.sin(F3 * (i * toDegree));

            let yNext1 = A1 * Math.sin(F1 * ((i + 1) * toDegree));
            let yNext2 = A2 * Math.sin(F2 * ((i + 1) * toDegree));
            let yNext3 = A3 * Math.sin(F3 * ((i + 1) * toDegree));


            let posX = i;
            let posXNext = i + 1;

            let yAdd = y1 + y2 + y3;
            let yAddNext = yNext1 + yNext2 + yNext3;

            yAdd = (c.height / 2) + (yAdd * (c.height / limit));
            yAddNext = (c.height / 2) + (yAddNext * (c.height / limit));

            ctx.beginPath();
            ctx.moveTo(posX - t, yAdd);
            ctx.lineTo(posXNext - t, yAddNext);
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();
        }
    }
}, 10)