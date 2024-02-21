$('document').ready(function () {

  // Get all checkboxes and the ul element by their IDs
  const checkboxes = $('.checkbox');
  // Add a change event listener to each checkbox
  checkboxes.each(function () {
    $(this).on('change', handleSettingsChange);
  });
});

function handleSettingsChange(event) {
  const switch_data = event.target.dataset;
  let propertyName = event.target.dataset.settingsName;
  let value = event.target.checked;

  console.debug('Checkbox info:', switch_data);

  if (settings.hasOwnProperty(propertyName)) {
    settings[propertyName] = value;
    console.debug(`Updated ${propertyName} to ${value}`);

    switch (propertyName) {
      case "ticker":
        chat.classList.toggle("ticker");
        break;
      case "debug":
        debugMessages();
        break;
      default:
        break;
    }
  } else {
    console.debug(`${propertyName} is not a valid property in the settings object`);
  }



}

/**
 * Gets the Theme name from a Form Element
 * @param {FormData} selectElement
 */
function handleThemeChange(selectElement) {
  const textFieldContainer = document.getElementById('customThemeContainer');
  const customTextField = document.getElementById('customTheme');

  // Reset and hide the text field
  textFieldContainer.style.display = 'none';

  // Check if the selected option is the custom option
  if (selectElement.value === 'custom') {
    // Show the text field
    textFieldContainer.style.display = 'block';
  } else {
    changeTheme(selectElement.value);
    console.log("Load new theme " + selectElement.value)
  }
}

/**
 * # Debug Mode
 * This will constantly generate new messages with random values
 * Name and profile picture are combined but color,message and role will be random
 *
 * The debug mode is for longtime test and themeing.
 *
 */
let dev = false;

function debugMessages() {

  const badges = [
    [{
      "name": "vip",
      "version": "1",
      "imageUrl": "https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/3"
    },
    {
      "name": "subscriber",
      "version": "0",
      "imageUrl": "https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/3"
    }
    ],
    [{
      "name": "premium",
      "version": "1",
      "imageUrl": "https://static-cdn.jtvnw.net/badges/v1/bbbe0db0-a598-423e-86d0-f9fb98ca1933/3"
    }],
    [{
      "name": "broadcaster",
      "version": "1",
      "imageUrl": "https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/3"
    },
    {
      "name": "subscriber",
      "version": "0",
      "imageUrl": "https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/3"
    },
    {
      "name": "glhf-pledge",
      "version": "1",
      "imageUrl": "https://static-cdn.jtvnw.net/badges/v1/3158e758-3cb4-43c5-94b3-7639810451c5/3"
    }
    ]
  ];
  const names = [
    { name: "stormen", displayName: "Stormen" },
    { name: "pestily", displayName: "Pestily" },
    { name: "shivfps", displayName: "ShivFPS" },
    { name: "faide", displayName: "Faide" },
    { name: "toastracktv", displayName: "Toastracktv" },
    { name: "esl_csgo", displayName: "ESL_CSGO" },
    { name: "stodeh", displayName: "Stodeh" },
    { name: "spatzetiger", displayName: "Spatzetiger" },
    { name: "burritodyson", displayName: "BurritoDyson" },
    { name: "nerdl1ft", displayName: "NerdL1ft" },
  ];
  const msgs = [
    "Welcome",
    "If you ate pasta and antipasta, would you still be hungry?",
    "go on",
    "Oh goodness bunch of sensitive cry babies on twitter!",
    "tell me more",
    "you will be part of it all",
    "Would be, cause Im asking",
    "ask and I will tell",
    "meaning?",
    "Now I am interested, go on",
    "you will be next week",
    "I see you find yourself very interesting",
    "Hi how are you?",
    "I am fantastic and feeling astonishingly glorious",
    "What did you want to be when you grew up?",
    "I feel like I am taking crazy pills!",
    "maybe you are",
    "Sometimes I am",
    "Go on",
    "I drink diced kitten to make other people more interesting",
    "Go on",
    "Is there a spell to become a mermaid that actually works?",
    "Love Spell - To write a successful love letter, rub the entire sheet of stationary with lavender before you start writing",
    "Greetings",
    "hello",
    "wazzup",
    "Which common saying or phrase describes you?",
    "the one on the left",
    "Is the game really over?",
    "Not that there's anything wrong with that",
    "You smell different when you're awake",
    "When a clock is hungry it goes back four seconds",
    "tommorow",
    "Would you rather have one real get out of jail free card or a key that opens any door?",
    "you like yourself alot right",
    "Are you a robot?",
    "How are you?",
    "Happy birthday!",
  ];
  const colors = [
    "#a5cc64",
    "#25c532",
    "#a2c014",
    "#01314f",
    "#4ad4d4",
    "#B33B19",
    "#20dd24",
    "#c859f7",
  ];

  if (!dev) {
    console.debug('Init debug message');
    dev = setInterval(() => {
      console.info("Debug Message");
      if (!settings.debug) {
        clearInterval(dev);
        dev = false;
        return;
      }

      // Generating random role
      let r = Math.floor(Math.random() * (4 - 1 + 1) + 1)

      let n = names[Math.floor(Math.random() * names.length)];

      let message = {
        bits: 0,
        badges: badges[Math.floor(Math.random() * badges.length)],
        emotes: [],
        channel: n.name,
        color: colors[Math.floor(Math.random() * colors.length)],
        displayName: n.displayName,
        firstMessage: Math.random() < 0.5,
        hasBits: Math.random() < 0.5,
        internal: Math.random() < 0.5,
        isAnonymous: Math.random() < 0.5,
        isCustomReward: false,
        isHighlighted: Math.random() < 0.5,
        isMe: Math.random() < 0.5,
        isReply: Math.random() < 0.5,
        message: msgs[Math.floor(Math.random() * msgs.length)],
        monthsSubscribed: 57,
        msgId: makeid(12),
        role: r,
        subscriber: Math.random() < 0.5,
        userId: 27638012,
        username: n.name,
        time: "19:36",
      };

      pushMessage('chatmessage', message);
    }, settings.debugMessageSpeed);
  }
}

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
