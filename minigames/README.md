
## Game Steps
- 3 Sek Countdown
- Show what to count for 4 sec
- Visual/Audio q that counting is starting
- Visual/Audio q that counting has stoped
- Drumroll x sec to wait for answers
- Show Answer
- Reward points
- Repeat x times


## Action Steps
- Init Game
    - setting up arguments and broadcast via webhook
    - WS Event : Build Game
    - Action: Show Game
- Show Game
    - Szene Visibility : TRUE
    - Action: Wait for Players
- Wait for Players
    - Enable !join command
    - Waiting for Players (Delay)
    - Disable !join command
    - WS: Start Game
- Enable Answers
    - Enable [0-9] command
- Check Answer
    -  Check if input = answer
- Disable Answers
    - Disable [0-9] command
- End Game
    - Szene visibility : FALSE

## Websocket Events
- Build Game
- Waiting for Players
- Add Player
- Start Game
- Clear Game
- Show Winner

First Build -> Wait for 4 Players -> Start Game -> Show Question -> Start Race -> Wait for Answers -> Show correct -> Add Points to Players -> Start new Round