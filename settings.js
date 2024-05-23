document.addEventListener('DOMContentLoaded', () => {
    let panicKey;
    let panicUrl;
    let chatOverlayKey;
    let isSettingKey = false;
    let chatWindow;
    let chatWindowFocused = false;

    const panicKeyInput = document.getElementById('panic-key');
    const panicUrlInput = document.getElementById('panic-url');
    const chatOverlayKeyInput = document.getElementById('chat-overlay-key');
    const saveSettingsButton = document.getElementById('save-settings');
    const openBlankPageButton = document.getElementById('open-blank-page');
    const backButton = document.getElementById('back-button');

    function saveSettings(key, url, overlayKey) {
        localStorage.setItem('panicKey', key);
        localStorage.setItem('panicUrl', url);
        localStorage.setItem('chatOverlayKey', overlayKey);
    }

    function loadSettings() {
        return {
            panicKey: localStorage.getItem('panicKey'),
            panicUrl: localStorage.getItem('panicUrl'),
            chatOverlayKey: localStorage.getItem('chatOverlayKey')
        };
    }

    panicKeyInput.addEventListener('keydown', (e) => {
        isSettingKey = true;
        panicKey = e.key;
        panicKeyInput.value = panicKey;
        e.preventDefault();
    });

    chatOverlayKeyInput.addEventListener('keydown', (e) => {
        isSettingKey = true;
        chatOverlayKey = e.key;
        chatOverlayKeyInput.value = chatOverlayKey;
        e.preventDefault();
    });

    saveSettingsButton.addEventListener('click', () => {
        panicUrl = panicUrlInput.value || 'about:blank';
        if (panicKey && chatOverlayKey) {
            if (panicKey !== chatOverlayKey) {
                saveSettings(panicKey, panicUrl, chatOverlayKey);
                alert('Settings saved!');
                isSettingKey = false;
            } else {
                alert('Panic key and chat overlay key must be different.');
            }
        } else {
            alert('Please set both keys.');
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
    if (settings.chatOverlayKey) {
        chatOverlayKey = settings.chatOverlayKey;
        chatOverlayKeyInput.value = chatOverlayKey;
    }

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
        window.close();
    });

    backButton.addEventListener('click', () => {
        sessionStorage.setItem('optionspage', 'true');
        window.location.replace('options.html');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === chatOverlayKey) {
            if (!chatWindow || chatWindow.closed) {
                chatWindow = window.open('chat.html', 'ChatWindow', 'width=400,height=600');
                chatWindowFocused = true;
            } else {
                if (chatWindowFocused) {
                    window.focus();
                    chatWindow.blur();
                    chatWindowFocused = false;
                } else {
                    chatWindow.focus();
                    chatWindowFocused = true;
                }
            }
        }
    });
});
