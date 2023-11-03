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
    let result = "Error processing your operation";
    switch (operator) {
        case "sum":
            result = add(num1, num2);
            break;
        case "subtract":
            result = subtract(num1, num2);
            break;
        case "multiply":
            result = multiply(num1, num2);
            break;
        case "divide":
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


