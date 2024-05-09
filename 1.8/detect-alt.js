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
