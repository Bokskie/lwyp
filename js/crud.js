let players = [];

window.onload = function () {
    const storedPlayers = localStorage.getItem('players');

    if (storedPlayers) {
        players = JSON.parse(storedPlayers);
        updatePlayerList(document.getElementById('playerList'));
    }
};

function addPlayer() {
    const nameInput = document.getElementById('nameInput').value.trim();
    const positionInput = document.getElementById('positionInput').value;
    const ageInput = document.getElementById('ageInput').value;
    const statusInput = document.getElementById('statusInput').value;
    const descriptionInput = document.getElementById('descriptionInput').value.trim();
    const photoInput = document.getElementById('photoInput').files[0];

    if (nameInput !== '' && !isNaN(ageInput) && descriptionInput !== '' && photoInput) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const player = {
                name: nameInput,
                position: positionInput,
                age: parseInt(ageInput),
                status: statusInput,
                descript: descriptionInput,
                photo: e.target.result,
            };

            players.push(player);
            updatePlayerList(document.getElementById('playerList'));

            localStorage.setItem('players', JSON.stringify(players));
        };

        reader.readAsDataURL(photoInput);
    }
}

function deletePlayer(index) {
    players.splice(index, 1);
    updatePlayerList(document.getElementById('playerList'));
    localStorage.setItem('players', JSON.stringify(players));
}

function updatePlayer(index) {
    const nameInput = document.getElementById('editNameInput').value.trim();
    const positionInput = document.getElementById('editPositionInput').value;
    const ageInput = document.getElementById('editAgeInput').value;
    const statusInput = document.getElementById('editStatusInput').value;
    const descriptionInput = document.getElementById('editDescriptionInput').value.trim();
    const photoInput = document.getElementById('editPhotoInput').files[0];

    if (nameInput !== '' && !isNaN(ageInput) && descriptionInput !== '') {
        const reader = new FileReader();

        reader.onload = function (e) {
            const updatedPlayer = {
                name: nameInput,
                position: positionInput,
                age: parseInt(ageInput),
                status: statusInput,
                descript: descriptionInput,
                photo: e.target.result,
            };

            players[index] = updatedPlayer;
            updatePlayerList(document.getElementById('playerList'));

            localStorage.setItem('players', JSON.stringify(players));
        };

        reader.readAsDataURL(photoInput);
    }
}

function editPlayer(index) {
    const player = players[index];

    document.getElementById('editNameInput').value = player.name;
    document.getElementById('editPositionInput').value = player.position;
    document.getElementById('editAgeInput').value = player.age;
    document.getElementById('editStatusInput').value = player.status;
    document.getElementById('editDescriptionInput').value = player.descript;

    document.getElementById('updatePlayerButton').onclick = function () {
        updatePlayer(index);
        document.getElementById('editForm').style.display = 'none';
    };

    document.getElementById('editForm').style.display = 'block';
}

function updatePlayerList(playerList) {
    playerList.innerHTML = '';

    players.forEach((player, index) => {
        if (player) { 
            const listItem = document.createElement('li');
            const img = document.createElement('img');

            img.src = player.photo || '';
            img.alt = `${player.name}'s photo`;
            img.style.width = '100px';

            listItem.appendChild(img);

            const details = document.createElement('div');
            details.innerHTML = `<strong>Name:</strong> ${player.name}<br>
                                 <strong>Position:</strong> ${player.position}<br>
                                 <strong>Age:</strong> ${player.age}<br>
                                 <strong>Status:</strong> ${player.status}<br>
                                 <strong>Description:</strong> ${player.descript || 'Not available'}<br>`;

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.onclick = () => editPlayer(index);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deletePlayer(index);

            listItem.appendChild(details);
            listItem.appendChild(editButton);
            listItem.appendChild(deleteButton);
            playerList.appendChild(listItem);
        }
    });
}
