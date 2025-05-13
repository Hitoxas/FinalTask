const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let firstNumber = null;
let secondNumber = null;
let currentOperator = null;
let shouldReset = false; 


display.value = '0';

function setDisplay(value) {
    display.value = value.toString();
}

function clear() {
    firstNumber = null;
    secondNumber = null;
    currentOperator = null;
    shouldReset = false;
    setDisplay(0);
}

function backspace() {
    if (display.value.length > 1) {
        setDisplay(display.value.slice(0, -1)); 
    } else {
        setDisplay(0); 
    }
}

function appendNumber(number) {
    if (display.value === '0' || shouldReset) {
        setDisplay(number); 
        shouldReset = false;
    } else {
        setDisplay(display.value + number); 
    }
}

function appendDecimal() {
    if (!display.value.includes('.')) {
        setDisplay(display.value + '.');
    }
}

function chooseOperator(operator) {
    firstNumber = parseFloat(display.value); 
    currentOperator = operator; 
    shouldReset = true; 
}

function calculate() {
   
    if (currentOperator === null || shouldReset) return; 
    secondNumber = parseFloat(display.value); 
    let result;

 
    if (currentOperator === '+') result = firstNumber + secondNumber;
    else if (currentOperator === '-') result = firstNumber - secondNumber;
    else if (currentOperator === '*') result = firstNumber * secondNumber;
    else if (currentOperator === '÷') {
        if (secondNumber === 0) {
            setDisplay('Error'); 
            return;
        }
        result = firstNumber / secondNumber;
    }

    setDisplay(result);
    firstNumber = result;
    currentOperator = null;
    shouldReset = true; 
}


buttons.forEach(button => {
    const value = button.textContent; 

    button.addEventListener('click', () => {
        if (!isNaN(value)) {
            appendNumber(value);
        }
        else if (value === '.') {
            appendDecimal();
        }
        else if (['+', '-', '*', '÷'].includes(value)) {
            chooseOperator(value);
        }
        else if (value === '=') {
            calculate();
        }
        else if (value === 'AC') {
            clear();
        }
        else if (value === 'DEL') {
            backspace();
        }
    });
});
