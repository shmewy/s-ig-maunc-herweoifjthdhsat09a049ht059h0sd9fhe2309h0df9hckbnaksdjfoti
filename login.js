document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const passcode = document.getElementById('password').value;
    const maxAttempts = 10; // Maximum number of allowed attempts

    let attempts = localStorage.getItem('loginAttempts') || 0;
    let isLockedOut = localStorage.getItem('isLockedOut') || false;

    if (isLockedOut === 'true') {
        alert('Your account is locked due to too many failed attempts bozo. yer not slick buddy');
        return;
    }

    if (passcode === 'LunateIsBetterThanHypackel') {
        alert('Welcome to Lunate, Premium User');
        sessionStorage.setItem('levelOfAccess', 'noAds');
        window.location.replace('transform.html');
    } elseif (passcode === ''){
        sessionStorage.setItem('levelOfAccess', 'yesAds');
        window.location.replace('transform.html');
    } else {
        attempts++;
        localStorage.setItem('loginAttempts', attempts);
        alert('Incorrect password. You have ' + (maxAttempts - attempts) + ' attempt(s) left before bad things will happen >:D');
        
        if (attempts >= maxAttempts) {
            localStorage.setItem('isLockedOut', true);
            alert('Too many failed attempts. Your account is now locked. L bozo skill issue');
        }
    }
});
