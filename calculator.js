let previousInput = '';
let currentInput = '';
let operation = null;
let history = [];

document.getElementById('display').addEventListener('keydown', handleKeyDown);

function press(num) {
    document.getElementById('display').value += num;
}

function addOperator(op) {
    let display = document.getElementById('display');
    if (!operation) {
        previousInput = display.value;
        operation = op;
        display.value = ''; // Clear display to enter new number
    }
}

function calculate() {
    let display = document.getElementById('display');
    currentInput = display.value;
    if (operation && previousInput && currentInput) {
        let result = eval(`${previousInput} ${operation} ${currentInput}`);
        display.value = result;
        logHistory(`${previousInput} ${operation} ${currentInput} = ${result}`);
        previousInput = '';
        operation = null;
        currentInput = '';
    }
}

function clearDisplay() {
    let display = document.getElementById('display');
    display.value = '';
    previousInput = '';
    currentInput = '';
    operation = null;
}
function validatePassword() {
    const secretPassword = 'hardboiledeggsgohard'; // Your secret password
    const password = document.getElementById('display').value;
    if (password === secretPassword) {
        sessionStorage.setItem('authenticated', 'true');
        window.location.replace('redirect.html'); // Redirect to content page
    } else {
        clearDisplay();
    }
}
function handleKeyDown(event) {
    if (event.key === 'Enter') {
        validatePassword();
    }
}

function logHistory(entry) {
    history.push(entry);
    let historyList = document.getElementById('historyList');
    let listItem = document.createElement('li');
    listItem.textContent = entry;
    historyList.appendChild(listItem);
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}
