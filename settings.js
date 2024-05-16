document.addEventListener('DOMContentLoaded', () => {
    let panicKey;
    let panicUrl;

    const panicKeyInput = document.getElementById('panic-key');
    const panicUrlInput = document.getElementById('panic-url');
    const saveSettingsButton = document.getElementById('save-settings');
    const openBlankPageButton = document.getElementById('open-blank-page');
    const backButton = document.getElementById('back-button'); // Assuming you have this element

    // Function to save settings to localStorage
    function saveSettings(key, url) {
        localStorage.setItem('panicKey', key);
        localStorage.setItem('panicUrl', url);
    }

    // Function to load settings from localStorage
    function loadSettings() {
        return {
            panicKey: localStorage.getItem('panicKey'),
            panicUrl: localStorage.getItem('panicUrl')
        };
    }

    // Set the panic key when the user presses a key in the input field
    panicKeyInput.addEventListener('keydown', (e) => {
        panicKey = e.key;
        panicKeyInput.value = panicKey;
        e.preventDefault();  // Prevent the default action for the key
    });

    // Save the settings when the user clicks the save button
    saveSettingsButton.addEventListener('click', () => {
        panicUrl = panicUrlInput.value || 'about:blank';
        if (panicKey) {
            saveSettings(panicKey, panicUrl);
            alert('Settings saved!');
        } else {
            alert('Please set a panic key.');
        }
    });

    // Load the saved settings and set up the panic key listener
    const settings = loadSettings();
    if (settings.panicKey) {
        panicKey = settings.panicKey;
        panicKeyInput.value = panicKey;
    }
    if (settings.panicUrl) {
        panicUrl = settings.panicUrl;
        panicUrlInput.value = panicUrl;
    }

    // Listen for the panic key press and perform the panic action
    document.addEventListener('keydown', (e) => {
        if (e.key === panicKey) {
            // Perform the panic action (e.g., redirect to the panic URL)
            window.location.replace(panicUrl || 'about:blank');
        }
    });

    // Open a blank page when the button is clicked
    openBlankPageButton.addEventListener('click', () => {
        const win = window.open();
        win.document.body.style.margin = '0';
        win.document.body.style.height = '100%';
        const iframe = win.document.createElement('iframe');
        iframe.style.border = 'none';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.margin = '0';
        iframe.src = 'https://calculatorproject.brt.ar/settings.html';
        win.document.body.appendChild(iframe);
        close();
    });

    // Navigate back to options.html
    backButton.addEventListener('click', () => {
        window.location.replace('options.html');
    });
});
