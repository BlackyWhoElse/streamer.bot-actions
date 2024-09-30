# Preview
<p align="center">
  <img width="600" height="338" src="https://user-images.githubusercontent.com/2930941/175527378-c20e7abc-c4bb-42a5-bb55-cf8ec97173a7.gif">
</p>

The Advance Chat widget is THE way to go if you want an easy-to-set-up chat overlay but also, like the freedom to add content to messages or even alter the theme or structure.

It includes:
- Twitch and Youtube Messages support
    > - Youtube support is currently under development. (In Testing)
    > - You will only get messages from youtube if you are live and the livestream is public.
- Profile images for every message (cached)
- Easy to alter CSS variables which can be pasted into the browser source to theme your widget.
- In and out animations [animate.css](https://animate.style/)
- It can differentiate between subscriber and viewer
- Will change emotes sizes if the message only consists of emotes.
- Can clear the overlay completely with an action
- Messages deleted via a mod in chat will be deleted in overlay as well
- Blacklist for users and words
- Easy to alter settings


#  How to use
## OBS
- Add index.html as a '**Browser Source**' and set the width and height to your liking.
- (optional) If you want to change any CSS variables you can copy-paste the [CSS](https://github.com/BlackyWhoElse/streamer.bot-actions/wiki/Advanced-Chat#css) into the browser source directly.

## Streamer.Bot
> **You can find the newest version inside the file streamer.bot**
> 
> NOTE: To run these actions you need to add a Command/Trigger or a Channel Point Reward

- This Widget requiers Streamer.Bot 0.18+
- Start Websocket Server under 8080
    - If that is not possible match the port in js/script.js


# Note
- Youtube support is currently under development.
- You will only get messages from youtube if you are live and the livestream is public.

# 🎨 Customize

### **Settings**

A settings object can be found in index.html. This can be used to alter animations and core settings.

Note: If you want to use other animations check [here](https://animate.style/)

```javascript
var settings = {
    "websocketURL": "ws://localhost:8080/",
    "debug": false,
    "template": "default",
    "blacklist": {
        "user": ["Nightbot",],
        "words": []
    },
    "animations": {
        "animation": true,
        "hidedelay": 0,
        "hideAnimation": "fadeOut",
        "showAnimation": "bounceInLeft"
    },
    "YouTube": {
        "defaultChatColor": "#f20000",
    },
    "Twitch": {
        "defaultChatColor": "#9147ff",
    },
};
```

| Variable        | Default                       | Description                                                                                                                |
| --------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| websocketURL    | ws://localhost:8080/          | The url to your streamer.bot instance. If you run streamer bot out of the box on the same pc you dont have to change that. |
| debug           | false                         | This is for styling and debuging only. if true it will endlessly add a message to your chat overlay.                       |
| theme           | default                       | This sets which theme your chat widget will use. Select an existing theme or create your own.                              |
| blacklist user  | ["Nightbot","Jarwiswersonst"] | A list of users who will not be displayed in the chatbox.                                                                  |
| blacklist words | []                            | A list of words who will not be displayed in the chatbox.                                                                  |
| animation       | true                          | Use animations for message.                                                                                                |
| hidedelay       | 0                             | Delay in ms when the message should be hidden. (if 0 the message will stay for ever)                                       |
| hideAnimation   | fadeOut                       | Animation name to hide a message                                                                                           |
| showAnimation   | bounceInLeft                  | Animation name to show a message                                                                                           |

### **CSS**
You can change the appearance of this widget via the '**Custom CSS**' Field inside the '**Browser Source**'. Just copy and paste this CSS there and make your adjustment.

For an easier time customizing your widget open index.html inside a browser and press F12 to open up the Developer console.


#### Default Example
```css
:root {
    /** Left: row Right: row-reverse */
    --chat-align: row;
    --avatar-size: 80px;
    --avatar-gap: 16px;
    --message-padding: 16px;
    --message-gap-bottom: 16px;
    --message-background-color: #18181b;
    --badge-size: 15px;
    --badge-spacing: 2px;
    --emote-size: 16px;
    --emote-only-size: 32px;
    --font-color: #fff;
    --font-size: 16px;
    --font-family: 'Roboto', sans-serif;
    --time-size: 12px;
    --time-align: right;
}
```

### Message Template
#### Default Exam
![Message Example](https://i.imgur.com/lxdTTeF.png)

Inside the the theme folder you can find the template.hmtl.  
This file will define the structure of your message.   
To create your own just copy one theme and pasted it with your theme name as folder name.  
If you want to customise your template you can use the following variables inside the template.  

```html
<template id="message_twitch">
    <li id="{{msgId}}" class="{{classes}}" style="--userColor:{{color}}">
        <div class="avatar">
            {{avatar}}
        </div>
        <div class="message ">
            <span class="badges">{{badges}}</span>
            <span class="name">{{displayName}}</span>
            <div class="content">{{message}}</div>
            <div class="time">{{time}}</div>
        </div>
    </li>
</template>

<template id="message_youtube">
    <li id="{{eventId}}" class="{{classes}}" style="--userColor:{{color}}">
        <div class="avatar">
            {{avatar}}
        </div>
        <div class="message ">
            <span class="name">{{displayName}}</span>
            <div class="content">{{message}}</div>
            <div class="time">{{time}}</div>
        </div>
    </li>
</template>
```


| Variable         | Example                                                | Platform | Description                                                                           |
| ---------------- | ------------------------------------------------------ | -------- | ------------------------------------------------------------------------------------- |
| avatar           | <img src="..."\>                                       | General  | Userprofile image 300x300                                                             |
| classes          | msg animate__animated subscriber                       | Twitch   | Classes used by message wrapper                                                       |
| classes          | msg animate__animated owner moderator sponsor verified | Youtube  | Classes used by message wrapper                                                       |
| color            | #B33B19                                                | General  | Username color. If no color is provided it will use the predefiend color in script.js |
| displayName      | Blackywersonst                                         | General  | Username that will be displayed in chat                                               |
| message          | I'm a Message                                          | General  | Message text                                                                          |
| monthsSubscribed | 57                                                     | Twitch   | How long the user is subed to the channel                                             |
| msgId            | MessageID                                              | General  |                                                                                       |
| role             | 4                                                      | General  | Role of the user provided by Streamer.bot                                             |
| userId           | 27638012                                               | General  | User id provided by twitch/Youtube                                                    |
| time             | 19:36                                                  | General  | Time when the message was send                                                        |
