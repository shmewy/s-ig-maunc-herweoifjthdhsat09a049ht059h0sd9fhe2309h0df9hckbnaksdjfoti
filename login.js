// scripts.js
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Replace with actual authentication logic
    if (username === 'friendofshmewy' && password === 'shmewyisagoodfriend') {
        alert('yayyyy thanks for beign a gud persun');
        sessionStorage.setItem('levelOfAccess','noAds')
        window.location.replace('transform.html');
    } else {
        alert('You will have a limited experience');
        sessionStorage.setItem('levelOfAccess', 'yesAds')
        window.location.replace('transform.html')
    }
});
