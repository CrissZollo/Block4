// Sinus 1
let amp1 = document.querySelector("#sinA1")
let hz1 = document.querySelector("#sinA1")
let sin1Btn = document.querySelector("#sin1Btn");
sin1Btn.addEventListener('click', () => start(amp1.value, hz1.value));

// Sinus 2
let amp2 = document.querySelector("#sinA2")
let hz2 = document.querySelector("#sinA2")
let sin2Btn = document.querySelector("#sin2Btn");
sin2Btn.addEventListener('click', () => start(amp2.value, hz2.value));

// Sinus 3
let amp3 = document.querySelector("#sinA3")
let hz3 = document.querySelector("#sinA3")
let sin3Btn = document.querySelector("#sin3Btn");
sin3Btn.addEventListener('click', () => start(amp3.value, hz3.value));


let addBtn = document.querySelector("#addBtn");
addBtn.addEventListener('click', add);

let toDegree = Math.PI / 180;
let limit = 10;

let c = document.querySelector("canvas");
let ctx = c.getContext("2d");
ctx.moveTo(0, c.height / 2);
ctx.lineTo(c.width, c.height / 2);
ctx.strokeStyle = '#ffffff';
ctx.stroke();


function start(A, F) {

    if (!Number.isNaN(parseFloat(A)) && !Number.isNaN(parseFloat(F))) {

        A = parseFloat(A)
        F = parseFloat(F)

        for (let i = 0; i < c.width; i += 0.01) {

            let y = A * Math.sin(F * i * toDegree);

            let posX = i;
            let posY = (c.height / 2) + (y * (c.height / limit));

            ctx.beginPath();
            ctx.arc(posX, posY, 0.1, 0, 2 * Math.PI)
            ctx.stroke()
        }
    }
}

function add() {

}