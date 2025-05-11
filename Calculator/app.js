const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// Kintamieji saugoti pirmą ir antrą skaičių bei pasirinktą veiksmą
let firstNumber = null;
let secondNumber = null;
let currentOperator = null;
let shouldReset = false; // Ar reikia išvalyti ekraną prieš naują įvestį

// Pradinė reikšmė ekrane – 0
display.value = '0';

function setDisplay(value) {
    // Funkcija atnaujinti ekrano reikšmei (skaidriai)
    display.value = value.toString();
}

function clear() {
    // Funkcija "AC" – išvalo viską
    firstNumber = null;
    secondNumber = null;
    currentOperator = null;
    shouldReset = false;
    setDisplay(0);
}

function backspace() {
    // Funkcija "DEL" – ištrina paskutinį skaičių ekrane
    if (display.value.length > 1) {
        setDisplay(display.value.slice(0, -1)); // Pašalina paskutinį simbolį
    } else {
        setDisplay(0); // Jei vienas simbolis – rodyti 0
    }
}

function appendNumber(number) {
    // Funkcija pridėti skaičių į ekraną
    if (display.value === '0' || shouldReset) {
        setDisplay(number); // Jei buvo 0 arba reikia iš naujo – įrašo naują skaičių
        shouldReset = false;
    } else {
        setDisplay(display.value + number); // Prideda skaičių gale
    }
}

function appendDecimal() {
    // Funkcija pridėti tašką (skaičiui su kableliu)
    if (!display.value.includes('.')) {
        setDisplay(display.value + '.');
    }
}

function chooseOperator(operator) {
    // Funkcija pasirenkant veiksmą ( + - * ÷ )
    firstNumber = parseFloat(display.value); // Pasiimam pirmą skaičių
    currentOperator = operator; // Išsaugo veiksmą
    shouldReset = true; // Kita skaiciu bus nuo nulio
}

function calculate() {
    // Funkcija kai paspaudžiam "="
    if (currentOperator === null || shouldReset) return; // Jei nėra veiksmo arba reikia laukti skaičiaus – nieko nedaro

    secondNumber = parseFloat(display.value); // Pasiima antrą skaičių
    let result;

    // Apskaičiuoja pagal pasirinktą veiksmą
    if (currentOperator === '+') result = firstNumber + secondNumber;
    else if (currentOperator === '-') result = firstNumber - secondNumber;
    else if (currentOperator === '*') result = firstNumber * secondNumber;
    else if (currentOperator === '÷') {
        if (secondNumber === 0) {
            setDisplay('Error'); // Dalybs iš nulio – klaida
            return;
        }
        result = firstNumber / secondNumber;
    }

    // Parodo rezultatą
    setDisplay(result);
    // Atnaujina pirmą skaičių, jei skaiciujama toliau
    firstNumber = result;
    currentOperator = null;
    shouldReset = true; // Po rezultato įvedus skaičių jis pakeis ekraną
}

// Čia priskiriame kiekvienam mygtukui paspaudimo funkciją
buttons.forEach(button => {
    const value = button.textContent; // Pasiimam, kas parašyta ant mygtuko

    button.addEventListener('click', () => {
        // Jei skaičius (0–9)
        if (!isNaN(value)) {
            appendNumber(value);
        }
        // Jei taškas
        else if (value === '.') {
            appendDecimal();
        }
        // Jei veiksmo simbolis
        else if (['+', '-', '*', '÷'].includes(value)) {
            chooseOperator(value);
        }
        // Jei lygybė =
        else if (value === '=') {
            calculate();
        }
        // Jei AC
        else if (value === 'AC') {
            clear();
        }
        // Jei DEL
        else if (value === 'DEL') {
            backspace();
        }
    });
});
