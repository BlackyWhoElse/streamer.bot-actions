<h1 align="center">Poll Widget</h1>
<p align="center">
    his Widget will show if a Poll is created and auto hide once it's done.
</p>

## 📝 Notes
Please be so kind and give me credit or let me know if you implement these overlays or widgets.
This Project is under active maintainance so star or watch this project to be notified if im uploading new stuff.
I hope you find that stuff usefull.


## ✔️ Todos
- Winning Screen

## ⬇️ Install
### OBS
- Add index.html to OBS as Browser Source
- Add Show and Hide Transition to your Source

### Streamer.Bot
```
Streamerbot Import String
```
- Import Streamer.Bot Actions and Commands
  - Set under Platform > Twitch > Polls the new actions to the Events [Created Poll, Updated Poll, Completed Poll]
- Inside the 'Created Poll' and 'Completed Poll' action you can show and hide your Source for the transitions to be applied.
- Make sure that Streamer Bot is running while using it and Websocket Server is running on port 8080
  - If it is not possible to run port 8080 swtich the port in script.js



## 🎨 Customize
You can change the apperience of this widget via the '**Custom CSS**' Field inside the '**Browser Source**'. Just copy and pase this css there and make your adjustment.

For an easier time costumising your widget open index.html inside a browser and press F12 to open up the Developer console.

```css
:root {
    --background-color: #0e0e10;
    --timer-color: #9146FF;
    --timer-background: #1f1f23;
    --choice-1-color: #4ca3ff;
    --choice-2-color: #f763ed;
    --choice-3-color: #f7c863;
    --choice-4-color: #68f763;
    --choice-5-color: #f76363;
    --choice-6-color: #63edf7;
    --choice-7-color: #8b63f7;
    --choice-8-color: #f7ed63;
    --choice-9-color: #6392f7;
    --choice-10-color: #f76363;
    --choice-winner: #20961c;
    --choice-background: #18181b;
}
```
