var intro = new Audio('assets/whos-that-pokemon.mp3');


function fetchPokeApi() {
  fetch(`https://pokeapi.co/api/v2/pokemon/${getRandomInt(1, 151)}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      pokedexID = ("000" + data.id).substr(-3);

      setPokemon(pokedexID);

    });
}

function setPokemon(pokedexID) {
  //Set pokemon img src
  $("#pokemon").attr(
    "src",
    `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokedexID}.png`
  );
  // Play mp3 file
  intro.play();
}

/***************
 * Helper Code *
 ***************/

function getRandomInt(max, min = 0) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
