var settings = {
    // The URL to your streamer.bot ws server
    websocketURL: "ws://localhost:8080/",
    // Switch between diffrent gamemodes direct,poll,auto
    // The mode poll only works on Twitch
    mode: "direct",
    // Show 4 choices on screen so it's easier to guess correctly (Recommended false if mode is auto)
    showChoices: true,
    /* Select one of the languages in the comment for name displaying 1-12
        1 : ja-Hrkt
        2 : roomaji
        3 : zh-Hant
        4 : fr
        5 : de
        6 : es
        7 : it
        8 : en
        9 : cs
        10 : ja
        11 : zu-Hans
        12 : pt-BR
      */
    language: 5,
    pokemon: {
        // Select pokemons form pokeid X
        from: 1,
        // Select pokemons till id Y
        to: 151,
    },
    animations: {
        // Reveal animation for choices
        revealChoices: "animate__fadeIn",
        // Reveal animation for pokemon
        revealPokemon: "animate__tada",

        // How long the pokemon will be hidden
        revealAfter: 5000,
        // How long the pokemon will be revealed 
        hideAfter: 10000,

    },
    // Poll related settings
    poll: {
        // How long for the users to vote
        voteTime: 60000,
    },
    // Audio clip playing on game start
    intro: new Audio("assets/whos-that-pokemon.mp3"),
    //Audio clip when a user guessed correctly
    end: new Audio("assets/correct.mp3"),
};

var currentPokemon;
var pokemons = [];
var choices = [];

var voting = false;
var poll = false;

var autoreveal;

window.addEventListener("load", (event) => {
    connectws();
});

function connectws() {
    if ("WebSocket" in window) {
        console.log("Connecting to Streamer.Bot");
        ws = new WebSocket(settings.websocketURL);
        bindEvents();
    }
}

function bindEvents() {
    ws.onopen = () => {
        ws.send(
            JSON.stringify({
                request: "Subscribe",
                id: "obs-chat",
                events: {
                    raw: ["Action","SubAction"],
                    general: ["Custom"],
                    Twitch: ["ChatMessage", "PollCompleted"],
                    YouTube: ["Message"],
                },
            })
        );
    };

    ws.onmessage = async (event) => {
        const wsdata = JSON.parse(event.data);

        if (wsdata.status == "ok" || wsdata.event.source == null) {
            return;
        }

        console.debug(wsdata);


        if (wsdata.data.name == "WTP - Start Game" || wsdata.data.name == "Action (WTP - Start Game)" && !voting) {
            setupGame();
        }

        // Reveal Pokemon after poll is completed 
        if (poll && wsdata.event.source === "Twitch" && wsdata.event.type === "PollCompleted") {
            pollChoice = wsdata.data.winningChoice.title;
            choiceVotes = wsdata.data.winningChoice.total_voters;

            console.log("Chat voted: " + pollChoice + " Votes: " + choiceVotes);

            if (pollChoice == currentPokemon.names[settings.language].name) {
                console.log("Chat was correct");
            } else {
                console.log("Chat was incorrect");
            }

            revealPokemon(currentPokemon.names[settings.language].name)

            poll = false;
        }


        // Twitch
        if (currentPokemon) {
            switch (settings.mode) {
                case "direct":
                    if (voting && wsdata.event.source === "Twitch" && wsdata.event.type === "ChatMessage") {

                        // Check if message is only one word
                        if (wsdata.data.message.message.split().length == 1) {
                            checkAnswer(wsdata.data.message.displayName, wsdata.data.message.message);
                        }
                    }

                    if (voting && wsdata.event.source === "Youtube" && wsdata.event.type === "Message") {

                        // Check if message is only one word
                        if (wsdata.data.message.message.split().length == 1) {
                            checkAnswer(wsdata.data.message.displayName, wsdata.data.message.message);
                        }
                    }

                    break;
                case "poll":
                    // Check if a pokemon poll is already running 
                    break;
                case "auto":
                    break;
                default:
                    break;
            }
        }
    }
};

ws.onclose = function () {
    setTimeout(connectws, 10000);
};


/**
 * Starts a new game and resets a old one
 * Controlls direct and auto
 */
function setupGame() {
    // Setting up a clear game
    choices = [];
    voting = true;
    $("#pokemon").removeClass("show");
    $("#pokemon").removeClass(settings.animations.revealPokemon);
    $("#pokemon").attr(
        "src",
        `` // TODO: Add default shape
    );
    $("#choices").removeClass(settings.animations.revealChoices);

    // Loading Pokedex Infos
    currentID = getRandomInt(settings.pokemon.from, settings.pokemon.to);
    if (pokemons[currentID] == undefined) {
        fetchPokeApi(currentID)
            .then((data) => {
                currentPokemon = data;
                pokemons[currentID] = data;
            })
            .then((data) => {
                if (settings.showChoices) {
                    setChoices();
                } else {
                    console.debug(currentPokemon);
                    setPokemon(PokedDexID(currentPokemon.id));
                }
            });
    } else {
        currentPokemon = pokemons[currentID];
        if (settings.showChoices) {
            setChoices();
        } else {
            setPokemon(PokedDexID(currentPokemon.id));
        }
    }

    if (settings.mode == "poll") {
        poll = true;
    } else {

        // Will reveal the pokemon after a set time
        autoreveal = setTimeout(() => {
            revealPokemon(currentPokemon.names[settings.language].name);

            // Restart the game if gamemode is auto
            if (settings.mode == 'auto') {
                setTimeout(() => {
                    setupGame();
                }, settings.animations.hideAfter);
            }

        }, settings.animations.revealAfter);
    }

    // Auto revealPokemon 

}

/**
 * Fetching a random Pokemon form PokeApi
 */
function fetchPokeApi(pokeId) {
    console.info("Loading pokedex data for id: " + pokeId);

    return fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeId}`)
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => console.warn(error));
}

/**
 * Filling all choices
 * Controlls direct and poll
 */
function setChoices() {

    var choices = [];

    for (let index = 0; index < 3; index++) {
        let id = getRandomInt(settings.pokemon.from, settings.pokemon.to);

        if (pokemons[id] == undefined) {
            fetchPokeApi(id).then((data) => {
                pokemons[id] = data;
                choices[index] = data.names[settings.language].name;
            });
        } else {
            choices[index] = pokemons[id].names[settings.language].name;
        }
    }
    choices[3] = currentPokemon.names[settings.language].name;
    setTimeout(function () {

        shuffle(choices).then((data) => {
            for (let index = 0; index < data.length; index++) {
                const name = choices[index];
                $(`.${index + 1}`).html(name);
                console.debug(name);
            }

            if (settings.mode == "poll") {
                startPoll(choices);
            }

            $("#choices").addClass(settings.animations.revealChoices);
            setPokemon(PokedDexID(currentPokemon.id));
        });

    }, 1000);

}

/**
 * Setting the image of the current pokemon
 * @param {int} pokedexID
 */
function setPokemon(pokedexID) {
    //Set pokemon img src
    $("#pokemon").attr(
        "src",
        `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokedexID}.png`
    );

    // Play mp3 file
    settings.intro.play();
}

/**
 * Checking if the given string is one of the names
 * Note: We remove the ♂ ♀ symbols for easier answering
 * Note: Checks if answer is true in all languages
 * @param {string} username
 * @param {string} answer
 */
function checkAnswer(username, answer) {

    if (currentPokemon.names.find((language) => {
        return (
            language.name.toLowerCase() === answer.toLowerCase().replace("♀", "").replace("♂", "")
        );
    })) {
        settings.end.play();

        $("#pokemon").addClass("show " + settings.animations.revealPokemon);
        voting = false;
        endGame(username);
    }
}

/**
 * Sends in chat that voting is open
 * Enable Voting command
 */
function endGame(user) {

    clearTimeout(autoreveal);

    ws.send(
        JSON.stringify({
            request: "DoAction",
            action: {
                //id: "04aac5cf-b162-4db5-9f8a-e45023a952f1",
                name: "WTP - End Game",
            },
            args: {
                username: user,
            },
            id: "WhosThatPokemonEND",
        })
    );

    setTimeout(function () {
        $("#pokemon").removeClass("show");
        $("#pokemon").removeClass(settings.animations.revealPokemon);
        $("#pokemon").attr(
            "src",
            ``
        );
        $("#choices").removeClass(settings.animations.revealChoices);
    }, settings.animations.hideAfter);

    currentPokemon = null;
}


// Reveal the pokemon and send infoarmation to Streamer.Bot
function revealPokemon(PokemonName) {

    poll = false;

    $("#pokemon").addClass("show " + settings.animations.revealPokemon);
    settings.end.play();

    ws.send(
        JSON.stringify({
            request: "DoAction",
            action: {
                //id: "04aac5cf-b162-4db5-9f8a-e45023a952f1",
                name: "WTP - Reveal Pokemon",
            },
            args: {
                pokemon: PokemonName,
            },
            id: "WhosThatPokemonReveal",
        })
    );

    setTimeout(function () {
        $("#pokemon").removeClass("show");
        $("#pokemon").removeClass(settings.animations.revealPokemon);
        $("#pokemon").attr(
            "src",
            ``
        );
        $("#choices").removeClass(settings.animations.revealChoices);
    }, settings.animations.hideAfter);

}


function startPoll(choices) {

    console.info("Starting a poll on twitch");

    ws.send(
        JSON.stringify({
            request: "DoAction",
            action: {
                //id: "5071a7c2-76bd-4271-b43c-7b866a9f2906",
                name: "WTP - Start Vote",
            },
            args: {
                "choice-1": choices[0],
                "choice-2": choices[1],
                "choice-3": choices[2],
                "choice-4": choices[3]
            },
            id: "WhosThatPokemonPoll",
        })
    );
}

/***************
 * Helper Code *
 ***************/

function getRandomInt(max, min = 0) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

/**
 * Converts a normal int to a 3 diget on
 * @param {*} id
 * @returns
 */
function PokedDexID(id) {
    return ("000" + id).substr(-3);
}

/**
 * Shuffles answers for choice output
 * @param {sting} array
 * @returns
 */
async function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}