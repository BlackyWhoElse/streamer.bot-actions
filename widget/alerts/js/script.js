// General Variables
var settings = {
    websocketURL: "ws://localhost:8080/",
    theme: "default",
};

/**
 * Set all events to true that will be used in theme
 * if a template is not defined it will use the default.html theme
 */
const subscribeToEvents = {
    "twitch": {
        "follow": true,
        "cheer": true,
        "sub": true,
        "resub": true,
        "giftsub": true,
        "giftbomb": true,
        "raid": true,
        "hypetrainstart": true,
        "hypetrainupdate": false,
        "hypetrainlevelup": false,
        "hypetrainend": false,
        "adrun": false,
        "coincheer": false,
        "admidroll": false,
    },
    "youtube": {
        "superchat": true,
        "supersticker": true,
        "newsponsor": true,
        "membershipgift": true,
        "giftmembershipreceived": true,
        "newsubscriber": true,
    }
};

/**
 * Default messages that will be user if there is no template defined for the event
 *
 **/
const defaultMessages = {
    "twitch": {
        "follow": "{{username}} just followed!",
        "cheer": "{{username}} just Cheered {{bits}} Bits!",
        "sub": "{{username}} just subscribed with Prime!",
        "resub": "{{username}} just subscribed for {{month}} months!",
        "giftsub": "{{username}} gifted a {{subTier}} subscription to {{recipientUsername}}!",
        "giftbomb": "{{username}} gifted {{gifts}} subscriptions to the community!",
        "raid": "{{from_broadcaster_user_name}} just raided with {{viewers}} viewers!",
        "hypetrainstart": "Hype Train started!",
        "hypetrainupdate": "",
        "hypetrainlevelup": "",
        "hypetrainend": "Hype Train ended!",
        "adrun": "",
        "coincheer": "",
        "admidroll": "",
    },
    "youtube": {
        "superchat": "",
        "supersticker": "",
        "newsponsor": "",
        "membershipgift": "",
        "giftmembershipreceived": "",
        "newsubscriber": "",
    }
};

/***************************************************
 *          DO NOT EDIT ANYTHING BELOW             *
 *        THIS COULD BREAK YOUR WIDGET OR          *
 * BE A PROBLEM IF YOU WANT TO USE A NEWER VERSION *
 ***************************************************/

// Holds all templates
var templates = Array();
/**
 * Will load templates once the page is fully loaded
 * ! Make sure that settings.theme is set.
 */
window.addEventListener("load", (event) => {
    // Loading templates for alerts
    templates[settings.theme] = new Array();
    Object.keys(subscribeToEvents).forEach(platform => {
        // ? Just for debug console.debug(`Loading ${platform} files`);
        templates[settings.theme][platform] = new Array();
        // Loading default html for events
        loadTemplates(settings.theme, 'default', platform);
        Object.keys(subscribeToEvents[platform]).forEach(type => {
            if (subscribeToEvents[platform][type]) {
                loadTemplates(settings.theme, type, platform);
            } else {
                console.info(`${type} was not loaded because it's set to false.`)
            }
        });
    });
    // Connection to Streamer.Bot
    connectws();
});


/**
 * This will load all template,css files in theme/{{theme name}}
 * Check console for errors if you theme doesn't work
 * @param {string} theme
 * @param {string} type
 * @param {string} platform
 */
function loadTemplates(theme, type, platform) {
    var request = $.get(
        `theme/${theme}/${platform}/${type}.html`,
        function (data) {
            templates[theme][platform][type] = data;
            $("#templates").append(data);
        }
    );
}

/**
 * Converts Websocket message into a renderable alert
 * @param {string} platform
 * @param {string} event
 * @param {Array} msg
 * @returns
 */
function renderAlert(platform, type, msg) {
    var tpl;
    msg["default_message"] = defaultMessages[platform][type];
    msg["event"] = type;
    msg["platform"] = platform;

    // Checking if template is defined
    if (templates[settings.theme][platform][type]) {
        tpl = templates[settings.theme][platform][type];
    } else {
        tpl = templates[settings.theme][platform]['default'];
    }

    const pattern = /{{\s*(\w+?)\s*}}/g; // {property}
    return tpl.replace(pattern, (_, token) => msg[token] || "")
}


async function pushAlert(platform, type, msg) {
    return new Promise((resolve, reject) => {
        resolve(renderAlert(platform,type, msg));
        })
        .then((msg) => {
            $("#alert").append(msg);
        })
        .catch(function (error) {
            console.error(error);
        });

}
