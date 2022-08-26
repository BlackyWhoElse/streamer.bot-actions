var settings = {
    websocketURL: "ws://localhost:8080/",
    intro: new Audio('assets/whos-that-pokemon.mp3'),
    end: new Audio('assets/correct.mp3'),
};

var currentPokemon;
var pokemons = [];
var choices = [];

var voting = false;


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
                    raw: ["Action"],
                    general: ["Custom"],
                    Twitch: ["ChatMessage"],
                    YouTube: ["Message"],
                },
            })
        );
    };

    ws.onmessage = async(event) => {
        const wsdata = JSON.parse(event.data);

        if (wsdata.status == "ok" || wsdata.event.source == null) {
            return;
        }

        console.debug(wsdata);

        // Custom
        // Todo: Add actionID to this if
        if (wsdata.data.name == "Start Game") {
            fetchPokeApi();
        }
        // Twitch

        if (voting && wsdata.event.source === "Twitch" && wsdata.event.type === "ChatMessage") {
            checkAnswer(wsdata.data.message.displayName, wsdata.data.message.message);
        }
    }

    ws.onclose = function() {
        setTimeout(connectws, 10000);
    };
}


function setupGame() {

    // Setting up a clear game
    choices = [];
    voting = true;
    $("#pokemon").removeClass("show");
    $("#pokemon").removeClass("animate__tada");
    $("#pokemon").attr(
        "src",
        `` // TODO: Add default Chape
    );
    $("#choices").removeClass("animate__fadeIn");

    // Loading Pokedex Infos
    currentID = getRandomInt(1, 151);
    if (pokemons[currentID] == undefined) {
        fetchPokeApi(currentID).then(data => {
            currentPokemon = data;
            pokemons[currentID] = data;
            //setPokemon(currentPokemon.id);
            setChoices();
        });
    } else {
        currentPokemon = pokemons[currentID];
        setChoices();
    }


}

/**
 * Fetching a random Pokemon form PokeApi
 */
function fetchPokeApi(pokeId) {

    console.info("Loading pokedex data for id: " + pokeId);

    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch(error => console.warn(error));

}

/**
 * Filling all choices
 */
function setChoices() {

    for (let index = 0; index < 3; index++) {
        let id = getRandomInt(1, 151);

        if (pokemons[id] == undefined) {
            fetchPokeApi(id).then(data => {
                pokemons[id] = data;
                choices[index] = data.name;
            });
        } else {
            choices[index] = pokemons[id].name;
        }
    }
    choices[3] = currentPokemon.name;

    setTimeout(function() {
        shuffle(choices).then(data => {

            for (let index = 0; index < data.length; index++) {
                const name = choices[index];
                $(`.${index+1}`).html(name);
                console.debug(name);
            }

            setPokemon(PokedDexID(currentPokemon.id));

        });
    }, 2000)

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

    $("#choices").addClass("animate__fadeIn");

    // Play mp3 file
    settings.intro.play();
}

function checkAnswer(username, answer) {
    if (answer.toLowerCase() == currentPokemon.name.toLowerCase()) {
        settings.end.play();

        $("#pokemon").addClass("show animate__tada");
        voting = false;
        endGame(username);
    }
}

/**
 * Sends in chat that voting is open
 * Enable Voting command
 */
function endGame(user) {
    ws.send(
        JSON.stringify({
            request: "DoAction",
            action: {
                id: "fca089a2-38df-49b8-88c7-57ec59a5784f",
                name: "End Game",
            },
            "args": {
                "username": user,
            },
            id: "WhosThatPokemonEND",
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

function PokedDexID(id) {
    return ("000" + id).substr(-3);
}

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
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}