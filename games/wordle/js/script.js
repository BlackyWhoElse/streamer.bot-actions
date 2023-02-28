/**
  Wordle Clone by Peter Butcher

  Based on Wordle, the popular 5 letter word guessing game:
  https://www.powerlanguage.co.uk/wordle

  Uses Donald Knuth's GraphBase list of five-letter words:
  https://www-cs-faculty.stanford.edu/~knuth/sgb-words.txt
**/

let targetWord;
let targetWordList;
let gameOver = false;

const wordListSource = {
    "en": "./words/en.txt",
    "de": "./words/de.txt",
};

const currentGuess = [];
const guesses = [];
const board = document.getElementById("board");
const keyboard = document.getElementById("keyboard");
const modal = document.getElementById("modal");
const maxWordLength = 5;
const maxGuesses = 6;
const rowCount = maxGuesses;
const colCount = maxWordLength;
const revealTime = 500;

const letterStates = {
    INITIAL: "initial", // Starting state
    ENTER: "enter", // A letter has been entered into a tile
    ABSENT: "absent", // Letter is not in the word
    PRESENT: "present", // Letter is present but in the wrong place
    CORRECT: "correct", // Letter is correct
};

const gameStates = {
    WIN: "win",
    LOSE: "lose",
};

// Generates a 5 x 6 board
function generateBoard() {
    for (let row = 0; row < rowCount; row++) {
        let rowEl = document.createElement("div");
        rowEl.classList.add("row");

        for (let col = 0; col < colCount; col++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            tile.dataset.state = letterStates.INITIAL;
            rowEl.appendChild(tile);
        }

        board.appendChild(rowEl);
    }
}


// Get a row of the board
function getRow(row) {
    let rowSelector = `#board .row:nth-child(${row})`;
    return document.querySelector(rowSelector);
}

// Get a tile from a row
function getTile(row, tile) {
    let tileSelector = `.tile:nth-child(${tile})`;
    return getRow(row).querySelector(tileSelector);
}

// Get keyboard key
function getKey(key) {
    let keySelector = `#keyboard .key[data-letter=${key}]`;
    return document.querySelector(keySelector);
}



// Handles Guesses 
function handleGuess(word) {

    // Validate word
    if (word.length > 5) {
        console.error('Word is too long');
        return;
    }


    letters = word.split('');

    letters.forEach((letter, index) =>
        setTimeout(() => addLetter(letter), index * revealTime)
    )


}

// Add letter to row
function addLetter(key) {
    let tile = getTile(guesses.length + 1, currentGuess.length + 1);
    tile.innerText = key;
    tile.dataset.state = letterStates.ENTER;
    tile.dataset.letter = key;
    currentGuess.push(key);

    if (currentGuess.length === maxWordLength) {
        submitGuess();
    }

}

// Remove letter from row
function removeLetter() {
    if (currentGuess.length > 0) {
        let tile = getTile(guesses.length + 1, currentGuess.length);
        tile.innerText = "";
        tile.dataset.state = letterStates.INITIAL;
        delete tile.dataset.letter;
        currentGuess.pop();
    }
}

// Submit a guess
function submitGuess() {
    let row = guesses.length + 1;
    let rowEl = getRow(row);
    let has = [];

    if (
        targetWord === currentGuess.join("") ||
        targetWordList.includes(currentGuess.join(""))
    ) {
        rowEl.dataset.state = "valid";
        guesses.push([...currentGuess]);
        let correct = 0;

        for (let i = 0; i < maxWordLength; i++) {
            let tile = getTile(row, i + 1);
            let letter = tile.dataset.letter;
            has.push(letter);

            if (targetWord.includes(letter)) {
                if (indiciesOf(letter, targetWord).includes(i)) {
                    tile.dataset.state = letterStates.CORRECT;
                    correct++;
                } else {
                    tile.dataset.state = letterStates.PRESENT;
                }
            } else {
                tile.dataset.state = letterStates.ABSENT;
            }
        }

        const scanned = [];

        for (let i = 0; i < maxWordLength; i++) {
            let tile = getTile(row, i + 1);
            let letter = tile.dataset.letter;
            let correctOfType = 0;

            scanned.push(letter);

            for (let j = 0; j < maxWordLength; j++) {
                if (currentGuess[j] === letter && currentGuess[j] === targetWord[j])
                    correctOfType++;
            }

            if (
                targetWord.includes(letter) &&
                !indiciesOf(letter, targetWord).includes(i)
            ) {
                if (
                    indiciesOf(letter, scanned).length + correctOfType >
                    indiciesOf(letter, targetWord).length
                ) {
                    tile.dataset.state = letterStates.ABSENT;
                }
            }
        }

        clearCurrentGuess();

        if (correct === maxWordLength) {
            win(rowEl);
        } else if (guesses.length === maxGuesses) {
            lose();
        }
    } else {
        rowEl.dataset.state = "invalid";
        setTimeout(function() {
            delete rowEl.dataset.state;
        }, 600);

        // This function waits for 2 seconds, then removes the invalid word letters one by one, 500ms a time.
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                removeLetter();
            }, 2000 + i * 500);
        }
    }
}

// Helper function to find multiple indicies
function indiciesOf(letter, word) {
    let indicies = [];
    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) indicies.push(i);
    }
    return indicies;
}

// Clear the current guess array
function clearCurrentGuess() {
    currentGuess.splice(0, 5);
}

// In case of a win
function win(rowEl) {
    gameOver = true;
    setTimeout(function() {
        rowEl.dataset.state = "correct";
    }, 1000);
    setTimeout(function() {
        // Call Streamerbot function for win
        endTheGame(currentGuesser, true);
    }, 1500);
}

// In case of a loss
function lose() {
    gameOver = true;
    setTimeout(function() {
        // Call Streamerbot function for lose    
        endTheGame(currentGuesser, false);
    }, 1000);
}

// Reset game state
function reset() {
    delete getRow(guesses.length).dataset.state;

    guesses.splice(0, guesses.length);
    currentGuess.splice(0, currentGuess.length);
    gameOver = false;

    for (let tile of Array.from(board.querySelectorAll(".tile"))) {
        tile.dataset.state = letterStates.INITIAL;
        delete tile.dataset.letter;
        tile.innerText = "";
    }

    setTargetWord();
}

// Set the next target word
function setTargetWord() {
    if (targetWordList.length !== 0) {
        targetWordIndex = Math.floor(Math.random() * targetWordList.length);
        targetWord = targetWordList[targetWordIndex];
        targetWordList.splice(targetWordList.indexOf(targetWord), 1);
    } else {
        targetWord = "sorry";
    }
}

// Fetch a word bank
async function fetchWords() {
    await fetch(wordListSource[sbSettings.language])
        .then((res) => res.text())
        .then((data) => {
            targetWordList = data.toLowerCase().trim().split(/\r\n|\n|\r/);
        });
}

// Initial setup
async function init() {
    await fetchWords();
    generateBoard();
    setTargetWord();
}

// Start
init();