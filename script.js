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
        updateDisplay(numOne);
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
        numOne = result.toString();
        numTwo = "";
        updateDisplay(result);
    }

    operator = nextOperate;
    shouldResetScreen = false; // Ensure we don't wipe numOne when starting numTwo

    updateDisplay(operator);
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

// Handle Backspace
function handleBackspace() {
    if (numTwo !== "") {
        numTwo = numTwo.slice(0, -1);
        updateDisplay(numTwo || "0");
    } else if (operator !== "") {
        operator = "";
        updateDisplay(numOne); // Go back to showing the first number
    } else {
        numOne = numOne.slice(0, -1);
        updateDisplay(numOne || "0");
    }
}

// Handle Decimal
function handleDecimal() {
    if (operator === "") {
        if (!numOne.includes(".")) {
            numOne += ".";
            displayElement.textContent = numOne;
        }
    } else {
        if (!numTwo.includes(".")) {
            numTwo += ".";
            displayElement.textContent = numTwo;
        }
    } 
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
const decimalButton = document.querySelector(".decimal");
const deleteButton = document.querySelector(".backspace");

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

// Attach Listener to decimal button
decimalButton.addEventListener("click", handleDecimal);

// Attach Listener to delete button

deleteButton.addEventListener("click", handleBackspace);

// Attach Single Listeners
equalButton.addEventListener("click", handleEqual);
clearButton.addEventListener("click", clearCalculator);

// Keyboard support
window.addEventListener("keydown", (e) => {
    // Numbers
    if (e.key >= 0 && e.key <= 9) handleNumber(e.key);

    // Operators
    if (e.key === "+") handleOperator("+");
    if (e.key === "-") handleOperator("-");
    if (e.key === "*") handleOperator("*");
    if (e.key === "/") handleOperator("/");

    // Equals and Enter
    if (e.key === "=" || e.key === "Enter") {
        e.preventDefault();
        handleEqual();
    }
    // Backspace and delete
    if (e.key === "Backspace") handleBackspace();
    if (e.key === "Escape") clearCalculator();

    // Decimal
    if (e.key === ".") handleDecimal();
});