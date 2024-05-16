document.addEventListener('DOMContentLoaded', () => {
    let panicKey;

    const panicKeyInput = document.getElementById('panic-key');
    const saveSettingsButton = document.getElementById('save-settings');

    // Function to save the panic key to localStorage
    function savePanicKey(key) {
        localStorage.setItem('panicKey', key);
    }

    // Function to load the panic key from localStorage
    function loadPanicKey() {
        return localStorage.getItem('panicKey');
    }

    // Set the panic key when the user presses a key in the input field
    panicKeyInput.addEventListener('keydown', (e) => {
        panicKey = e.key;
        panicKeyInput.value = panicKey;
        e.preventDefault();  // Prevent the default action for the key
    });

    // Save the panic key when the user clicks the save button
    saveSettingsButton.addEventListener('click', () => {
        if (panicKey) {
            savePanicKey(panicKey);
            alert('Panic key saved!');
        } else {
            alert('Please set a panic key.');
        }
    });

    // Load the saved panic key and set up the panic key listener
    panicKey = loadPanicKey();
    if (panicKey) {
        panicKeyInput.value = panicKey;
    }

    // Listen for the panic key press and perform the panic action
    document.addEventListener('keydown', (e) => {
        if (e.key === panicKey) {
            // Perform the panic action (e.g., redirect to a safe page)
            window.location.href = 'https://example.com';
        }
    });
});
