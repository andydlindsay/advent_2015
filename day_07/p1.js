const fs = require('fs');

let stdinBuffer = fs.readFileSync(0);
const inputs = stdinBuffer.toString().trim().split('\n');

class Instruction {
    constructor(target, instructionType, operandOne, operandTwo) {
        this.target = target;
        this.instructionType = instructionType;
        this.operandOne = operandOne;
        this.operandTwo = operandTwo;
    }
}

const instructions = [];
const register = {};
const maxValue = 65535;
const minValue = 0;

// parse inputs
inputs.forEach((input) => {
    const inputArray = input.split('->');
    const target = inputArray[1].trim();
    const inputPartOne = inputArray[0].trim().split(' ');
    let instructionType;
    let operandOne;
    let operandTwo;
    switch (inputPartOne.length) {
        case 1:
            // assignment
            instructionType = 'ASSIGNMENT';
            operandOne = inputPartOne[0];
            break;
        case 2:
            // left operator; right operand
            instructionType = inputPartOne[0];
            operandOne = inputPartOne[1];
            break;
        case 3:
            // left and right operands; middle operator
            instructionType = inputPartOne[1];
            operandOne = inputPartOne[0];
            operandTwo = inputPartOne[2];
            break;
    }
    instructions.push(new Instruction(target, instructionType, operandOne, operandTwo));
});

const operations = {
    'AND': function (A, B) {
        return A & B;
    },
    'NOT': function (A, B) {
        return ~A;
    },
    'OR': function (A, B) {
        return A | B;
    },
    'ASSIGNMENT': function (A, B) {
        return A;
    },
    'LSHIFT': function (A, B) {
        return A << Number(B);
    },
    'RSHIFT': function (A, B) {
        return A >>> Number(B);
    }
};

while (instructions.length) {
    for (let i = 0; i < instructions.length; i++) {
        const operation = operations[instructions[i].instructionType];
        let canProceed = true;
        let operandOne;
        let operandTwo;

        // check if operandOne is by value or by reference
        if (isNaN(instructions[i].operandOne)) {
            // it's the name of a register value, but does the register have a value?
            if (register[instructions[i].operandOne] === undefined) {
                canProceed = false;
            } else {
                operandOne = register[instructions[i].operandOne]
            }
        } else {
            // it's a value
            operandOne = Number(instructions[i].operandOne);
        }

        // deal with operandTwo if necessary
        switch (instructions[i].instructionType) {
            case 'AND':
            case 'OR':
            case 'LSHIFT':
            case 'RSHIFT':
                if (isNaN(instructions[i].operandTwo)) {
                    // it's the name of a register value, but does the register have a value?
                    if (register[instructions[i].operandTwo] === undefined) {
                        canProceed = false;
                    } else {
                        operandTwo = register[instructions[i].operandTwo];
                    }
                } else {
                    // it's a value
                    operandTwo = Number(instructions[i].operandTwo);
                }
                break;
        }

        if (canProceed) {
            let result = operation(operandOne, operandTwo);
            if (result < minValue) {
                result += maxValue + 1;
            }
            if (result > maxValue) {
                result -= maxValue - 1;
            }
            register[instructions[i].target] = result;
            instructions.splice(i, 1);
            i = -1;
        }
    }
}

const answer = register['a'];
console.log(`The answer is ${answer}!`);
