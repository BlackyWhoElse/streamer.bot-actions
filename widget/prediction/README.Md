<h1 align="center">Prediction Widget</h1>
<p align="center">
    his Widget will show if a Poll is created and auto hide once it's done.
</p>

## 📝 Notes
Please be so kind and give me credit or let me know if you implement these overlays or widgets.

This Project is under active maintenance so star or watch this project to be notified if I'm uploading new stuff.
I hope you find that stuff useful.


## ✔️ Todos
- Summery not updating
- Calc Win Ratio s

## ⬇️ Install
### OBS
- Add index.html to OBS as Browser Source
- Add Show and Hide Transition to your Source

### Streamer.Bot
```
Streamerbot Import String coming soon
```
- Make sure that Streamer Bot is running while using it and Websocket Server is running on port 8080
  - If it is not possible to run port 8080 switch the port in script.js

## 🎨 Customize
You can change the appearance of this widget via the '**Custom CSS**' Field inside the '**Browser Source**'. Just copy and paste this CSS there and make your adjustment.

For an easier time customizing your widget open index.html inside a browser and press F12 to open up the Developer console.

```css
:root {
    --background-color: #0e0e10;
    --timer-color: #9146FF;
    --timer-background: #1f1f23;
    --spacer-color: #18181b;
    --outcome-1-color: #4ca3ff;
    --outcome-2-color: #f763ed;
    --outcome-3-color: #f7c863;
    --outcome-4-color: #68f763;
    --outcome-5-color: #f76363;
    --outcome-6-color: #63edf7;
    --outcome-7-color: #8b63f7;
    --outcome-8-color: #f7ed63;
    --outcome-9-color: #6392f7;
    --outcome-10-color: #f76363;

    --font-family: 'Roboto', sans-serif;
}
```
