// script.js
const backendUrl = 'https://finfir.pythonanywhere.com';

document.getElementById('configureForm').addEventListener('submit', function (event) {
    event.preventDefault();
    configureBot();
});

document.getElementById('openCommandMakerBtn').addEventListener('click', openCommandMaker);
document.getElementById('closeCommandMakerBtn').addEventListener('click', closeCommandMaker);
document.getElementById('addCommandBtn').addEventListener('click', addCommand);
document.getElementById('getCommandsBtn').addEventListener('click', getCommands);

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

// ... (other functions remain unchanged)
