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
let currentNumber = "";
let numberSaved = true;
let currentScreenText = "";
let inputs = [];

const numberButtons = document.querySelectorAll(".numbers button");

numberButtons.forEach(button => button.addEventListener('click', addNumberToScreen));

const screen = document.querySelector(".screen-panel");

function addNumberToScreen(event) {
    let selectedNumber = event.target.textContent;

    if (numberSaved === true) {
        currentNumber = selectedNumber;
    } else {
        currentNumber += selectedNumber;
    }

    if (currentScreenText === "") {
        screen.textContent = selectedNumber;
    } else {
        screen.textContent += selectedNumber;
    }

    currentScreenText = screen.textContent;
    numberSaved = false;
}

const operatorButtons = document.querySelectorAll(".operators button");

operatorButtons.forEach(button => button.addEventListener('click', addOperationToScreen));

function addOperationToScreen(event) {

    let operationType = event.target.textContent;

    inputs.push(currentNumber);
    inputs.push(operationType);
    numberSaved = true;

    screen.textContent += " " + operationType + " ";

    if (operationType === "=") {
        screen.textContent = getArrayResult();
        numberSaved = true;
        currentScreenText = "";
        inputs=[];
    }

    //If clear is clicked, remove all stored values and start over
    if (operationType === "C") {
        numberSaved = true;
        currentScreenText = "";
        inputs=[];
        screen.textContent = "0";
    }

}

function getArrayResult() {

    let runningTotal = 0;
    let currentOperator = "";
    let newNumber = 0;

    for (let i = 0; i < inputs.length; i++) {
        //Check if it's the first entry of the array
        let currentItem = inputs[i];
        console.log("Evaluating: " + currentItem);


        if (i === 0) {
            //If it is, add the first number value to the running total and go the the next value
            runningTotal += parseFloat(currentItem);
            console.log("Starting running total: " + runningTotal);
            continue;
        } 

        //If the array entry is even, then it's a number. Use the last operator and running total with it
        if (i % 2 === 0) {
            console.log(`Operating: ${runningTotal} ${currentOperator} ${currentItem}`);
            runningTotal = operate(runningTotal, parseFloat(currentItem), currentOperator);
            console.log(`Result: ${runningTotal}`);
        }
        
        //If the array entry is odd, then it's an operator
        if (i % 2 !== 0) {
            currentOperator = currentItem;
        }
    }

    return runningTotal;
}
