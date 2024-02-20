// script.js

// Update this URL to your Flask app hosted on PythonAnywhere
const backendUrl = 'https://finfir.pythonanywhere.com';

document.getElementById('configureBotBtn').addEventListener('click', configureBot);
document.getElementById('openCommandMakerBtn').addEventListener('click', openCommandMaker);
document.getElementById('closeCommandMakerBtn').addEventListener('click', closeCommandMaker);
document.getElementById('addCommandBtn').addEventListener('click', addCommand);
document.getElementById('configureForm').addEventListener('submit', function (event) {
    event.preventDefault();
    configureBot();
});

function configureBot() {
    const botToken = document.getElementById('botToken').value;

    fetch(`${backendUrl}/verify_bot_token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        mode: 'cors',
        body: JSON.stringify({ bot_token: botToken }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.valid) {
            fetch(`${backendUrl}/configure_bot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                mode: 'cors',
                body: JSON.stringify({ bot_token: botToken }),
            })
            .then(response => response.json())
            .then(configData => {
                if (configData.success) {
                    alert(configData.message);
                } else {
                    alert('Bot Configuration Failed');
                }
            });
        } else {
            alert('Invalid bot token. Please enter a valid bot token to configure.');
        }
    });
}

function openCommandMaker() {
    document.getElementById('commandMakerModal').style.display = 'block';
}

function closeCommandMaker() {
    document.getElementById('commandMakerModal').style.display = 'none';
}

function addCommand() {
    const botToken = document.getElementById('botToken').value;

    if (!isValidBotToken(botToken)) {
        alert('Invalid bot token. Please enter the correct bot token to add commands.');
        return;
    }

    const commandPrefix = document.getElementById('prefix').value;
    const commandName = document.getElementById('commandName').value;
    const textReply = document.getElementById('textReply').value;

    fetch(`${backendUrl}/add_command`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        mode: 'cors',
        body: JSON.stringify({ bot_token: botToken, prefix: commandPrefix, command_name: commandName, text_reply: textReply }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Command Added!');
            getCommands(); // Update the UI with the new command
        } else {
            alert(`Failed to add command. ${data.error}`);
        }
        document.getElementById('commandMakerModal').style.display = 'none';
    });
}

function getCommands() {
    fetch(`${backendUrl}/get_commands`)
    .then(response => response.json())
    .then(data => {
        const commandsList = document.getElementById('commandsList');
        commandsList.innerHTML = '';

        if (data.commands && data.commands.length > 0) {
            data.commands.forEach(command => {
                const listItem = document.createElement('li');
                listItem.textContent = `${command.prefix}${command.trigger}: ${command.text_reply}`;
                commandsList.appendChild(listItem);
            });
        } else {
            const listItem = document.createElement('li');
            listItem.textContent = 'No commands added yet.';
            commandsList.appendChild(listItem);
        }
    });
}

function isValidBotToken(token) {
    // Add your validation logic here
    return true;  // Replace with your actual validation logic
}
