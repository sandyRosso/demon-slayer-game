document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements for Landing and Play Pages
    const startGameBtn = document.getElementById("startGameBtn");
    const landingPage = document.getElementById("landingPage");
    const playPage = document.getElementById("playPage");

    // Handle Start Game Button Click to Switch Pages
    startGameBtn.addEventListener("click", () => {
        landingPage.classList.add("hidden");
        playPage.classList.remove("hidden");
    });

    // Character Array for the Memory Game
    const characters = [
        'tanjiro', 'nezuko', 'zenitsu', 'inosuke', 'giyu', 'shinobu', 'kanao', 'rengoku'
    ];

    // Game Board Elements
    const gameBoard = document.getElementById('gameBoard');
    const timerElement = document.getElementById('timer');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');
    const restartGame = document.getElementById('restartGame');
    const closeGame = document.getElementById('closeGame');

    // Game Variables
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let timer;
    let timeRemaining = 60;

    // Function to Create the Game Board
    function createBoard() {
        const cardPairs = [...characters, ...characters]; // Duplicate array for pairs
        shuffleArray(cardPairs); // Shuffle the array

        cardPairs.forEach(character => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.character = character;

            const frontFace = document.createElement('img');
            frontFace.src = `images/${character}.jpg`; // Ensure images are in 'images' folder
            frontFace.alt = character;
            frontFace.classList.add('front-face');

            const backFace = document.createElement('div');
            backFace.classList.add('back-face');

            card.appendChild(frontFace);
            card.appendChild(backFace);
            gameBoard.appendChild(card);

            card.addEventListener('click', () => flipCard(card));

            cards.push(card);
        });

        startTimer(); // Start the game timer
    }

    // Function to Shuffle the Array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Function to Start the Timer
    function startTimer() {
        timerElement.textContent = `Time Remaining: ${timeRemaining}s`;
        timer = setInterval(() => {
            timeRemaining--;
            timerElement.textContent = `Time Remaining: ${timeRemaining}s`;

            if (timeRemaining === 0) {
                clearInterval(timer);
                showModal('Game Over! Time\'s Up!');
            }
        }, 1000);
    }

    // Function to Flip a Card
    function flipCard(card) {
        if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
            card.classList.add('flipped');
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                setTimeout(checkForMatch, 1000);
            }
        }
    }

    // Function to Check for a Match
    function checkForMatch() {
        const [card1, card2] = flippedCards;
        const isMatch = card1.dataset.character === card2.dataset.character;

        if (isMatch) {
            matchedPairs++;
            flippedCards = [];

            if (matchedPairs === characters.length) {
                clearInterval(timer);
                showModal('Congratulations! You Won!');
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }
    }

    // Function to Show the Modal
    function showModal(message) {
        modal.style.display = 'block';
        modal.querySelector('.modal-content').textContent = message;
    }

    // Event Listeners for Modal Actions
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    restartGame.addEventListener('click', () => {
        location.reload();
    });

    closeGame.addEventListener('click', () => {
        window.close();
    });

    window.addEventListener('click', event => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Initialize the Game
    createBoard();
});