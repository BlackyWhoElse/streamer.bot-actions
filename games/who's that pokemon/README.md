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
Add these actions to Streamer.Bot
```
TlM0RR+LCAAAAAAABADVV9tu4kgQfV9p/8EbKdqXceQrtucNk2AgCZuQcF3moS9lMLTdXl8AM5p/37adTAJkVtpoNLuDhIyrqqtPnTp02Z9//UWSzjaQpAGPzj5K2ofKEKEQxN3ZWX2LSCbcqbD8Wd5L0uf6IlwBLeN8FSPD8U0ZaYYlG9R2ZOxbjuxg0zAREKLotM5VLforh7zMH+WMvVghQphBmS9Lcnhl3xGWU2gnPOwEacaTQoT4iKWvYp4Bjx/vJFm6iqjklZaXgEXC87iMKO0iZLzkv6dStkSZdMfXEIrqX4IR26IiHeTR6UYJiigPmxUhp17CI5InCUTZqe+ExAMiq5AMduXCs/M8haQs6VwKSpAg+UGSZlLGpUUOaW2Ka9gS4WJDkrHiN+mlhCpdnIAPwkmbhPC8wqQcRtTda1igIstXZVvVkGyovi6jhkll5CsKaIau+w4cpd5CsFhWCS+OUmZFXHZCPTJ/5f8o0TeaXqOLKOzKPV6sX55/fjom1is3qNj99LofjKE4BfrKWzu/fHhbycgHSycYy5Zv27LRAEdwYSmybWNAPrIdzbJ+oJIHsAHE3pDoT6XnbiawnT8J9vzDe3Vqgu8T0DXZhgbIhq3rMm6ommxofoOYWHgI/l46PWjoPzW1xvcfKBUMlSIN67IFpvjXmqYvO2ASWdMoMU1CMPGdH6jUhwwl2U996jalCLbSokTK/TegSqtcnMFpWSfQi3dqGImPQRVFVqgjlKtrqpiZKpJt01J8omumYny3s/b/r2ET+5pqgyU3TB3LhqFhwQZyZEBIx5Q0NAD0wzU84tlPp+HDB7avZgopSYL4actj7xogbrJgAydb1oBLRUNE4Gjnytn6OJ+PhWT4Np3PbwOS8JT72UX/6nE+bycCzZYn64Yxn2+MC+VCV3TVmc/DVDyssABfUMYOsbw340ORZhB+93wtoWSoWa9yv0796ZAlXGTQ4rRin076MQ7JYqizPfVG2R9b5frYdrPub7C3Y1N9EGPN3N+sKcPhqEDjW+vynvdbkatOw108LdwV9tp7UriXw6tlDwsbDofCn/ZbQXPRbblbOu6lYt1iGjob3HLb4I1WdDJg1631c0yZU1ybT1970233Ge0MKkyjSfMprv7SsF10hY8KfN1LZdFllOOC7oWNTyf3i6HnJLOxusErOyhrO8jdmS1J4G6xtksfdVdBYycnRdPpeiajhXuLJn3lrtNXSMjy2d7g14/pwd7Ec1J85WypxzY4us3vx4P1tdcuZnofd8M+xxpbzR6UXZcp+chzHmmnV9bArx/WhzV23JLfO9J55re9nrWWSxLS/bjorZDnxFNtmN0GPXrDBpuhPhDcm5HgLC5reuHquBbTnXn3godeRNQ0mGrLDRr32c3jbTB5MIdYfaqtWMTvrE35Rm2nPfIGKgnbFa6yT/1V03qjF6LWdi60lYq+xTga7IfeqBiFjjJ7EH25bJ7kvlfdruBER5PBCrUrHi9JOFpSb8gFdgV7w/SE35a7ppPesqot2C4EL0scmgyL9YJXhaguI2y2ETmO+S1mk7IOYyHqVWdfOXOdy/vYOZ2vhIdxwL5xWFFgqKjO77f9T9PXIDbghi6bFIv3VFUzxCuqYspi7lIdE4ocv/Fvp69Tfv73A7i81JH1FH21VCwLQzGcnuO//A0unqcwFRAAAA==
```

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

