# Preview
![prediction](https://user-images.githubusercontent.com/2930941/177168691-6292de1c-6e30-4e6a-bb19-f135f0ea6ab8.png)

**Top Winners**
![topWinners](https://user-images.githubusercontent.com/2930941/177167655-db1e6eb3-cfc9-440d-9cd9-16e7499ed7e0.png)
The number of top winners can be altered via the settings variable inside the script.js

# How to use
## OBS
- Add index.html to OBS as Browser Source
- Add Show and Hide Transition to your Source

## Streamer.Bot (optional)
These actions are just placeholders and will not add any function out of the box. They are only for convenience so you don't have to create your own. All logic is working independently and these are only for additional actions like playing sound or showing prediction. 

Note: If you plan to show and hide the Browser source keep in mind that you have to match the showWinnersTime so it doesn't look bad.

```
TlM0RR+LCAAAAAAABADlVUuL1EAQvgv+h5DzlvS7095EUA8eZEE8iId+VMZgHmMeszss89/tJITJzCxeZIcBIdDp+r56UF9199PrV0mS7rDtiqZO3ybsbjLUtsK4S9N5a30f4S5avo/7JHmalwgVYeRJzzzjJgAyGkB4T8BlwgD1jkollaNCzrEmp98DDmP8eijLoxVr60oc4/XtgCv7oy+HgB/apvpUdH3T7iMlt2W34iwFv7e1xxgk+dJiKKayV3k3bTNsR9q3ImywT+B5mi0f7L67H+rLPK2tQ1O9mz0uUN/UfmhbrPtLbNXDH+fWj2Nd55BvytJuOwwrdAYPd8+rkFvKiUEJzmQMhOMaMmNysC4wSoRhjqnrqNCi7W9chMW2auNE2dly6kpquxC/Y0WrRisTdKa9AOmoB0GUABtbDFJlVCvNjRXuzPEBi83PsSLyhpwi/X475qOEmFNgadSJPn/TaK6wDvg45jlaD8vvSw2eocIaRhlwGqdP5IyDtZyDzrzSlAkuJF5l8D43/teNz91LaYAmw0xpDUIaHq9gZ8CpLAMkWlqhmOPkOof/Hrum3P2vKhAMRDAG8QmMD6GWGgzLc/ACNUfqhNLiKip83Yabv4L/WYRxmZlzJ1eu0a2qYpEL//AH2KEe5uoIAAA=
```
- Make sure that Streamer Bot is running while using it and Websocket Server is running on port 8080
  - If it is not possible to run port 8080 switch the port in script.js

# Customize

## Settings
A settings object can be found in script.js. This can be used to alter animations and core settings.

```js
var settings = {
    websocketURL: "ws://localhost:8080/",
    text: {
        "stringDefaultTitle": `There is no Prediction running right now!`,
        "stringSummery": `So far nobody has voteted yet`,
        "stringResults": `These are the biggest winners of this prediction`,
    },
    animations: {
        clearDelay: 0,
        showWinnersTime: 10000,
    },
    showWinners: true,
    winnerAmount: 3,
};

```
| Variable                   | Default                | Description                                                                                   |
| -------------------------- | ---------------------- | --------------------------------------------------------------------------------------------- |
| websocketURL               | "ws://localhost:8080/" |                                                                                               |
| text                       | []                     |                                                                                               |
| animations.clearDelay      | 0                      | If showWinners is false this will be the delay till the predication is cleared                |
| animations.showWinnersTime | 10000                  | How long the winners should be shown ( This has the match the delay in "Resolved Prediction") |
| showWinners                | true                   | Show the biggest winners of the prediction                                                    |
| winnerAmount               | 3                      | The amount of winner to be shown                                                              |
## CSS

You can change the appearance of this widget via the '**Custom CSS**' Field inside the '**Browser Source**'. Just copy and paste this CSS there and make your adjustment.

For an easier time customizing your widget open index.html inside a browser and press F12 to open up the Developer console.

```css

:root {
     /* Top - flex-start  Bottom - flex-end */
    --widget-grow-position:flex-start;
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
    --outcome-10-color: #63f7ad;
    --font-family: 'Roboto', sans-serif;
    --font-size: 16px;
    --title-font-size: 30px;
    --summery-font-size: 20px;
    --outcome-font-size: 30px;
    --percent-font-size: 40px;
}
```
