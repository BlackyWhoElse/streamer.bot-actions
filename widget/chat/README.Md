<h1 align="center">Advanced Twitch Chat</h1>
<p align="center">
    Flexible Chatbox with Userprofile image and easy to Customize style.
</p>

## 📝 Notes
Please be so kind and give me credit or let me know if you implement these overlays or widgets.

This Project is under active maintenance so star or watch this project to be notified if I'm uploading new stuff.
I hope you find that stuff useful.


## ✔️ Todos
- Clear Chat Command
- Separated ChatMessage template for easier editing

## ⬇️ Install
### Streamer.Bot
- This Widget requiers Streamer.Bot 0.18+
- Start Websocket Server under 8080
    - If that is not possible match the port in js/script.js
### OBS
- Add index.html as a '**Browser Source**' and set the width and height to your liking.

## 🎨 Customize
You can change the appearance of this widget via the '**Custom CSS**' Field inside the '**Browser Source**'. Just copy and paste this CSS there and make your adjustment.

For an easier time customizing your widget open index.html inside a browser and press F12 to open up the Developer console.

```css
:root {
    --avatar-size: 80px;
    --avatar-gap-right:1rem;

    --message-padding:1rem;
    --message-gap-bottom:1rem;
    --message-background-color: #18181b;

    --badge-size:15px;
    --badge-spacing:2px;

    --emote-size:15px;

    --font-color: #fff;
    --font-size: 16px;
    --font-family: 'Roboto', sans-serif;

}
```
