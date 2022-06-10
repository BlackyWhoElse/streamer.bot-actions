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
    - If that is not possible match the port in js/settings.json
### OBS
- Add index.html as a '**Browser Source**' and set the width and height to your liking.

## 🎨 Customize

### **Settings**

A settings file found inside the js folder. This can be used to alter animations and core settings.

Note: If you want to use other animations check [here](https://animate.style/)

```json
{
    "websocketURL": "ws://localhost:8080/",
    "blacklist": {
        "user": [
            "Nightbot"
        ],
        "words:": []
    },
    "animations": {
        "animation" : true,
        "hidedelay": 0,
        "hideAnimation": "fadeOut",
        "showAnimation": "bounceInLeft"
    },
    "template": "message"
}
```
### **Templates**

Inside the index.hmtl you can find a template for messages. If you want to customise your template you can use the following variables inside the template.

| Variable         | Example                              | Description                               |
|------------------|--------------------------------------|-------------------------------------------|
| avatar           | <img src="..."\>                     | Userprofile image 300x300                 |
| classes          | msg animate__animated                | Classes used by message wrapper           |
| color            | #B33B19                              | Username color                            |
| displayName      | Blackywersonst                       | Username that will be displayed in chat   |
| message          | I'm a Message                        | Message text                              |
| monthsSubscribed | 57                                   | How long the user is subed to the channel |
| msgId            | 337d6353-d43a-4d21-b734-94d04688ff01 | Message id provided by twitch             |
| role             | 4                                    | Role of the user provided by Streamer.bot |
| userId           | 27638012                             | User id provided by twitch                |
| username         | blackywersonst                       | Base username                             |
| time             | 19:36                                | Time when the message was send            |

```html
<template id="message">
    <li id="{{msgId}}" class="{{classes}}">
        <div class="avatar">
            {{avatar}}
        </div>
        <div class="message ">
            <span class="badges">{{badges}}</span>
            <span class="name" style="--userColor:{{color}}">{{displayName}}</span>
            <div class="content">{{message}}</div>
            <div class="time">{{time}}</div>
        </div>
    </li>
  </template>
```

### **CSS**
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
