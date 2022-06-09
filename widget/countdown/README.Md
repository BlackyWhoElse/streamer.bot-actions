<h1 align="center">Countdown Widget</h1>
<p align="center">
    Displays a Countdown with optional description.
</p>

## 📝 Notes
Please be so kind and give me credit or let me know if you implement these overlays or widgets.

This Project is under active maintenance so star or watch this project to be notified if I'm uploading new stuff.
I hope you find that stuff useful.


## 📃 Commands
- !cd set {seconds}
  > Set time in secounds for the countdown
- !cd add {seconds}
  > Adds seconds to the current countdown
- !cd start
- !cd pause
- !cd resume
- !cd stop

## ⬇️ Install
### OBS
- Add index.html to OBS as Browser Source
- Add Show and Hide Transition to your Source

### Streamer.Bot
```
TlM0RR+LCAAAAAAABADtmUtvGzcQgO8B8h+2PmcCvh+9uTkUvRVJih6KHIbk0BEg7ar7iB0E/u/lrmzrHcB2XCCyT5I45HA4/DjDob69flVVZ1+o7WZNffZrJd5MDTUuqPw6+3uWLqivoHrXDHWfmsv6bNUBY18GdKXPP+Pvqvq2+iiiWRpHapE1y9IBZZ1BWePBI2XgPjONVpNVuNI1Dfp3oGGcsR7m83Ur1RjmNOrr24HW7bfmnadU9bPyfS26aJth+T3Tp144v8Sv3fthXHLGebehu8U6NYvzaX370tjUcWhbqvt92Z5Ptvwydenpqr8xfFZfVFdXV1VHRWfqqr6p4r6l06hlS5nKpOk8Tl2KBrbdY+XzECgJ7yNoGyKo4D0EIwUEr1DlnI2Ickf1Jc0uPk8K3+6o7L8uRx/zneZb/25t1Pc2a2VfnehqnGXden379dOuB38fp5jc+GnT8fM5LjtKG9KV8PrNYQKtc8EbzoBFr0BRkoAmRYiaBQosaCbdowl8Nydsq4+Fwfang/DOpuozdlUgqquub5bLstyH8Sek4YQKQZANoHLigNwawCRUjFEQV/r58GeYsJlJDpaxBIqzWE5jTsBIR29ictyKR/P3Jw4dnQ5/y3E5D8WPsxLlJCFIlkrKyVGVlFO8LlTxtpBcMR2fD35SYbKZGCSpGSjBLHjGOZhAxT+ey8j5o/F7T12PbX86ALarBT2YweRZsOgKdGQKgyaUpIMmgvGOOSmtKgn6+TCYkg7CkoNksYRAEQQ4YgxQWI3oWPDW/AgGh8UJxcB2Ws9DAWQ6+BgkgQzIQbFy/wk6EhhmnJfeMpfNMwJQCYWEGrglDSrxAiCqBCbm7EQKRqN+NIAf6GcNgOdVTZfrsqO6nPWft4qSOyhjS/jwqGi0M8XZDDJnHpQcM7PzASx6EZJWXgbxfKBkWYQskwCTHBZv6AhOlMycI0vRJivR0uOhPK28/LisLEsBrFkMwLQqdyHrSk08FibCkVJMMJTCniB/48eq5wqijaFl2GJR9vLgC07XDG2kna1iB8xaUruY9WVf/uqo3TXsTnjQ7NsaKVrvywHgiKLE51IohRw4BI9RO2V0lhtX9qPQz+o4HxLttS+aqZFtemta9jj3LzFVmNLZrpf/eMj7VWya+Ujs+VrF9nmdNxFvDs2GObOLumnpt6ZfA7y9guX4Mtf104koJ/nAibsVsL1B46YcHTishePWfLve0IkdfaC6m/WzL7Q/8mLeBJy/u1nw9swrrYckd5HnUMC5KGGl/7g6V+xY8Pz/qJQ5uhBL1VQCRdl7KSP4SB4M10wFVq5ROj0llVMVfITLe74qvHB5QlyyWK4NzJdo6Vi529vsAJ3wYIUXngmJzISn5PKmOD5C5j0fHF7IPCEydUqJa4GQtCxRSXsEb7UEjNZGChSMt09M5rA4FjLv+QrxAuYJgWl9Voxjufkz7coF02jwKUjgKqNPKVum5FOC2dGxcHnPp4kXKk+IysidJJc1GFO2XUnrwJMqaFrljNNJPHG4/F4av+frxAuXJ8QlWTScqKRxyX1J41JBEM5BSDqTEsYhPmnhM/79fATLe/6b/4Llj8Zy/Pj0+tX1f83421AyJAAA
```
- Make sure that Streamer Bot is running while using it and Websocket Server is running on port 8080
  - If it is not possible to run port 8080 switch the port in script.js

## 🎨 Customize
You can change the appearance of this widget via the '**Custom CSS**' Field inside the '**Browser Source**'. Just copy and paste this CSS there and make your adjustment.

For an easier time customizing your widget open index.html inside a browser and press F12 to open up the Developer console.

```css
:root {
    --timer-rounded-corner: 1rem;
    --timer-color: #FFFFFF;
    --timer-background: #1f1f23;

    --font-family: 'Roboto', sans-serif;
}
```
