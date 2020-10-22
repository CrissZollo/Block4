class Alu {
    constructor() {

        this.regA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 16-bit array (regA)
        this.regB = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 16-bit array (regB)
        this.resultArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 16-bit array (result)
        this.highBase = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

        this.inverted = false;
        this.negative = false;
    }


    result(base, method) {

        let binary = "";
        let string = "";

        switch (base) {
            case 2:
                console.log("hej")
                this.addZeros();
                switch (method) {
                    case "addAB":
                        this.resultArr = this.addAB();
                        binary = this.fixBinary(binary);
                        string = binary;
                        break;

                    case "subAB":
                        this.resultArr = this.subAB();
                        binary = this.fixBinary(binary);
                        string = "Negativ " + this.negative + ": " + binary;
                        break;

                    case "rorA":
                        this.resultArr = this.rorA(textBoxB.value);
                        binary = this.fixBinary(binary);
                        string = binary;
                        break;

                    case "rolA":
                        this.resultArr = this.rolA(textBoxB.value);
                        binary = this.fixBinary(binary);
                        string = binary;
                        break;

                    case "shiftrA":
                        this.resultArr = this.shiftrA(textBoxB.value);
                        binary = this.fixBinary(binary);
                        string = binary;
                        break;

                    case "shiftlA":
                        this.resultArr = this.shiftlA(textBoxB.value);
                        string = binary;
                        break;

                    case "andAB":
                        this.resultArr = this.andAB();
                        binary = this.fixBinary(binary);
                        string = binary;
                        break;

                    case "orAB":
                        this.resultArr = this.orAB();
                        binary = this.fixBinary(binary);
                        string = binary;
                        break;

                    case "xorAB":
                        this.resultArr = this.xorAB();
                        binary = this.fixBinary(binary);
                        string = binary;
                        break;

                    default:
                        break;
                }


                return string;

            case 4:
                break;

            case 8:

                break;

            case 16:
                break;

            default:
                return 0;
        }
    }

    fixBinary(binary) {
        for (let i = 0; i < this.resultArr.length; i++) {
            binary = binary + this.resultArr[i]
            if ((i + 1) % 4 == 0) {
                binary = binary + " ";
            }
        }
        return binary;
    }

    setRegA(base) {
        let binary = [];
        let number = 0.0;
        let temp1 = 0.0;
        let amount = 0.0;

        if (textBoxA.value != "" && parseInt(selectBase.value)) {
            if (Number.isInteger(parseInt(textBoxA.value, 10))) {
                number = parseFloat(textBoxA.value, 10);

                if (base == 2 && number < Math.pow(2, 16)) {
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
                } else if (base != 2 && number < Math.pow(base, 16)) {

                    while (true) {

                        temp1 = number;


                        while (true) {
                            if (temp1 < base) {
                                break;
                            }
                            temp1 = temp1 / base;
                            amount++;
                        }

                        temp1 = parseInt(temp1);

                        binary.unshift(temp1);

                        temp1 = temp1 * Math.pow(base, amount);
                        console.log("Math: " + Math.pow(base, amount));
                        amount = 0;




                        if (number < base) {
                            valueA.innerHTML = "";
                            console.log(binary)
                            this.regA = binary;

                            binary = binary.reverse();

                            this.addZeros();
                            for (let i = 0; i < this.regA.length; i++) {
                                if (base > 10) {
                                    this.regA[i] = this.highBase[this.regA[i]];
                                }
                                valueA.innerHTML = valueA.innerHTML + this.regA[i]
                                if ((i + 1) % 4 == 0) {
                                    valueA.innerHTML = valueA.innerHTML + " ";
                                }
                            }
                            break;
                        } else {
                            number = number - temp1;
                        }

                    }
                }

            }
        }
    }

    setRegB(base) {

        let binary = [];
        let number = 0.0;
        let temp1 = 0.0;
        let amount = 0.0;

        if (textBoxB.value != "" && parseInt(selectBase.value)) {
            if (Number.isInteger(parseInt(textBoxB.value, 10))) {

                number = parseInt(textBoxB.value, 10);


                if (base == 2 && number < Math.pow(2, 16)) {

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
                } else if (base != 2 && number < Math.pow(base, 16)) {
                    while (true) {

                        temp1 = number;


                        while (true) {
                            if (temp1 < base) {
                                break;
                            }
                            temp1 = temp1 / base;
                            amount++;
                        }

                        temp1 = parseInt(temp1);

                        binary.unshift(temp1);

                        temp1 = temp1 * Math.pow(base, amount);
                        console.log("Math: " + Math.pow(base, amount));
                        amount = 0;




                        if (number < base) {
                            valueB.innerHTML = "";
                            console.log(binary)
                            this.regB = binary;

                            binary = binary.reverse();

                            this.addZeros();
                            for (let i = 0; i < this.regB.length; i++) {
                                if (base > 10) {
                                    this.regB[i] = this.highBase[this.regB[i]];
                                }
                                valueB.innerHTML = valueB.innerHTML + this.regB[i]
                                if ((i + 1) % 4 == 0) {
                                    valueB.innerHTML = valueB.innerHTML + " ";
                                }
                            }
                            break;
                        } else {
                            number = number - temp1;
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
        let tempArr = this.addAB();

        // Checks if the number is negative
        if (this.addAB()[0] == 1) {

            this.negative = true;


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
            return tempArr;
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

    shiftrA(x) {
        let tempArr = this.regA;
        for (let j = 0; j < x; j++) {
            for (let i = tempArr.length - 1; i >= 0; i--) {
                if (i != 0) {
                    tempArr[i] = tempArr[i - 1]
                } else if (i == 0) {
                    tempArr[i] = 0;
                }
            }
        }
        return tempArr;
    }

    shiftlA(x) {
        let tempArr = this.regA;
        for (let j = 0; j < x; j++) {
            for (let i = 0; i < tempArr.length; i++) {
                if (i != tempArr.length - 1) {
                    tempArr[i] = tempArr[i + 1]
                } else if (i == tempArr.length - 1) {
                    tempArr[i] = 0;
                }
            }
        }
        return tempArr;
    }

    andAB() {
        let tempArr = [];
        for (let i = 0; i < this.regA.length; i++) {
            if (this.regA[i] == this.regB[i]) {
                tempArr.push(1);
            } else {
                tempArr.push(0);
            }
        }
        return tempArr;
    }

    orAB() {
        let tempArr = [];
        for (let i = 0; i < this.regA.length; i++) {
            if (this.regA[i] == 1 || this.regB[i] == 1) {
                tempArr.push(1);
            } else {
                tempArr.push(0);
            }
        }
        return tempArr;

    }

    xorAB() {
        let tempArr = [];
        for (let i = 0; i < this.regA.length; i++) {
            if (this.regA[i] == 1 && this.regB[i] == 1) {
                tempArr.push(0);
            } else if (this.regA[i] != this.regB[i]) {
                tempArr.push(1);
            } else {
                tempArr.push(0);
            }
        }
        return tempArr;
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
btnA.addEventListener('click', () => data.setRegA(selectBase.value));

// Set B
let textBoxB = document.querySelector('.textBoxB');
let btnB = document.querySelector('.btnB');
let valueB = document.querySelector('.valueB');
btnB.addEventListener('click', () => data.setRegB(selectBase.value));

// Result group
let btnResult = document.querySelector('.btnResult');
btnResult.addEventListener('click', () => showResult());
let resultText = document.querySelector('.result');


function showResult() {
    resultText.innerHTML = data.result(parseInt(selectBase.value), selectMethod.value);
}