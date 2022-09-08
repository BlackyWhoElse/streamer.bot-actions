# Preview
[Example coming soon]

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
TlM0RR+LCAAAAAAABADlVttu4zYQfS/Qf1ADBH0JDVF3LbAPtjd27k2c2I5T54GXkaw1dVld7CiL/HspaZ04dlKgwTbdRQ0QEucMZw5nDil//fUXRdlZQJoFcbTzQdH2akNEQpCznZ1mSlgu4Uxa/qzmivK1eUgo4JUfsXXsqRpHmqqayNA0glyMGfKYgzXXA6Yxq4lVL/pSQFHFjwohnqwQESqgipenBazZ75goOPTSODwIsjxOS+niEZGt+awI70dc6VfvT5CfxkVSYZVdQcp4Fv+eKfmM5Mp5PIdQ7vvJmYglKbNBEW2nSEnE47Bdl2IbZXHEijSFKN/Gtsr3rIS1Sw531cKd3SKDtNrMrhJUJEHxgjTLlTxW/AKyxpQ0tBUWy4QsF+VvytMW6nBJCh5IkLcZi4uak/rco+mbzk3dwtxFqkoMZKjAkEMcijSdWjrXZUcNayP0EgJ/VgdsbYTMy6TqAd4wP9Z/I9Ar7W7YRRzuqhxP1ofV6+1mYftVgrq6t+v9EIIkGfA1tAEf9l7WMCa2im2TIuKaHjJA1RG1MUW66jDPANtRufEuGh7AAoh4QZw/lZIPc8lt95tUd/feqlCH2jY2PBcRBlKhuscRBVVDJjMMQ+MMXAO+l0KftfLv2tnw+w80yjypRV3KEzzHQYaLdeRwbCKXMTAtB1saeZ979jInaf5T37RtJYKl4ldMY+8FqsrnQt67WbVP4K03qhdsgnXbchDzLECGxwE5psUQs4C6qmE6lvs/Ui8hmNnctpCuMYYM29QQ0TBBFndVHRhjxDDfUb1XQQjpS/IdB9yHXAq4W/WWx8sfSbePnJQZyRQKEK1E+kaNUvAoN02+umFtA7kq0ZFqmg4hzDVszf1xNLr3Wn2e/2V9NHPIWBok31qyic4BkrYIFrDVkqahVQUhYrDRmRrsfphOx5JivMym09OApXEWe3nrbP9qOu2lks0yTueWMZ0ujJba0lUdu9NpmMk/bSKgLS7EznrA2+eZaZlDN+b1jvj1WUJD5g91cc/7o/yPpXq8aTuZi/N1+1U40nnfLZjmhrxrHstnUeGfLuKzbtTBk/AumZSdz7Tfu2dl59Nwf3ZEpY2GQ4lnZ11fLPn4KCPjU38Sugva7fSgP/rMrwfiuDuvcLuO5c+PmD4oydiMDvuDGe/v++eXnTrfhRw8HJUy/9XN9VEyGd8lEI7OJ2EiJvpFTCVHGcM/7LabcSDzBu2neTX65oyOhzJmOxjqgxmLBkMyxoIFh5lce9S9EDMWckzHo4IfnFa5i5trth3npdgH6jObdzlv9rRmu8CdwxPBxSQ6W0y0XPD9o5JqvflE693z/eSeakZ80++pk9VaWY+T0vFh7GIWdPLJWBSH/bPFTX/o32iukLWOZS1EzV0++cGopEFHZdFIVP3pXktOkRz+x4/b55nFYRKIV8TKQZCyvtlexpvTzj1qaJY841g3ifwiURURVXOQhy0A0/HA1vR/etrd6vc9Dzz+Nz5K1aPxbL4sa0vlsjCUl/fK/+EvjL5/7RcPAAA=
```

# Customize

## Settings
These are located inside index.html. 

| Variable                  | Default                                   | Description                                                           |
|---------------------------|-------------------------------------------|-----------------------------------------------------------------------|
| websocketURL              | "ws://localhost:8080/"                    | The URL to your streamer.bot ws server                                |
| mode                      | direct                                    | Switch between diffrent gamemodes direct,poll,auto                    |
| showChoices               | true                                      | Will show 4 choices on screen so it's easier to guess correctly       |
| language                  | en                                        | Select one of the languages in the comment for name displaying   1-12 |
| pokemon.from              | 1                                         | Select pokemons form pokedex id X                                     |
| pokemon.to                | 151                                       | Select pokemons till pokedex id Y                                     |
| animations.revealeChoices | "animate__fadeIn"                         | Reveal animation for choices                                          |
| animations.revealePokemon | "animate__tada"                           | Reveal animation for pokemon                                          |
| intro                     | new Audio("assets/whos-that-pokemon.mp3") | Audio clip playing on game start                                      |
| end                       | new Audio("assets/correct.mp3")           | Audio clip when a user guessed correctly                              |

