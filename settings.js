document.addEventListener('DOMContentLoaded', () => {
    let panicKey;
    let panicUrl;
    let isSettingKey = false;

    const panicKeyInput = document.getElementById('panic-key');
    const panicUrlInput = document.getElementById('panic-url');
    const saveSettingsButton = document.getElementById('save-settings');
    const openBlankPageButton = document.getElementById('open-blank-page');
    const backButton = document.getElementById('back-button'); 

  
    function saveSettings(key, url) {
        localStorage.setItem('panicKey', key);
        localStorage.setItem('panicUrl', url);
    }

   
    function loadSettings() {
        return {
            panicKey: localStorage.getItem('panicKey'),
            panicUrl: localStorage.getItem('panicUrl')
        };
    }


    panicKeyInput.addEventListener('keydown', (e) => {
        isSettingKey = true;
        panicKey = e.key;
        panicKeyInput.value = panicKey;
        e.preventDefault();
    });

    saveSettingsButton.addEventListener('click', () => {
        panicUrl = panicUrlInput.value || 'about:blank';
        if (panicKey) {
            saveSettings(panicKey, panicUrl);
            alert('Settings saved!');
            isSettingKey = false;
        } else {
            alert('Please set a panic key.');
        }
    });

    const settings = loadSettings();
    if (settings.panicKey) {
        panicKey = settings.panicKey;
        panicKeyInput.value = panicKey;
    }
    if (settings.panicUrl) {
        panicUrl = settings.panicUrl;
        panicUrlInput.value = panicUrl;
    }

    document.addEventListener('keydown', (e) => {
        if (!isSettingKey && e.key === panicKey) {

            window.location.replace(panicUrl || 'about:blank');
        }
    });

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
        sessionStorage.setItem('optionspage', 'true');
        window.location.replace('options.html');
    });
});
