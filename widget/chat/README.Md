# Preview
<p align="center">
  <img width="600" height="338" src="https://user-images.githubusercontent.com/2930941/175527378-c20e7abc-c4bb-42a5-bb55-cf8ec97173a7.gif">
</p>

The Advance Chat widget is THE way to go if you want an easy-to-set-up chat overlay but also, like the freedom to add content to messages or even alter the theme or structure.

It includes:
- Twitch and Youtube Messages support
- Profile images for every message (cached)
- Easy to alter CSS variables which can be pasted into the browser source to theme your widget.
- In and out animations [animate.css](https://animate.style/)
- It can differentiate between subscriber and viewer
- Will change emotes sizes if the message only consists of emotes.
- Can clear the overlay completely with an action
- Messages deleted via a mod in chat will be deleted in overlay as well
- Blacklist for users and words
- Easy to alter settings
- Theming System with predefined themes already ready to go. (Default, Clean, Ticker)


#  How to use
## OBS
- Add index.html as a '**Browser Source**' and set the width and height to your liking.
- (optional) If you want to change any CSS variables you can copy-paste the [CSS](https://github.com/BlackyWhoElse/streamer.bot-actions/wiki/Advanced-Chat#css) into the browser source directly.

## Streamer.Bot
### Actions  (optional)
**Widget - Advanced Chat**
- Clear Chat
This action will delete all messages from the widget. It is not needed but a nice to have.

```
TlM0RR+LCAAAAAAABACdVV1zojoYvt+Z/Q8erw8OAn6wd0orq916qlWQHnsRklekBsLhQ0t3+t9PAnUFtbMz60wG8z7J834ked6fX780Gs09xInPwua3hvJ3YQhRAHzWbJZThFMOJ9zyr5g3Gj/LD4d8ItZppK0T6CKp7SodSVMIltyei6SestkgjKGnE1xyFZv+yyAT/GFG6ckKIXIpCL40zuBkPwZjUEBxw9ii1GWvFTYvZlkkFtg+8SBtSFfWIHpAeTLPRI4bRJMKfYxCwoJBkeIlilmIsziGML3ELspSK00t9lMohZlAgmM/+nB5ju4AogH193DhsgwYNsADwnDmuQCNb+u17fOMDsl6fe/jmCVsk7amt4v1ehTzaA4s3nW19XqvteSWKqttfb0OEsxi6rstQmmzSvhc9+zmKRiMFBmR1TRyA+wtVfpGTCv95yDfndt+7OhD1b4ILJWYeoYVPSBG545/M4HfzNjUCIdtJ3iNnHz44pqjN5wPb5a324nLbW6w5HgyNTx6IPYkQfa95wT63jWGIzCtF7Ka0ztjJ/BeweXtJlid58juhGNzviXmrffwOCz8zfgggZVz/4un1SRy7NcIAuvBCSLqqDPm8hg5hzc2BuX4zv36g9NcDLOzde0l5xz4M+WVOqvJDTJH8tg/FL4Ne5Q/qVb6ZHdknA90vp4SnmeNgw+4YtvMqrahfrcQeddsvC5eZimWz/N5QYolz8LJ3rHnL85qKj+G073rb3fOar497jVmu/2PfNhxVSsfm+0tsjXPUfTd0+MwdBXrbWxuKRY1FnULLJmsJtn4+zwn9lLUcyJiEuPsnkYxYBZEPv3kohKgKH9MUXz5dira0W9vkKJuutJG6XQlDTRF6hPSlVAXdXW53wNd35w5PoDvbQWp3JLrSJpHIhhd/OrIUSVqmlMgn+hOGWJI4FU4Olnfj3+fz5XAFC6KR/lcFRBKUZQAqaAlWBCVK0tFrGzl24KAC9NVzU1YFl+8fvlKWBHEgZ+mQJYJV/izwH6BV8P+0PWe3lWASzoBTZW0dh+kvqsrktYn/FhA15DWbv5ewf0Q06yQjbo9KLVErlarSFv4/gsLvcdcypvnhR7/SdPBjFEui+HgRFHvP5Rh9KHIlYh8L2QxDFk6wJhlRRuoJxGJ5pmkhgAhvtZBjoBysUmcy6cbsxMoTqfSWJpKr6v25bYiSI/m94pLlMAjhImfXmsiTY8yF1Hjox71dEun15BfbfYehciDQLTEKorCdFG+Prl6v79+ef8fnm3Oo2UIAAA=
```

- This Widget requiers Streamer.Bot 0.18+
- Start Websocket Server under 8080
    - If that is not possible match the port in js/script.js


# 🎨 Customize

## **Settings**

> [!CAUTION]
> This is out of date and needs to be updated

A settings object can be found in index.html. This can be used to alter animations and core settings.

Note: If you want to use other animations check [here](https://animate.style/)

```javascript
var settings = {
    "websocketURL": "ws://localhost:8080/",
    "debug": false,
    "template": "default",
    "blacklist": {
        "user": ["Nightbot",],
        "words": [],
        commands:false,
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
|-----------------|-------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| websocketURL    | ws://localhost:8080/          | The url to your streamer.bot instance. If you run streamer bot out of the box on the same pc you dont have to change that. |
| debug           | false                         | This is for styling and debuging only. if true it will endlessly add a message to your chat overlay.                       |
| theme           | default                       | This sets which theme your chat widget will use. Select an existing theme or create your own.                              |
| blacklist user  | ["Nightbot","Jarwiswersonst"] | A list of users who will not be displayed in the chatbox.                                                                  |
| blacklist words | []                            | A list of words who will not be displayed in the chatbox.                                                                  |
|commands| false| If set to true all messages starting with ! will not be displayed |
| animation       | true                          | Use animations for message.                                                                                                |
| hidedelay       | 0                             | Delay in ms when the message should be hidden. (if 0 the message will stay for ever)                                       |
| hideAnimation   | fadeOut                       | Animation name to hide a message                                                                                           |
| showAnimation   | bounceInLeft                  | Animation name to show a message                                                                                           |

## **CSS**
You can change the appearance of this widget via the '**Custom CSS**' Field inside the '**Browser Source**'. Just copy and paste this CSS there and make your adjustment.

For an easier time customizing your widget open index.html inside a browser and press F12 to open up the Developer console.


### Default Example
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

## Chat Themes
### Default Example
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
|------------------|--------------------------------------------------------|----------|---------------------------------------------------------------------------------------|
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

## Themes
Here is a list of themes that can be used out of the box. You can use the default settings inside index.html but we recommend some changes depending on the theme.


### box
| Variable      | Example |
|---------------|---------|
| hideAnimation | ""      |
| showAnimation | ""      |

**CSS Variables**
```css
:root {
    --message-background-color: transparent;
    --badge-spacing: 2px;
    --emote-spacing: 2px;
    --font-size: 16px;
    --font-color: #fff;
    --font-family: 'Roboto', sans-serif;
    --animate-duration: .3s;
    --animate-delay: 0;
}
```

### bubble *based on [whitep4nth3r](https://www.twitch.tv/whitep4nth3r)*
| Variable      | Example         |
|---------------|-----------------|
| hideAnimation | "bounceOutLeft" |
| showAnimation | "bounceInLeft"  |
**CSS Variables**
```css
:root {
    /** Left: row Right: row-reverse */
    --chat-align: row;
    --avatar-size: 50px;
    --avatar-gap: 16px;
    --message-gap-bottom: 16px;
    --message-background-color: #18181b;
    --badge-size: 15px;
    --badge-spacing: 2px;
    --emote-size: 16px;
    --emote-only-size: 32px;
    --time-size: 12px;
    --font-color: #fff;
    --font-size: 16px;
    --font-family: 'Roboto', sans-serif;
    --spacing-right: 25px;
    --animate-duration: .3s;
    --animate-delay: 0;
}
```

### bubble_ticker *based on [whitep4nth3r](https://www.twitch.tv/whitep4nth3r)*
| Variable      | Example         |
|---------------|-----------------|
| hideAnimation | "bounceOutLeft" |
| showAnimation | "bounceInRight" |

**CSS Variables**
```css
:root {
    /** Left: row Right: row-reverse */
    --chat-align: row;
    --avatar-size: 50px;
    --avatar-gap: 16px;
    --message-gap-bottom: 16px;
    --message-background-color: #18181b;
    --broadcaster-background-color: #18181b;
    --subscriber-background-color: #18181b;
    --moderator-background-color: #18181b;
    --highlight-background-color: #18181b;
    --badge-size: 15px;
    --badge-spacing: 2px;
    --emote-size: 16px;
    --emote-only-size: 32px;
    --time-size: 12px;
    --font-color: #fff;
    --font-size: 1em;
    --font-family: 'Roboto', sans-serif;
    --spacing-right: 25px;
}
```
### clean
| Variable      | Example |
|---------------|---------|
| hideAnimation | ""      |
| showAnimation | ""      |

**CSS Variables**
```css
:root {
    --message-background-color: transparent;
    --badge-spacing: 2px;
    --emote-spacing: 2px;
    --font-size: 16px;
    --font-color: #fff;
    --font-family: 'Roboto', sans-serif;
    --animate-duration: .3s;
    --animate-delay: 0;
}

```
### crossing
| Variable      | Example   |
|---------------|-----------|
| hideAnimation | "fadeOut" |
| showAnimation | "fadeIn"  |

**CSS Variables**
```css
:root {
    /** Left: row Right: row-reverse */
    --chat-align: row;
    --message-gap-bottom: 5px;
    --name-background-color: #db559b;
    --message-background-color: #fdfae2;
    --badge-size: 15px;
    --badge-spacing: 2px;
    --emote-size: 16px;
    --emote-only-size: 32px;
    --font-color: #3c3a2d;
    --font-size: 16px;
    --font-family: 'Roboto', sans-serif;
    --time-size: 12px;
    --time-align: right;
    --animate-duration: .3s;
    --animate-delay: 0;
}
```
### default
| Variable      | Example         |
|---------------|-----------------|
| hideAnimation | "fadeOut"       |
| showAnimation | "bounceInRight" |

**CSS Variables**
```css
:root {
    /** Left: row Right: row-reverse */
    --chat-align: row;
    --avatar-size: 80px;
    --avatar-gap: 16px;
    --message-padding: 16px;
    --message-gap-bottom: 16px;
    --message-background-color: #18181b;
    --rewardColor: purple;
    --badge-size: 15px;
    --badge-spacing: 2px;
    --emote-size: 16px;
    --emote-only-size: 32px;
    --font-color: #fff;
    --font-size: 16px;
    --font-family: 'Roboto', sans-serif;
    --time-size: 12px;
    --time-align: right;
    --animate-duration: .3s;
    --animate-delay: 0;

}
```
### tarkov
| Variable      | Example |
|---------------|---------|
| hideAnimation | ""      |
| showAnimation | ""      |

**CSS Variables**
```css
:root {
    --avatar-size: 45px;
    --avatar-gap: 15px 10px;
    --message-gap-bottom: 10px;
    --message-background-color: #191b1b;
    --message-boarder-color: #c0cad0;
    --badge-size: 15px;
    --badge-spacing: 2px;
    --emote-size: 16px;
    --emote-only-size: 32px;
    --font-color: #b5bec4;
    --font-size: 16px;
    --font-family: 'Roboto', sans-serif;
    --time-size: 12px;
    --time-align: right;
    --animate-duration: .3s;
    --animate-delay: 0;
}
```
### ticker
| Variable      | Example         |
|---------------|-----------------|
| hideAnimation | "bounceOutLeft" |
| showAnimation | "bounceInRight" |

**CSS Variables**
```css
:root {
    --message-background-color: #18181b18;
    --badge-spacing: 2px;
    --emote-spacing: 2px;
    --font-size: 16px;
    --font-color: #fff;
    --font-family: 'Roboto', sans-serif;
    --animate-duration: .3s;
    --animate-delay: 0;
}
```

