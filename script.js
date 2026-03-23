// 1. Basic Math Functions
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if (!b === 0) {
        return a / b;
    } else {
        return "Error"
    }
}

// 2. Variables to store calculation data
let numOne = "";
let numTwo = "";
let operator = "";
let shouldResetScreen = false; // Switch to clear 

// 3. Operate Function
function operate(operator, numOne, numTwo) {
    numOne = Number(numOne);
    numTwo = Number(numTwo);
    let result;
    switch (operator) {
        case "+":
            result = add(numOne, numTwo);
            break;
        case "-":
            result = subtract(numOne, numTwo);
            break;
        case "*":
            result = multiply(numOne, numTwo);
            break;
        case "/":
            result = divide(numOne, numTwo);
            break;
        default:
            return "Invalid operator";
    }

    return typeof result === "number" ? Math.round(result * 1000) / 1000 : result;
}

// 4. Interface Logic
const display = document.querySelector("#display");

function updateDisplay(value) {
    display.textContent = value;
}

// Handle Number Clicks
function handleNumber(digit) {
    if (shouldResetScreen) {
        numOne = digit;
        shouldResetScreen = false;
    } else if (operator === "") {
        numOne += digit;
        updateDisplay(numOne);
    } else {
        numTwo += digit;
        updateDisplay(numTwo);
    }
}

// Handle Operator Clicks
function handleOperator(nextOperate) {
    
    if (numOne !== "" && numTwo !== "" && operator !== "") {
        const result = operate(operator, numOne, numTwo);

        updateDisplay(result);
        numOne = result.toString();
        numTwo = "";
    }

    operator = nextOperate;
    shouldResetScreen = false; // Ensure we don't wipe numOne when starting numTwo
}

// Handle Equal
function handleEqual() {
    if (numOne === "" || numTwo === "" || operator === "") {
        return;
    }
    const result = operate(operator, numOne, numTwo);
    updateDisplay(result);

    // Next operation
    numOne = result.toString();
    numTwo = "";
    operator = "";
    shouldResetScreen = true; // If clicks a number now, it resets the screen
}

// Clear
function clearCalculator() {
    numOne = "";
    numTwo = "";
    operator = "";
    shouldResetScreen = false;
    updateDisplay("0");
}

// Select all the elements
const displayElement = document.querySelector("#display");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");

// Attach Listener to Digits
digitButtons.forEach(button => {
    button.addEventListener("click", () => {
        const digit = button.textContent;
        handleNumber(digit);
    })
})

// Attach Listener to Operator
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        const nextOperate = button.textContent;
        handleOperator(nextOperate);
    })
})

// Attach Single Listeners
equalButton.addEventListener("click", handleEqual);
clearButton.addEventListener("click", clearCalculator);

// Test



