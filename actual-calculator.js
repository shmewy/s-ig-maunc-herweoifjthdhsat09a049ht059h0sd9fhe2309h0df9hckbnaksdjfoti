function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

while (true) {
    console.log('Choose an operation:');
    console.log('1. Add');
    console.log('2. Subtract');
    console.log('3. Multiply');
    console.log('4. Divide');

    const choice = parseInt(prompt('Enter choice (1/2/3/4):'));

    if ([1, 2, 3, 4].includes(choice)) {
        try {
            const num1 = parseInt(prompt('Input your first number:'));
            const num2 = parseInt(prompt('Input your second number:'));

            if (choice === 1) {
                console.log(`${num1} + ${num2} = ${add(num1, num2)}`);
            } else if (choice === 2) {
                console.log(`${num1} - ${num2} = ${subtract(num1, num2)}`);
            } else if (choice === 3) {
                console.log(`${num1} * ${num2} = ${multiply(num1, num2)}`);
            } else if (choice === 4) {
                console.log(`${num1} / ${num2} = ${divide(num1, num2)}`);
            }

            const answer = prompt('Would you like to do another calculation? (yes/no)');
            if (answer.toLowerCase() !== 'yes') {
                break;
            }
        } catch (error) {
            console.log('Invalid input. Please try again.');
        }
    } else {
        console.log('Invalid input. Try again:');
    }
}
