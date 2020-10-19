class Alu {
    constructor() {

        this.regA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 16-bit array (regA)
        this.regB = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 16-bit array (regB)
        this.resultArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 16-bit array (result)
    }


    result(base) {

        if (base == 2) {

        }

        return;
    }



    setRegA() {
        let binary = [];
        let number = 0;
        let temp1 = 0;

        if (textBoxA.value != "") {
            if (Number.isInteger(parseInt(textBoxA.value, 10))) {
                number = parseInt(textBoxA.value, 10);

                if (number < Math.pow(2, 16)) {

                    while (true) {
                        console.log(number);

                        temp1 = number % 2;

                        binary.unshift(temp1)


                        temp1 = parseInt(number / 2);


                        number = temp1;

                        if (number == 0) {
                            console.log(binary)
                            this.regA = binary;
                            break;
                        }
                    }
                }
            }
        }
    }

    setRegB() {

        let binary = [];
        let number = 0;
        let temp1 = 0;

        if (textBoxB.value != "") {
            if (Number.isInteger(parseInt(textBoxB.value, 10))) {

                number = parseInt(textBoxB.value, 10);

                if (number < Math.pow(2, 16)) {

                    while (true) {
                        console.log(number);

                        temp1 = number % 2;

                        binary.unshift(temp1)

                        temp1 = parseInt(number / 2);


                        number = temp1;
                        if (number == 0) {
                            console.log(binary)
                            this.regB = binary;
                            break;
                        }
                    }
                }
                this.addAB();
            }
        }
    }


    addAB() {
        if (this.regA.length < 16 || this.regB.length < 16) {
            for (let i = this.regA.length; i < 16; i++) {
                this.regA.unshift(0)
            }
            for (let i = this.regB.length; i < 16; i++) {
                this.regB.unshift(0)
            }
        }

        //  1 + 1 is 0 with carrie || 1 + 0 or 0 + 1 is 1 || 0 + 0 is 0 || 
        let carrie = 0;
        for (let i = this.regA.length - 1; i >= 0; i--) {

            if (this.regA[i] === 1 && this.regB[i] === 1) {
                if (carrie === 1) {
                    this.resultArr[i] = carrie;
                    carrie = 1;
                } else {
                    this.resultArr[i] = 0;
                    carrie = 1;
                }
            } else if (this.regA[i] != this.regB[i]) {
                if (carrie === 1) {
                    this.resultArr[i] = 0;
                    carrie = 1;
                } else {
                    this.resultArr[i] = 1;
                    carrie = 0;
                }
            } else {
                if (carrie === 1) {
                    this.resultArr[i] = 1;
                    carrie = 0;
                } else {
                    this.resultArr[i] = 0;
                    carrie = 0;
                }
            }
        }
        console.log("Result: " + this.resultArr);
    }
}

let data = new Alu();

// Set A
let textBoxA = document.querySelector('.textBoxA');
let btnA = document.querySelector('.btnA');
btnA.addEventListener('click', () => data.setRegA());

// Set B
let textBoxB = document.querySelector('.textBoxB');
let btnB = document.querySelector('.btnB');
btnB.addEventListener('click', () => data.setRegB());

// Result group
let btnResult = document.querySelector('.btnResult');
btnResult.addEventListener('click', () => showResult());
let resultText = document.querySelector('.result');


function showResult() {
    resultText.innerHTML = data.result(2);
}