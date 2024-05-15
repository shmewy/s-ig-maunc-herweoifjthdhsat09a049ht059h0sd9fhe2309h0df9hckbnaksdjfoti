// scripts.js
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const passcode = document.getElementById('password').value;

    // Replace with actual authentication logic
    if (passcode === 'shmewyisagoodfriend') {
        alert('Welcome Premium User');
        sessionStorage.setItem('levelOfAccess','noAds')
        window.location.replace('transform.html');
    } else {
        alert('Contact me for the Premium Passcode');
        sessionStorage.setItem('levelOfAccess', 'yesAds')
        window.location.replace('transform.html')
    }
});
