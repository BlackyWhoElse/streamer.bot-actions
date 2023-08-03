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
                id: "EventSubscribe",
                events: {
                    general: ["Custom"],
                    Twitch: ["ChatMessage", "PollCompleted", "PollUpdated"],
                    YouTube: ["Message"],
                },
            })
        );
    };

    ws.onmessage = async (event) => {
        const wsdata = JSON.parse(event.data);

        if (wsdata == "error") {
            console.error(wsdata);
            return;
        }

        if (wsdata.status == "ok" || typeof wsdata.event === 'undefined') {
            //console.info(wsdata);
            return;
        }

        console.debug(wsdata.data);


        /**
         * Manage Gamestates
         */
        switch (wsdata.data.name) {
            case "Start Game":
                settings.defaultMode = settings.mode;

                // Checking if the game should run in another mode
                if (wsdata.data.arguments.type) {
                    settings.mode = wsdata.data.arguments.type;
                }

                setupGame();
                break;

            case "Stop Game":
                // Todo: Call to end the game
                break;

            default:
                break;
        }

        /**
         * Handle Interactions from diferent Platforms
         */
        if (currentPokemon) {

            switch (settings.mode) {
                case "direct":
                    if (voting && wsdata.event.type === "ChatMessage" || wsdata.event.type === "Message") {

                        // Check if message is only one word
                        if (wsdata.data.message.message.split().length == 1) {
                            checkAnswer(wsdata.data.message.displayName, wsdata.data.message.message);
                        }
                    }

                    break;
                case "poll":
                    // Checking if poll was run by script
                    if (poll) {
                        switch (wsdata.event.type) {
                            case "PollCompleted":
                                // Check if a pokemon poll is already running
                                // Checks if poll was triggered by script

                                pollChoice = wsdata.data.winningChoice.title;
                                choiceVotes = wsdata.data.winningChoice.votes;

                                console.info("Chat voted: " + pollChoice + " Votes: " + choiceVotes);

                                if (choiceVotes != 0 && pollChoice == currentPokemon.names[settings.language].name) {
                                    console.info("Chat was correct");
                                    answer = true;
                                } else {
                                    console.info("Chat was incorrect");
                                    answer = false;
                                }

                                revealPokemon(currentPokemon.names[settings.language].name, answer)

                                poll = false;
                                break;

                            case "PollUpdated":
                                // Todo: This could add a counter on options
                                // wsdata.data.choices.x.title
                                // wsdata.data.choices.x.votes
                                break;
                            default:
                                break;
                        }

                    }
                    break;
                case "auto":
                    // Auto Mode is just for show. This will only show and not interact with chat
                    break;
                default:
                    break;

            }
        }
    }

    ws.onclose = function () {
        setTimeout(connectws, 10000);
    };
};



/**
 * Starts a new game and resets a old one
 * Controlls direct and auto
 */
function setupGame() {
    // Setting up a clear game
    choices = [];

    if (settings.mode === "direct") {
        voting = true;
    }

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
            revealPokemon(currentPokemon.names[settings.language].name, false);

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
async function fetchPokeApi(pokeId) {
    console.info("Loading pokedex data for id: " + pokeId);

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeId}`);
        const data_1 = await response.json();
        return data_1;
    } catch (error) {
        return console.warn(error);
    }
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

        clearTimeout(autoreveal);

        $("#pokemon").addClass("show " + settings.animations.revealPokemon);
        voting = false;

        if (settings.mode == "auto") {
            revealPokemon(answer, true)
        }
        else {
            endGame(username, answer);
        }
    }
}


//Todo: Merge endGame and revealPokemon
function endGame(user, PokemonName) {

    ws.send(JSON.stringify({
        "request": "ExecuteCodeTrigger",
        "triggerName": "wtp_reveal_pokemon",
        "args": {
            "username": user,
            "pokemon": PokemonName,
        },
        "id": "WTP_END_USER",
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
    settings.mode = settings.defaultMode;
}


// Reveal the pokemon and send infoarmation to Streamer.Bot
function revealPokemon(PokemonName, answer) {

    poll = false;
    voting = false;

    $("#pokemon").addClass("show " + settings.animations.revealPokemon);
    settings.end.play();

    ws.send(JSON.stringify({
        "request": "ExecuteCodeTrigger",
        "triggerName": "wtp_reveal_pokemon",
        "args": {
            "pokemon": PokemonName,
            "chat": answer
        },
        "id": "WTP_END_REVEAL"
    }));

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
    if (settings.mode != "auto") {
        settings.mode = settings.defaultMode;
    } else {

    }
}

/**
 * Sends in chat that voting is open
 * Enable Voting command
 */
function startPoll(choices) {

    console.info("Starting a poll on twitch");

    ws.send(
        JSON.stringify({
            "request": "ExecuteCodeTrigger",
            "triggerName": "wtp_start_vote",
            "args": {
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
