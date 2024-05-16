document.addEventListener('DOMContentLoaded', () => {
    let panicKey;
    let panicUrl;
    let isSettingKey = false;

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

    const settings = loadSettings();
    if (settings.panicKey) {
        panicKey = settings.panicKey;
    }
    if (settings.panicUrl) {
        panicUrl = settings.panicUrl;
    }

    document.addEventListener('keydown', (e) => {
        if (!isSettingKey && e.key === panicKey) {
            const containshttps = panicUrl.includes("https://");
            if (!containshttps) {
                window.location.replace('https://' + panicUrl);
            } else {
                window.location.replace(panicUrl);
            }
        }
    });
});
