// scripts.js
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Replace with actual authentication logic
    if (username === 'friendofshmewy' && password === 'shmewyisagoodfriend') {
        alert('Login successful!');
        window.location.href = 'dashboard.html';
        sessionStorage.setItem('levelOfAccess','noAds')
    } else {
        alert('You will have limited access');
        sessionStorage.setItem('levelOfAccess', 'yesAds')
    }
});
