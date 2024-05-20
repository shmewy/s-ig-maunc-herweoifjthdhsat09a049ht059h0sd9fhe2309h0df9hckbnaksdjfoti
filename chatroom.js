import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import { getDatabase, ref, push, set, onChildAdded, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDHsUas6rwytqvUEDtholHDw8ZT86L6vvQ",
    authDomain: "lunatechat.firebaseapp.com",
    projectId: "lunatechat",
    storageBucket: "lunatechat.appspot.com",
    messagingSenderId: "1030719962982",
    appId: "1:1030719962982:web:51b2ad71627bba77ba52a7",
    measurementId: "G-MFWL44P22J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// Elements
const messagesContainer = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const usernameInput = document.getElementById('username-input');
const setUsernameButton = document.getElementById('set-username-button');
const usernameModal = document.getElementById('username-modal');
let username = localStorage.getItem('username') || '';

// Set username
const setUsername = () => {
    username = usernameInput.value.trim();
    if (username) {
        localStorage.setItem('username', username);
        usernameModal.style.display = 'none';
    }
};

if (username) {
    usernameModal.style.display = 'none';
}

setUsernameButton.addEventListener('click', setUsername);
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        setUsername();
    }
});

// Send message
const sendMessage = () => {
    const message = messageInput.value;
    if (message.trim() !== '' && username) {
        const messagesRef = ref(db, 'messages');
        const newMessageRef = push(messagesRef);
        set(newMessageRef, {
            username: username,
            message: message,
            timestamp: Date.now()
        });
        messageInput.value = '';
    }
};

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Format timestamp
const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
};

// Load existing messages and listen for new messages
const loadMessages = () => {
    const messagesRef = ref(db, 'messages');
    onValue(messagesRef, (snapshot) => {
        messagesContainer.innerHTML = ''; // Clear existing messages
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            messageElement.innerHTML = `
                <div class="message-header">
                    <span class="message-username">${data.username}</span>
                    <span class="message-timestamp">${formatTime(data.timestamp)}</span>
                </div>
                <div class="message-body">${data.message}</div>
            `;
            messagesContainer.appendChild(messageElement);
        });
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
    });

    // Listen for new messages
    onChildAdded(messagesRef, (snapshot) => {
        const data = snapshot.val();
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `
            <div class="message-header">
                <span class="message-username">${data.username}</span>
                <span class="message-timestamp">${formatTime(data.timestamp)}</span>
            </div>
            <div class="message-body">${data.message}</div>
        `;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
    });
};

loadMessages();
