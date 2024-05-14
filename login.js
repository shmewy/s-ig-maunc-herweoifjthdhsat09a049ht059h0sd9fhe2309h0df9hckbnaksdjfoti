// scripts.js
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Replace with actual authentication logic
    if (username === 'friendofshmewy' && password === 'shmewyisagoodfriend') {
        alert('Login successful!');
        sessionStorage.setItem('levelOfAccess','noAds')
        window.location.href = 'transform.html';
    } else {
        alert('You will have limited access');
        sessionStorage.setItem('levelOfAccess', 'yesAds')
        window.location.href = 'transform.html'
    }
});
