# Preview 
From 2 Choices
![1v1-Poll](https://user-images.githubusercontent.com/2930941/177127308-ca4646cc-6107-4769-bc00-295898278d81.png)
Up to 5 Choices
![5-choices-poll](https://user-images.githubusercontent.com/2930941/177155388-f3027da5-1fc0-4cd9-9749-a90a4cbe36ad.png)
This poll widget is all you need to display polls on your stream. Easy to customize and alter. 

It includes:
- 2 Choice layout for yes or no answers
- Supports up to 5 choices
- Shows the winning choice with a little animation
- Easy to alter style

# How to use
## OBS
- Add index.html to OBS as Browser Source
- Add Show and Hide Transition to your Source

## Streamer.Bot
> **You can find the newest version inside the file streamer.bot**

These actions are just placeholders and will not add any function out of the box. They are only for convenience so you don't have to create your own. All logic is working independently and these are only for additional actions like playing sound or showing poll. 

**Note**: If you plan to show and hide the Browser source keep in mind that you have to match the showWinnerTime so it doesn't look bad.

- Make sure that Streamer Bot is running while using it and Websocket Server is running on port 8080
  - If it is not possible to run port 8080 switch the port in script.js



# 🎨 Customize

## Settings
A settings object can be found in script.js. This can be used to alter animations and core settings.

```js
var settings = {
    websocketURL: "ws://localhost:8080/",
    text: {
        "stringDefaultTitle": `There is no poll running right now`,
    },
    animations: {
        showWinnerTime: 15000,
        hideLoosers: true,
    },
};

```
| Variable                   | Default                | Description |
| -------------------------- | ---------------------- | ----------- |
| websocketURL               | "ws://localhost:8080/" |             |
| text                       | []                     |             |
| animations.hideLoosers     | 0                      |             |
| animations.showWinnersTime | 10000                  |             |


## CSS
You can change the appearance of this widget via the '**Custom CSS**' Field inside the '**Browser Source**'. Just copy and paste this CSS there and make your adjustment.

For an easier time customizing your widget open index.html inside a browser and press F12 to open up the Developer console.

```css
:root {
    /* Top - flex-start  Bottom - flex-end */
    --widget-grow-position: flex-start;
    --background-color: #0e0e10;
    --timer-color: #9146FF;
    --timer-background: #1f1f23;
    --font-family: 'Roboto', sans-serif;
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
    --choice-winner-color: #20961c;
    --choice-background: #18181b;
}
```
