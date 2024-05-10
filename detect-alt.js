document.addEventListener('keydown', function(event) {
    if (event.altKey) {
        console.log('Alt key is pressed.');
    }
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'Alt') {
        console.log('Alt key is released.');
    }
});
document.addEventListener('keydown', function(event) {
    if (event.altKey) {
        console.log('Alt key is pressed.');
        document.body.innerHTML = ''; // Clear the content of the page
        window.location.href = 'calculator.html'; // Redirect after the page is cleared
        sessionStorage.setItem('authenticated', 'false');
    }
});