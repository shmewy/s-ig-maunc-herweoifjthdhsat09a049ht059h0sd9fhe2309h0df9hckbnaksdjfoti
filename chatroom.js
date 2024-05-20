// chatroom.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

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
const database = getDatabase(app);

// Get elements
const usernameModal = document.getElementById('username-modal');
const usernameInput = document.getElementById('username-input');
const setUsernameButton = document.getElementById('set-username-button');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');

let username = '';

// Set username
setUsernameButton.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username) {
        usernameModal.style.display = 'none';
    }
});

// Send message
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message && username) {
        const messagesRef = ref(database, 'messages');
        push(messagesRef, {
            username,
            message,
            timestamp: Date.now()
        });
        messageInput.value = '';
    }
});

// Display messages
const messagesRef = ref(database, 'messages');
onChildAdded(messagesRef, (data) => {
    const messageData = data.val();
    displayMessage(messageData.username, messageData.message, messageData.timestamp);
});

function displayMessage(username, message, timestamp) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    
    const messageHeader = document.createElement('div');
    messageHeader.classList.add('message-header');
    
    const messageUsername = document.createElement('span');
    messageUsername.classList.add('message-username');
    messageUsername.textContent = username;
    
    const messageTimestamp = document.createElement('span');
    messageTimestamp.classList.add('message-timestamp');
    messageTimestamp.textContent = new Date(timestamp).toLocaleTimeString();
    
    messageHeader.appendChild(messageUsername);
    messageHeader.appendChild(messageTimestamp);
    
    const messageBody = document.createElement('div');
    messageBody.classList.add('message-body');
    messageBody.textContent = message;
    
    messageElement.appendChild(messageHeader);
    messageElement.appendChild(messageBody);
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
