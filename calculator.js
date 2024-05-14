
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

function applyFunction(func, symbol) {
    let display = document.getElementById('display');
    let value = display.value;
    if (value) {
        let result = eval(`${func}(${value})`);
        display.value = result;
        logHistory(`${symbol}(${value}) = ${result}`);
    }
}

function clearDisplay() {
    let display = document.getElementById('display');
    display.value = '';
    previousInput = '';
    currentInput = '';
    operation = null;
}

function handleKeyDown(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        calculate();
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

function toggleHistory() {
    let historyElement = document.getElementById('history');
    historyElement.classList.toggle('hidden');
}

function validatePassword() {
    const secretPassword = 'hardboiledeggsgohard'; // Your secret password
    const password = document.getElementById('display').value;
    if (password === secretPassword) {
        sessionStorage.setItem('nextstep', 'true');
        window.location.replace('redirect.html'); // Redirect to content page
    } else {
        clearDisplay();
    }
    if (password === 'ericslippergame') {
        sessionStorage.setItem('nextstep', 'true');
        window.location.replace('redirected.html'); // Redirect to content page
    } else {
        clearDisplay();
    }
    if (password === 'proxypage') {
        sessionStorage.setItem('nextstep', 'true');
        window.location.replace('redirectpage.html'); // Redirect to content page
    } else {
        clearDisplay();
    }
}
function handleKeyDown(event) {
    if (event.key === 'Enter') {
        validatePassword();
    }
}
toggleTheme()