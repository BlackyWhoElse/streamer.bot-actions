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
TlM0RR+LCAAAAAAABADllEFr3DAQhe+F/gez5wgsS7ak3kqgzaGHECg9lB5mpFEwkaWNbCcNIf+98ppQk815D9mTmPfejAZ92M+fP1XV7oHy2Ke4+1I1FwchwkCl2u3WEuxU7LEov5e6qp7Xo1i9W3IIQgJYZN4YYhIRGUrbMg1IWnltpDLrrEPT/UzzMj/OIfxXKQIGWuZNeaaN/teG2dG3nIarfpxSfioRD2HcZF4XvoRoqQyprjO5/rD25t7bnOb9EvvVu1uaKvZ+DMIjPI03czy+J0N0afi6dhy5NkU750xxOvY2b/jnrfp92eutZVMIsB/JbdzVfLl4n4J2HAWIhjntOyY7KgCMVYwjUWMJVd3Wp6GQCaYzhYCtFwKFZqJ2LZOqFgwIiGHD0SsltMTTQPiR7N2ZMrCGLHTkGSdCJrl1TNeuKSA82BqxbjichMENjSk8nCkF7muOjXRMGV4odMowUzflS8COlDRSt+BOQuHn3n3839FyrMn1JTetpW0YypKv+Zd/H7r/sfYHAAA=
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
