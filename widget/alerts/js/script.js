// General Variables
var settings = {
    websocketURL: "ws://localhost:8080/",
    theme: "default",
    duration: 5000,
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
        "charitystarted": false,
        "charitydonation": false,
        "charitycompleted": false,
        "adrun": false,
        "coincheer": false,
        "admidroll": false,
    },
    "youtube": {
        "superchat": false,
        "supersticker": false,
        "newsponsor": false,
        "membershipgift": false,
        "giftmembershipreceived": false,
        "newsubscriber": false,
    },
    "streamelements": {
        "tip": false,
        "merch": false
    },
    "streamlabs": {
        "donation": false,
        "Merchandise": false,
    }
};

/**
 * Default messages that will be user if there is no template defined for the event
 *
 **/
const defaultMessages = {
    "twitch": {
        "follow": "{{user_name}} just followed!",
        "cheer": "{{username}} just Cheered {{bits}} Bits!",
        "sub": "{{username}} just subscribed with Tier {{subTier}}",
        "primesub": "{{username}} just subscribed with Prime!",
        "resub": "{{userName}} just resubscribed for {{cumulativeMonths}} months!",
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

// A list promisees
var alert_queue = [];

var running = false;

/**
 * Will load templates once the page is fully loaded
 * ! Make sure that settings.theme is set.
 */
window.addEventListener("load", (event) => {
    // Loading templates for alerts
    templates[settings.theme] = new Array();
    $("head").append(
        `<link rel="stylesheet" href="theme/${settings.theme}/css/styles.css" type="text/css" />`
    );
    loadTemplates(settings.theme, 'default', "");

    Object.keys(subscribeToEvents).forEach(platform => {
        // ? Just for debug console.debug(`Loading ${platform} files`);
        templates[settings.theme][platform] = new Array();
        // Loading default html for events
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
function loadTemplates(theme = "default", type, platform = "") {

    path = $.grep([theme, platform, type], n => n == 0 || n).join("/")

    var request = $.get(
        `theme/${path}.html`,
        function (data) {
            if (type != "default") {
                templates[theme][platform][type] = data;
            } else {
                templates[theme][type] = data;
            }

            $("#templates").append(data);
        }
    );
}

/**
 * Converts Websocket message into a render able alert
 * @param {string} platform
 * @param {string} event
 * @param {Array} msg
 * @returns
 */
function renderAlert(platform, type, msg) {
    var template;
    var variant = selectVariant(type, msg);

    const pattern = /{{\s*(\w+?)\s*}}/g; // {property}

    msg["message"] = defaultMessages[platform][type].replace(pattern, (_, token) => msg[token] || "");
    msg["event"] = type;
    msg["platform"] = platform;

    // Checking if template is defined
    if (templates[settings.theme][platform][type]) {
        // Loading template
        template = document.querySelector(`#${settings.theme}_${platform}_${type} `);
        templateContent = template.content.cloneNode(true)

        // Loading the varient
        templateVariant = templateContent.querySelector(`[data-variant='${variant}']`);
        if (!templateVariant) {
            templateVariant = templateContent.querySelector(`[data-variant='default']`);
        }

    } else {
        templateVariant = document.querySelector(`#${settings.theme}_${platform}_default`);
    }

    return templateVariant.innerHTML.replace(pattern, (_, token) => msg[token] || "")
}

/**
 * Displays a alert with the corresponding or default template
 *
 * @param {string} platform
 * @param {string} type
 * @param {string} msg
 * @returns Promise
 */
async function pushAlert(platform, type, msg) {
    return new Promise((resolve, reject) => {
        resolve(renderAlert(platform, type, msg));
    })
        .catch(function (error) {
            console.error(error);
        });

}

/**
 * Adds alerts into a queue system
 * @param {Promise} promiseFn
 */
function addAlertToQueue(promiseFn) {

    alert_queue.push(promiseFn);
    console.debug(`Added alert to queue. Count: ${alert_queue.length}`);
    executeQueue();
}

/**
 * This function will work the queue
 */
function executeQueue() {

    if (alert_queue.length >= 1 && !running) {

        running = true;

        a = alert_queue.shift();
        a.then(alert => {

            time = getDuration(alert);

            // Adding Alert to viewport
            $("#alerts").html(alert);

            // Removing alert and start the next in queue
            setTimeout(() => {
                console.info(`Alert finished`);
                $("#alerts").html("");
                running = false;
                console.debug(`There are ${alert_queue.length} alerts left in queue`);
                executeQueue();
            }, time);
        })
    }
}


/**
 * Defines different varients of events
 * @param {*} type
 * @param {*} msg
 * @returns
 */
function selectVariant(type, msg) {
    var variant;

    switch (type) {
        case 'sub':
            return msg.subTier;
            break;
        case 'resub':
            if (msg.streakMonths > 1) {
                return "streak"
            }
            break;
        case 'giftbomb':
            return msg.gifts;
            break;
        default:
            console.info(`There is no variant defined for ${type}.`)
            break;
    }

    return "default";
}

/**
 * Gets a string of html and converts it into a DOM
 * Then pulls a duration data set to be returned
 *
 * @param {string} HTML string of the alert
 * @returns {int} The duration of the alert
 */
function getDuration(alert) {

    var duration = settings.duration;
    var parser = new DOMParser();

    // Parse the HTML string to create a DocumentFragment
    var doc = parser.parseFromString(alert, 'text/html');
    data = doc.querySelector(`.alert`)

    if (data && data.dataset.duration) {
        duration = data.dataset.duration;
    }

    return duration;
}
