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
All settings can be found in settings.json. These will act as default settings that can be overwritten by a theme.

Note: If you want to use other animations check [here](https://animate.style/)

```json

// Default Settings

{
  "websocketURL": "ws://localhost:8080/",
  "debug": false,
  "debugConsole": false,
  "debugMessageSpeed": 1000,
  "template": "default",
  "ticker": false,
  "platformBadge": true,
  "blacklist": {
    "user": [],
    "words": [],
    "commands": false
  },
  "animations": {
    "animation": true,
    "hidedelay": 0,
    "hideAnimation": "fadeOut",
    "showAnimation": "bounceInRight"
  },
  "YouTube": {
    "defaultChatColor": "#f20000"
  },
  "Twitch": {
    "defaultChatColor": "#9147ff"
  }
}
```

| Variable                   | Default                       | Description                                                                                                                |
|----------------------------|-------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| websocketURL               | ws://localhost:8080/          | The url to your streamer.bot instance. If you run streamer bot out of the box on the same pc you dont have to change that. |
| debug                      | false                         | This is for styling and debuging only. if true it will endlessly add a message to your chat overlay.                       |
| debugConsole               |                               | Toggles console debug on or off                                                                                            |
| debugMessageSpeed          |                               | The speed of how fast messages will be send in debug mode                                                                  |
| template                   | default                       | This sets which theme your chat widget will use. Select an existing theme or create your own.                              |
| ticker                     |                               | Switches themes from normal to ticker mode if supported                                                                    |
| platformBadge              |                               | Shows from what platform the message was send                                                                              |
| blacklist > commands       | false                         | If set to true all messages starting with ! will not be displayed                                                          |
| blacklist > words          | []                            | A list of words who will not be displayed in the chatbox.                                                                  |
| blacklist > user           | ["Nightbot","Jarwiswersonst"] | A list of users who will not be displayed in the chatbox.                                                                  |
| animations > showAnimation | bounceInLeft                  | Animation name to show a message                                                                                           |
| animations > hidedelay     | 0                             | Delay in ms when the message should be hidden. (if 0 the message will stay for ever)                                       |
| animations > hideAnimation | fadeOut                       | Animation name to hide a message                                                                                           |
| animations > animation     | true                          | Use animations for message.                                                                                                |

## Theme Settings
Themes also include a settings.json that will overwrite but not replace these settings.
``` json
// Example Theme Settings

{
  "ticker": false,
  "animations": {
    "animation": true,
    "hidedelay": 0,
    "hideAnimation": "fadeOut",
    "showAnimation": "bounceInRight"
  },
  "YouTube": {
    "defaultChatColor": "#f20000"
  },
  "Twitch": {
    "defaultChatColor": "#9147ff"
  }
}
```

## **CSS**

Inside the :root class are variables that alter the formating of each theme.

You can change the appearance without altering the code via the '**Custom CSS**' Field inside the '**Browser Source**'. Just copy and paste the :root class of the theme and make your adjustment.
```css
:root {
    ...
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
      <img src="{{avatar}}" />
    </div>
    <div class="message">
      <span class="badges">{{badges}}</span>
      <span class="name">{{displayName}}</span>
      <div class="content">{{message}}</div>
      <div class="time">{{time}}</div>
    </div>
  </li>
</template>

<template id="message_youtube">
  <li id="{{msgId}}" class="{{classes}}" style="--userColor:{{color}}">
    <div class="avatar">
      <img class="avatar" src="{{avatar}}" />
    </div>
    <div class="message">
      <span class="name">{{displayName}}</span>
      <div class="content">{{message}}</div>
      <div class="time">{{time}}</div>
    </div>
  </li>
</template>


<template id="reward">
  <li id="{{msgId}}" class="{{classes}}" style="--rewardColor:{{backgroundColor}}">
    <div class="message">
      <span class="name">{{displayName}}</span>
      redeemed
      <span class="content">{{title}}</span>
      <div class="userInput">{{message}}</div>
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
| time             | 19:36                                                  | General  | Time when the message was send                                                        |
| userId           | 27638012                                               | General  | User id provided by twitch/Youtube                                                    |

## Your own Theme
To make sure that your changes are not afected by any updates consider dublicating the theme folder you like (for example tarkov) and rename it the way you want.

You will be able to just use that new name inside the settings.json

## Themes
Here is a list of themes that can be used out of the box. You can use the default settings inside index.html but we recommend some changes depending on the theme.

- [box](../../.github/docs/chat/images/box.png)
- [bubble](../../.github/docs/chat/images/bubble.png)
- [clean](../../.github/docs/chat/images/clean.png)
- [crossing](../../.github/docs/chat/images/crossing.png)
- [default](../../.github/docs/chat/images/default.png)
- [imessage](../../.github/docs/chat/images/imessage.png)
- [tarkov](../../.github/docs/chat/images/tarkov.png)

## Development / settings.html
If you want to develop a theme or use the settings.html you should use a Addon like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) from VSCode.

The code is got more and more complicated so normal browser will nolonger support them wihtout a server in the back.
