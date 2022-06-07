<h1 align="center">Advanced Twitch Chat</h1>
<p align="center">
    Flexible Chatbox with Userprofile image and easy to Customize style.
</p>

## 📝 Notes
Please be so kind and give me credit or let me know if you implement these overlays or widgets.
This Project is under active maintainance so star or watch this project to be notified if im uploading new stuff.
I hope you find that stuff usefull.


## ✔️ Todos
- Clear Chat Command
- Seperated ChatMessage template for easier editing

## ⬇️ Install
### Streamer.Bot
- This Widget requiers Streamer.Bot 0.18+
- Start Websocket Server under 8080
    - If that is not posible match the port in js/script.js
### OBS
- Add index.html as a '**Browser Source**' and set the width and height to your likeing.

## 🎨 Customize
You can change the apperience of this widget via the '**Custom CSS**' Field inside the '**Browser Source**'. Just copy and pase this css there and make your adjustment.

For an easier time costumising your widget open index.html inside a browser and press F12 to open up the Developer console.

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
