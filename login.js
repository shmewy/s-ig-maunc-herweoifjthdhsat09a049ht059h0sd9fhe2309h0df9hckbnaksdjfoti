// scripts.js
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const passcode = document.getElementById('password').value;

    if (passcode === 'MoonShineUser') {
        alert('Welcome to Lunate, Premium User');
        sessionStorage.setItem('levelOfAccess','noAds')
        window.location.replace('transform.html');
    } else {
        alert('Contact me for the Premium Pass');
        sessionStorage.setItem('levelOfAccess', 'yesAds')
        window.location.replace('transform.html')
    }
});
