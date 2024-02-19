// script.js

// Update this URL to your Flask app hosted on PythonAnywhere
const backendUrl = 'https://finfir.pythonanywhere.com';
document.getElementById('configureBotBtn').addEventListener('click', configureBot);
document.getElementById('openCommandMakerBtn').addEventListener('click', openCommandMaker);
document.getElementById('closeCommandMakerBtn').addEventListener('click', closeCommandMaker);
document.getElementById('addCommandBtn').addEventListener('click', addCommand);

function configureBot() {
    const botToken = document.getElementById('botToken').value;
    fetch(`${backendUrl}/configure_bot`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bot_token: botToken }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.success ? 'Bot Configured!' : 'Bot Configuration Failed');
    });
}

function openCommandMaker() {
    // Add logic to open the command maker modal
    document.getElementById('commandMakerModal').style.display = 'block';
}

function closeCommandMaker() {
    // Add logic to close the command maker modal
    document.getElementById('commandMakerModal').style.display = 'none';
}

function addCommand() {
    // Add logic to send a new command to the backend and update the UI
    const commandName = document.getElementById('commandName').value;
    const textReply = document.getElementById('textReply').value;
    const prefix = document.getElementById('prefix').value;

    fetch(`${backendUrl}/add_command`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command_name: commandName, text_reply: textReply, prefix: prefix }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Command Added!');
            // Add logic to update the UI with the new command
        } else {
            alert('Failed to add command');
        }
        // Close the command maker modal
        document.getElementById('commandMakerModal').style.display = 'none';
    });
}

// Add any additional JavaScript functions as needed
