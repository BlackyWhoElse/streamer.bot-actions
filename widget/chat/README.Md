<h1 align="center">Advanced Twitch Chat</h1>
<p align="center">
    Flexible Chatbox with Userprofile image and easy to Customize style.
</p>

## 📝 Notes
Please be so kind and give me credit or let me know if you implement these overlays or widgets.

This Project is under active maintenance so star or watch this project to be notified if I'm uploading new stuff.
I hope you find that stuff useful.

## ⬇️ Install
### Streamer.Bot

```
TlM0RR+LCAAAAAAABAB1VNtyokAQfd+q/QfK58VCkGzIm5JIJIkbbyAueZibgAyX5aKSVP59Z2AtUTdUDTDn9JzT3QX98f2bIHR2JMuDJO7cCfKPGohBRNiu02m2ABWMzhnym+8F4aN5MCrAPA4jpPYx3IiI3PbEPlAVUUNAFWWiKrAPiCqrsNGqD/0pScn145LSE0piACnhekVWkhN+TEanBGSC7oOiJeVlSZly1g6wRwpBFAZ4B2JE8GUkoHtQ5bOSl7kBNG85ZCDGSTSoq7xmURKjMstIXFxzV505685Z+qdUahiTHGVB+s/ykg0JSQc02JEryyZhsiEsIUQunGtSv3NdO2AV7XPXfQlQluTJpuhOHhauO8pYNvskC2/6rrvrd6WuIik9zXWjHCUZDWAXU9ppC76dO8OqIHqC64rwapLCCHlLhb5jwyp+7aWnS+w5pK9tfBFZCja0EslahHX1iT1Lzt9Pk4keD3tOdEidariFxugdVcP75YNvQobBaMn4fKJ7dI9tMwf2i+dE2g7qwxExrC1ezeiTHnL+Z63lhSZSZhWw1XhszHxsPHiv82HtN2ULR1bF/BfrlZk69iElkfXqRCl1lGkCWY5Mwxvrg2Y9Mt9gcNrzZag+tJdMcxBM5QN1VuY9MEbSONjX3ro9qtaKVaxtVULVQGPxFLM6zzTYIv/BNtM2NtSeFrzuM4z1xSst2QpYPVsgW9I0NneOPds6q4k0jyc7GPihs5r5x7P6NNw9V0MVKlY1Nno+sPueI2vhej6MoWy9jw2fIt5j3rfIkvDKLMePswrbS95Pk+fE18V3mmYEJVEa0C8+VEwoqOYFyK7/ndb4AKivoB4kYn+jsNuNpoi3kgpFdKMRScMbCG+lC+M9CTyfi0pd6ZwpqpQno/HrnDnOirOxUzNfjJ4mxRiTAzc6oZ/H17fLSWBwi/qnfGsPEEpBmhPcYhuyFmoim6HYOsqORREbTMf4z78O461drAUAAA==
```

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

| Variable      | Default      | Description                                    |
| ------------- | ------------ | ---------------------------------------------- |
| animation     | true         |                                                |
| hidedelay     | 0            | Delay in ms when the message should be removed |
| hideAnimation | fadeOut      |                                                |
| showAnimation | bounceInLeft |                                                |


### **Templates**

Inside the index.hmtl you can find a template for messages. If you want to customise your template you can use the following variables inside the template.

| Variable         | Example               | Description                               |
| ---------------- | --------------------- | ----------------------------------------- |
| avatar           | <img src="..."\>      | Userprofile image 300x300                 |
| classes          | msg animate__animated | Classes used by message wrapper           |
| color            | #B33B19               | Username color                            |
| displayName      | Blackywersonst        | Username that will be displayed in chat   |
| message          | I'm a Message         | Message text                              |
| monthsSubscribed | 57                    | How long the user is subed to the channel |
| msgId            | MessageID             | Message id provided by twitch             |
| role             | 4                     | Role of the user provided by Streamer.bot |
| userId           | 27638012              | User id provided by twitch                |
| time             | 19:36                 | Time when the message was send            |

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
    
    --time-size: 12px;
    --time-align: right;
}
```
