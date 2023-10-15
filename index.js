document.addEventListener("DOMContentLoaded", () => {
    const animalList = document.getElementById("animalList");
    const animalDetails = document.getElementById("animalDetails");
    const detailName = document.getElementById("detailName");
    const detailImage = document.getElementById("detailImage");
    const voteCount = document.getElementById("voteCount");
    const voteButton = document.getElementById("voteButton");
    const votesForm = document.getElementById("votes-form");
    const resetButton = document.getElementById("reset-btn");

    let characters = [];

    // Fetch data from the API
    fetch("http://localhost:3000/characters")
        .then((response) => {
            console.log(response);  // Log the response
            return response.json();
        })
        .then((charactersData) => {
            console.log(charactersData);  // Log the characters
            characters = charactersData;
            displayAnimalList(characters);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });

    function displayAnimalList(characters) {
        console.log("Displaying animal list:", characters);  // Log characters at the beginning
        characters.forEach((character) => {
            const listItem = document.createElement("li");
            listItem.textContent = character.name;
            listItem.addEventListener("click", () => showAnimalDetails(character));
            animalList.appendChild(listItem);
        });
    }

    function showAnimalDetails(character) {
        detailName.textContent = character.name;
        detailImage.src = character.image;
        voteCount.textContent = `Votes: ${character.votes}`;
        voteButton.onclick = () => addVote(character.id);
        votesForm.onsubmit = (e) => handleVotesFormSubmit(e, character.id);
        resetButton.onclick = () => resetVotes(character.id);

        animalDetails.style.display = "block";
    }

    function addVote(characterId) {
        const character = characters.find(c => c.id === characterId);
        if (character) {
            character.votes++;
            updateVoteCount(character);
        }
    }

    function handleVotesFormSubmit(event, characterId) {
        event.preventDefault();
        const votesInput = document.getElementById("votes");
        const votes = parseInt(votesInput.value, 10);
        if (!isNaN(votes)) {
            const character = characters.find(c => c.id === characterId);
            if (character) {
                character.votes += votes;
                updateVoteCount(character);
            }
        }
        votesInput.value = "";
    }

    function resetVotes(characterId) {
        const character = characters.find(c => c.id === characterId);
        if (character) {
            character.votes = 0;
            updateVoteCount(character);
        }
    }

    function updateVoteCount(character) {
        voteCount.textContent = `Votes: ${character.votes}`;
    }
});


