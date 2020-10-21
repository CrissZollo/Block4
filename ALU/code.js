class Alu {
    constructor() {

        this.regA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 16-bit array (regA)
        this.regB = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 16-bit array (regB)
        this.resultArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 16-bit array (result)

        this.inverted = false;
        this.negative = false;
    }


    result(base, method) {

        this.addZeros();
        let binary = "";

        switch (base) {
            case 2:
                switch (method) {
                    case "addAB":
                        this.resultArr = this.addAB();
                        break;

                    case "subAB":
                        this.resultArr = this.subAB();
                        break;

                    case "rorA":
                        this.resultArr = this.rorA(textBoxB.value);
                        break;

                    case "rolA":
                        this.resultArr = this.rolA(textBoxB.value);
                        break;

                    default:
                        break;
                }

                for (let i = 0; i < this.resultArr.length; i++) {
                    binary = binary + this.resultArr[i]
                    if ((i + 1) % 4 == 0) {
                        binary = binary + " ";
                    }
                }
                return "Negativ " + this.negative + ": " + binary;

            default:
                return 0;
        }
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
                            valueA.innerHTML = "";
                            console.log(binary)
                            this.regA = binary;
                            this.addZeros();
                            for (let i = 0; i < this.regA.length; i++) {
                                valueA.innerHTML = valueA.innerHTML + this.regA[i]
                                if ((i + 1) % 4 == 0) {
                                    valueA.innerHTML = valueA.innerHTML + " ";
                                }
                            }
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
                            valueB.innerHTML = "";
                            console.log(binary)
                            this.regB = binary;
                            this.addZeros();
                            for (let i = 0; i < this.regB.length; i++) {
                                valueB.innerHTML = valueB.innerHTML + this.regB[i]
                                if ((i + 1) % 4 == 0) {
                                    valueB.innerHTML = valueB.innerHTML + " ";
                                }
                            }
                            break;
                        }
                    }
                }
            }
        }
        this.inverted = false;
    }


    addAB() {

        //  1 + 1 is 0 with carrie || 1 + 0 or 0 + 1 is 1 || 0 + 0 is 0 || 
        let carrie = 0;
        let tempArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (let i = this.regA.length - 1; i >= 0; i--) {

            // Checks 1 + 1
            if (this.regA[i] === 1 && this.regB[i] === 1) {
                if (carrie === 1) {
                    tempArr[i] = carrie;
                    carrie = 1;
                } else {
                    tempArr[i] = 0;
                    carrie = 1;
                }
                // Checks if it is a 1 + 0 or 0 + 1
            } else if (this.regA[i] != this.regB[i]) {
                if (carrie === 1) {
                    tempArr[i] = 0;
                    carrie = 1;
                } else {
                    tempArr[i] = 1;
                    carrie = 0;
                }
                // 0 + 0
            } else {
                if (carrie === 1) {
                    tempArr[i] = 1;
                    carrie = 0;
                } else {
                    tempArr[i] = 0;
                    carrie = 0;
                }
            }
        }
        return tempArr;
    }

    subAB() {

        let addOneArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
        let carrie = 0;

        if (this.inverted == false) {

            for (let i = 0; i < this.regB.length; i++) {
                if (this.regB[i] == 1) {
                    this.regB[i] = 0;
                } else {
                    this.regB[i] = 1;
                }
            }

            // adds addOneArr to regB
            for (let i = addOneArr.length - 1; i >= 0; i--) {
                if (addOneArr[i] === 1 && this.regB[i] === 1) {
                    if (carrie === 1) {
                        this.regB[i] = carrie;
                        carrie = 1;
                    } else {
                        this.regB[i] = 0;
                        carrie = 1;
                    }
                } else if (addOneArr[i] != this.regB[i]) {
                    if (carrie === 1) {
                        this.regB[i] = 0;
                        carrie = 1;
                    } else {
                        this.regB[i] = 1;
                        carrie = 0;
                    }
                } else {
                    if (carrie === 1) {
                        this.regB[i] = 1;
                        carrie = 0;
                    } else {
                        this.regB[i] = 0;
                        carrie = 0;
                    }
                }
            }
        }

        this.inverted = true;

        // Checks if the number is negative
        if (this.addAB()[0] == 1) {

            this.negative = true;

            let tempArr = this.addAB();

            for (let i = 0; i < tempArr.length; i++) {
                if (tempArr[i] == 1) {
                    tempArr[i] = 0;
                } else {
                    tempArr[i] = 1;
                }
            }

            for (let i = addOneArr.length - 1; i >= 0; i--) {
                if (addOneArr[i] === 1 && tempArr[i] === 1) {
                    if (carrie === 1) {
                        tempArr[i] = carrie;
                        carrie = 1;
                    } else {
                        tempArr[i] = 0;
                        carrie = 1;
                    }
                } else if (addOneArr[i] != tempArr[i]) {
                    if (carrie === 1) {
                        tempArr[i] = 0;
                        carrie = 1;
                    } else {
                        tempArr[i] = 1;
                        carrie = 0;
                    }
                } else {
                    if (carrie === 1) {
                        tempArr[i] = 1;
                        carrie = 0;
                    } else {
                        tempArr[i] = 0;
                        carrie = 0;
                    }
                }
            }
            return tempArr;
        } else {
            this.negative = false;
            return this.addAB();
        }


    }

    rorA(x) {
        let tempArr = this.regA;
        let lastNumber = 0;
        for (let j = 0; j < x; j++) {
            lastNumber = tempArr[tempArr.length - 1];
            for (let i = tempArr.length - 1; i >= 0; i--) {
                if (i != 0) {
                    tempArr[i] = tempArr[i - 1]
                } else if (i == 0) {
                    tempArr[i] = lastNumber;
                }
            }
        }
        return tempArr;
    }

    rolA(x) {
        let tempArr = this.regA;
        let firstNumber = 0;
        for (let j = 0; j < x; j++) {
            firstNumber = tempArr[0];
            for (let i = 0; i < tempArr.length; i++) {
                if (i != tempArr.length - 1) {
                    tempArr[i] = tempArr[i + 1]
                } else if (i == tempArr.length - 1) {
                    tempArr[i] = firstNumber;
                }
            }
        }
        return tempArr;
    }

    rotrA(x) {

    }

    rotlA(x) {

    }

    addZeros() {
        if (this.regA.length < 16 || this.regB.length < 16) {
            for (let i = this.regA.length; i < 16; i++) {
                this.regA.unshift(0)
            }

            for (let i = this.regB.length; i < 16; i++) {
                this.regB.unshift(0)
            }
        }
    }

}

let data = new Alu();


let selectBase = document.querySelector('#selectBase');
let selectMethod = document.querySelector('#selectMethod');

// Set A
let textBoxA = document.querySelector('.textBoxA');
let btnA = document.querySelector('.btnA');
let valueA = document.querySelector('.valueA');
btnA.addEventListener('click', () => data.setRegA());

// Set B
let textBoxB = document.querySelector('.textBoxB');
let btnB = document.querySelector('.btnB');
let valueB = document.querySelector('.valueB');
btnB.addEventListener('click', () => data.setRegB());

// Result group
let btnResult = document.querySelector('.btnResult');
btnResult.addEventListener('click', () => showResult());
let resultText = document.querySelector('.result');


function showResult() {
    resultText.innerHTML = data.result(parseInt(selectBase.value), selectMethod.value);
}