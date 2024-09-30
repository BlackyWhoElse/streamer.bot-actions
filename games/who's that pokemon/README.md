# Preview

![ezgif com-gif-maker](https://user-images.githubusercontent.com/2930941/189086776-e23c9c78-6f18-4cdb-808e-2c49b28abe56.gif)

The cult classic ad time game from Pokemon is now in your stream. Let your viewers play this awesome minigame against each other in chat or together by voting on a poll.

## Gamemodes
### Direct
After showing the pokemon silhouette every message will be searched for the correct answer.
The first users to answer correctly will be tagged in a closing message from the bot.
### Poll
After showing the pokemon silhouette a poll will be created with 4 choices. All viewers can vote, and the result will be displayed after the voting time.
### Auto
After showing the pokemon silhouette a timer counts down and the pokemon will be displayed without input.

# How to use

## OBS
- Add index.html as a '**Browser Source**' and set the width and height to your liking. You can drag and drop the HTML into your preview. 
Note: It's better to add this as a separate scene and then add this scene as a source.
## Streamer.Bot
> **You can find the newest version inside the file streamer.bot**
> 
> NOTE: To run these actions you need to add a Command/Trigger or a Channel Point Reward

# Customize

## Settings

| Variable                  | Default                                   | Description                                                           |
|---------------------------|-------------------------------------------|-----------------------------------------------------------------------|
| websocketURL              | "ws://localhost:8080/"                    | The URL to your streamer.bot ws server                                |
| mode                      | direct                                    | Switch between diffrent gamemodes direct,poll,auto                    |
| showChoices               | true                                      | Will show 4 choices on screen so it's easier to guess correctly       |
| language                  | 8                                         | Select one of the languages in the comment for name displaying   1-12 |
| pokemon.from              | 1                                         | Select pokemons form pokeid X                                         |
| pokemon.to                | 151                                       | Select pokemons till id Y                                             |
| animations.revealeChoices | "animate__fadeIn"                         | Reveal animation for choices                                          |
| animations.revealePokemon | "animate__tada"                           | Reveal animation for pokemon                                          |
| direct.hideAfter          | 10000                                     |                                                                       |
| auto.revealAfter          | 5000                                      |                                                                       |
| auto.hideAfter            | 10000                                     |                                                                       |
| poll.voteTime             | 60000                                     |                                                                       |
| intro                     | new Audio("assets/whos-that-pokemon.mp3") | Audio clip playing on game start                                      |
| end                       | new Audio("assets/correct.mp3")           | Audio clip when a user guessed correctly                              |

