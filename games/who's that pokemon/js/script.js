var settings = {
  // Settings
  websocketURL: "ws://localhost:8080/",
  showChoices: true,
  /* language ids
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
  animations: {
    revealeChoices: "animate__fadeIn",
    revealePokemon: "animate__tada",
  },
  // Sounds
  intro: new Audio("assets/whos-that-pokemon.mp3"),
  end: new Audio("assets/correct.mp3"),
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

  ws.onmessage = async (event) => {
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

    if (
      voting &&
      wsdata.event.source === "Twitch" &&
      wsdata.event.type === "ChatMessage"
    ) {
      checkAnswer(wsdata.data.message.displayName, wsdata.data.message.message);
    }
  };

  ws.onclose = function () {
    setTimeout(connectws, 10000);
  };
}

function setupGame() {
  // Setting up a clear game
  choices = [];
  voting = true;
  $("#pokemon").removeClass("show");
  $("#pokemon").removeClass(settings.animations.revealePokemon);
  $("#pokemon").attr(
    "src",
    `` // TODO: Add default Chape
  );
  $("#choices").removeClass(settings.animations.revealeChoices);

  // Loading Pokedex Infos
  currentID = getRandomInt(1, 151);
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
 */
function setChoices() {
  for (let index = 0; index < 3; index++) {
    let id = getRandomInt(1, 151);

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

      $("#choices").addClass(settings.animations.revealeChoices);
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

function checkAnswer(username, answer) {
  if (
    answer.toLowerCase() ==
    currentPokemon.names[settings.language].name.toLowerCase()
  ) {
    settings.end.play();

    $("#pokemon").addClass("show " + settings.animations.revealePokemon);
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
      args: {
        username: user,
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
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
