
document.addEventListener('DOMContentLoaded', (event) => {
    // Initialize Firebase Authentication and Firestore
    const auth = firebase.auth();
    const db = firebase.firestore();

    document.getElementById('loginBtn').addEventListener('click', () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then(result => {
                const user = result.user;
                checkUserRole(user);
            })
            .catch(error => {
                console.error('Error during sign-in:', error);
            });
    });

    function checkUserRole(user) {
        const userRef = db.collection('users').doc(user.uid);
        userRef.get().then(doc => {
            if (doc.exists && doc.data().role === 'authorized') {
                document.getElementById('restrictedContent').style.display = 'block';
            } else {
                alert('You do not have access to this content.');
            }
        }).catch(error => {
            console.error('Error fetching user role:', error);
        });
    }
});
