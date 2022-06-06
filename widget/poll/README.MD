# Poll Widget
This Widget will show if a Poll is created and auto hide once it's done.

## Todo
- Winning Screen

## Install
#### OBS
- Add index.html to OBS as Browser Source
- Add Show and Hide Transition to your Source 

#### Streamer.Bot
- Import Streamer.Bot Actions and Commands
  - Set under Platform > Twitch > Polls the new actions to the Events [Created Poll, Updated Poll, Completed Poll]
- Inside the 'Created Poll' and 'Completed Poll' action you can show and hide your Source for the transitions to be applied.
- Make sure that Streamer Bot is running while using it and Websocket Server is running on port 8080
  - If it is not possible to run port 8080 swtich the port in script.js 



