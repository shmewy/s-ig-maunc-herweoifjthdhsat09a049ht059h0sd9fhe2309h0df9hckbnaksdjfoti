
const premiumUsers = [
    'schellhaaseric@gmail.com'
];

function onSignIn(response) {
    const userObject = jwt_decode(response.credential);
    const email = userObject.email;

    // Check if the user is in the premium list
    if (premiumUsers.includes(email)) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    } else {
        alert('You do not have premium access.');
        signOut();
    }
}

function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
        document.getElementById('login').style.display = 'block';
        document.getElementById('content').style.display = 'none';
    });
}
