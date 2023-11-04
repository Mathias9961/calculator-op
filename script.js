function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return toFixedIfNecessary(num1 * num2, MAX_DECIMALS);
}

function divide(num1, num2) {
    if(num2 === 0) {
        return "Are you trying to make the world explode???"
    }

    return toFixedIfNecessary(num1 / num2, MAX_DECIMALS);
}

//Applies the right operation to num 1 and num2 based on the operator
function operate(num1, num2, operator) {
    let result = "!Err0r";
    switch (operator) {
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case "*":
            result = multiply(num1, num2);
            break;
        case "/":
            result = divide(num1, num2);
            break;
    }
    
    return result;
}

//Reduces the number of decimals to the level required
function toFixedIfNecessary( value, dp ){
    return +parseFloat(value).toFixed( dp );
}

const MAX_DECIMALS = 10;
let currentNumber = 0;
let previousNumber = 0;
let currentOperator = "";

const numberButtons = document.querySelectorAll(".numbers button");

numberButtons.forEach(button => button.addEventListener('click', addNumberToScreen));

const screen = document.querySelector(".screen-panel");

function addNumberToScreen(event) {
    let selectedNumber = event.target.textContent;
    currentNumber = parseFloat(screen.textContent);

    if (currentNumber / 1000000000 > 1) {
        return
    } else if (currentNumber === 0) {
        screen.textContent = selectedNumber;
    } else {
        screen.textContent += selectedNumber;
    }

    currentNumber = parseFloat(screen.textContent);
}

const operatorButtons = document.querySelectorAll(".operators button");

operatorButtons.forEach(button => button.addEventListener('click', runOperation));

function runOperation(event) {
    let operationType = event.target.textContent;
    console.log("Operation: " + operationType);

    console.log("PrevNumber: " + previousNumber);
    console.log("Current Number: " + currentNumber);

    if (previousNumber === 0) {
        console.log("No prev number, setting it to: " + currentNumber);
        previousNumber = currentNumber;
        screen.textContent = 0;
        return
    }

    let result = operate(previousNumber, currentNumber, operationType);

    console.log("Result: " + result);
    screen.textContent = result;

}

