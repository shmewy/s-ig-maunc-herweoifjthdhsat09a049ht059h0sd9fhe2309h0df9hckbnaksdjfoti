const CLIENT_ID = '508916788-98qbkadvhstn1nhqoeob263lvqqikauu.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDH11S83pyRVD8dyL-8eYIxmfzOFMoGOec';
const SPREADSHEET_ID = '17kX3E5k2Hw5ofnR_aiBnHfGtYkzoAWt0I6JdKF2FeeI';
const SHEET_NAME = 'Sheet1';

// Load the API client and auth2 library
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        scope: "https://www.googleapis.com/auth/spreadsheets"
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    }, function (error) {
        console.error(JSON.stringify(error, null, 2));
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        loadMessages();
    } else {
        gapi.auth2.getAuthInstance().signIn();
    }
}

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
        loadMessages(); // Load messages after username is set
    }
};

if (username) {
    usernameModal.style.display = 'none';
    loadMessages(); // Load messages if username is already set
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
        const messageData = {
            username: username,
            message: message,
            timestamp: new Date().toISOString()
        };

        gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!A:C`,
            valueInputOption: 'RAW',
            resource: {
                values: [[messageData.username, messageData.message, messageData.timestamp]]
            }
        }).then(() => {
            loadMessages(); // Reload messages to include the new one
            messageInput.value = '';
        }, (error) => {
            console.error('Error: ' + error.result.error.message);
        });
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
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:C`
    }).then((response) => {
        const range = response.result;
        if (range.values.length > 0) {
            messagesContainer.innerHTML = ''; // Clear existing messages
            for (let i = 0; i < range.values.length; i++) {
                const row = range.values[i];
                const messageElement = document.createElement('div');
                messageElement.classList.add('message');
                messageElement.innerHTML = `
                    <div class="message-header">
                        <span class="message-username">${row[0]}</span>
                        <span class="message-timestamp">${formatTime(row[2])}</span>
                    </div>
                    <div class="message-body">${row[1]}</div>
                `;
                messagesContainer.appendChild(messageElement);
            }
            messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
        }
    }, (error) => {
        console.error('Error: ' + error.result.error.message);
    });
};

// Load the API client and auth2 library when the script loads
handleClientLoad();
