/***************************************************
 ************** DO NOT EDIT THIS FILE **************
 ******** THIS COULD BREAK YOUR WIDGET OR **********
 * BE A PROBLEM IF YOU WANT TO USE A NEWER VERSION *
 ***************************************************/
let ws;
let chat;

let messages = [];

let template_twitch;
let template_youtube;
let template_reward;
let template_css;


/**
 * Storing avatars that have been called to save api calls
 * username: imageURL
 */
var avatars = new Map();

window.addEventListener("load", () => {

    // Init Page by loading settings and more
    $("#settings_json").load(
        `settings.json`,
        function (response, status, xhr) {
            if (status === "error") {
                var msg = "No theme settings loaded: ";
                console.info(msg + xhr.status + " " + xhr.statusText);
            }
            if (status === "success") {
                Object.assign(settings, JSON.parse(response));
                console.info("Default settings loaded")

                chat = document.getElementById("chat");
                template_css = document.getElementById("template_css");

                // Check for ticker
                if (settings.ticker) {
                    chat.classList.add("ticker");
                }

                loadTemplates();
                connectws();
            }
        }
    );
});

/**
 * This will load all template, css files in theme/{{themename}}
 * Check console for errors if you theme doesn't work
 */
function loadTemplates() {
    //  Loading message templates

    $("#settings_json").load(
        `theme/${settings.template}/settings.json`,
        function (response, status, xhr) {
            if (status === "error") {
                var msg = `No theme settings loaded for theme: ${settings.template} `;
                console.info(msg);
            }
            if (status === "success") {
                Object.assign(settings, JSON.parse(response));
            }
        }
    );

    $("#templates").load(
        `theme/${settings.template}/template.html`,
        function (response, status, xhr) {
            if (status === "error") {
                var msg = "Sorry but there was an error: ";
                console.error(msg + xhr.status + " " + xhr.statusText);
            }
            if (status === "success") {
                // Loading template css

                template_css.setAttribute("href", `./theme/${settings.template}/css/styles.css`)

                template_twitch = document.querySelector("#message_twitch");
                template_youtube = document.querySelector("#message_youtube");
                template_reward = document.querySelector("#reward");
            }
        }
    );
}


/**
 * This will change the theme and render stored messages
 * @param template
 */
function changeTheme(template) {

    if (template === 'custom') {
        template = document.getElementById('customTheme').value;
    }
    // Clear Chat
    chat.innerHTML = "";

    // Remove Stylesheet
    $(`link[rel=stylesheet][title=${settings.template}]`).remove();

    // Set new template
    settings.template = template;

    // Load Templates
    loadTemplates();

}

/**
 * Types of messages
 * - Chatmessage
 * - Reward
 * - Message
 *
 * Default variables
 * - message.msgid
 * - message.username
 * - message.badges
 * - message.avatar
 * - message.time
 * - message.classes
 * @param type
 * @param {*} message
 */
async function pushMessage(type, message) {

    // Adding time variable
    var today = new Date();
    message.time = today.getHours() + ":" + String(today.getMinutes()).padStart(2, "0");

    console.debug(message.badges);
    // Mapping for special types
    switch (type) {
        // Chat message from Twitch
        case "chatmessage":

            message.type = 'twitch';
            // Adding default classes
            message.classes = ["msg"];

            if (!message.color) {
                message.color = settings.Twitch.defaultChatColor;
            }
            if (message.isHighlighted) {
                message.classes.push("highlight");
            }
            if (message.isReply) {
                message.classes.push("reply");
            }
            if (message.isCustomReward) {
                message.classes.push("reward");
            }
            if (message.isMe) {
                message.classes.push("me");
            }
            if (message.subscriber) {
                message.classes.push("subscriber");
            }
            if (message.role === 4) {
                message.classes.push("broadcaster");
            }
            if (message.role === 3) {
                message.classes.push("moderator");
            }
            if (message.role === 2) {
                message.classes.push("vip");
            }

            break;

        // Reward message from Twitch
        case "reward":
            message.type = 'reward';
            message.msgId = message.id;
            message.title = message.reward.title;
            message.prompt = message.reward.prompt;
            message.displayName = message.user_name;

            // Adding userInput if not defined
            if (!message.user_input) {
                message.message = "";
            } else {
                message.message = message.user_input;
            }

            // Adding default classes
            message.classes = ["reward"];

            break;

        // Message from YouTube
        case "message":


            message.type = 'youtube';
            // Adding default classes
            message.classes = ["msg"];

            message.msgId = message.messageId;
            message.displayName = message.user.name;
            message.userId = message.user.id;

            message.color = settings.YouTube.defaultChatColor;

            if (message.user.isOwner === true) {
                message.classes.push("owner");
            }
            if (message.user.isModerator === true) {
                message.classes.push("moderator");
            }
            if (message.user.isSponsor === true) {
                message.classes.push("sponsor");
            }
            if (message.user.isVerified === true) {
                message.classes.push("verified");
            }

            break;

    }

    const msg = new Promise((resolve, reject) => {
        // Note: This is to prevent a streamer.bot message to not disappear.
        // - This could be a bug and will maybe be removed on a later date.
        if (message.msgId === undefined) {
            console.debug("Message has no ID");
            message.msgId = makeid(6);
        }

        resolve(getProfileImage(type, message));
    })
        .then((avatar) => {
            message.avatar = avatar;
            return renderBadges(message);
        })
        .then((badges) => {
            message.badges = badges;

            if (message.type === 'twitch') {
                return renderEmotes(message);
            }
            if (message.type === 'youtube') {
                return renderYTEmotes(message);
            }

            return message;
        })
        .then((msg) => {
            $("#chat").append(renderMessage(type, msg));

            if (settings.animations.hidedelay > 0) {
                removeMessage(message.msgId);
            }
        })
        .then(() => {
            //Prevent clipping
            var currentHeight = 0;
            $("#chat").children().each(function () {
                currentHeight += $(this).outerHeight(true);
            });

            var parentHeight = $('#chat').outerHeight(true);
            var count = 0;
            var $chatLine, lineHeight;

            // Checking the Viewport if Elements are to big the
            // oldest will be deleted after hide animation
            // Issue: https://github.com/BlackyWhoElse/streamer.bot-actions/issues/79
            // Todo: This breaks ticker Themes so need a rework

            while (currentHeight > parentHeight) {
                $chatLine = $('.msg').eq(count);
                lineHeight = $chatLine.outerHeight(true);


                /*$chatLine.addClass("animate__" + settings.animations.hideAnimation);
                $chatLine.bind("animationend", function () {
                    $(this).remove();
                });
                */
                currentHeight -= lineHeight;
                count++;
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}

/**
 * Render a message with template
 * @param platform
 * @param {object} message
 * @returns
 */
function renderMessage(platform, message = {}) {

    if (settings.debugConsole) {
        console.debug("Message Data at the end", message);
    }

    if (settings.platformBadge) {
        message.badges = `<div class="platform ${message.type}" title="${message.type}"></div>${message.badges}`;
    }


    switch (platform) {
        case "chatmessage":
            var tpl = template_twitch;
            break;

        case "message":
            var tpl = template_youtube;
            break;

        case "reward":
            var tpl = template_reward;
            break;

        default:
            break;
    }

    if (settings.animations.animation) {
        message.classes.push("animate__animated");

        if (settings.animations.showAnimation) {
            message.classes.push("animate__" + settings.animations.showAnimation);
        }
    }

    // Blacklist word filter
    if (settings.blacklist.words && platform != "Reward") {
        settings.blacklist.words.forEach((word) => {
            regEx = new RegExp(word, "ig")
            message.message = message.message.replace(regEx, "****");
        });
    }

    message.classes = message.classes.join(" ");

    chatHistory(message);

    const pattern = /{{\s*(\w+?)\s*}}/g; // {property}

    result = tpl.innerHTML.replace(pattern, (_, token) => message[token] || "");



    return result;
}

/**
 * @param {Object} message
 */
function chatHistory(message) {

    if (messages.length >= 15) {
        messages.slice(1)
    }

    messages.push(message);
}

/**
 * Hides a message after an amount of time and deletes it aferwards
 * @param {string} msgId
 */
function removeMessage(msgId) {
    console.log("Hide ID " + msgId + "in " + settings.animations.hidedelay);

    const msg = new Promise((resolve, reject) => {
        delay(settings.animations.hidedelay).then(function () {
            $("#" + msgId).addClass("animate__" + settings.animations.hideAnimation);
            $("#" + msgId).bind("animationend", function () {
                $("#" + msgId).remove();
            });
            resolve();
        });
    }).catch(function (error) {
        console.error(error);
    });
}


function addPlatformBadge(message) {
    if (settings.platformBadge) {
        message.badges.unshift({
            name: message.type,
            imageUrl: `./images/platform/${message.type}.png`,
            version: 1
        });
    }

    return message;
}

/**
 * Creates a markup of all Badges, so it can be rendered as one
 * @param {object} message
 * @returns
 */
async function renderBadges(message) {
    var badges = "";

    if (!message.badges) return badges;

    message.badges.forEach((badge) => {
        badges += `<img class="${badge.name}" title="${badge.name}" src="${badge.imageUrl}">`;
    });

    return badges;
}

/**
 * Swaping Emote names for emote images
 * Todo: Add a new way to get image url if its unknown
 * https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_5313d0941014484f9995197017132c33/static/light/3.0
 * @param {object} message
 * @returns
 */

const FFZEffects = [
    // Standard
    "ffzX", "ffzY", "ffzCursed", "ffzW",
    // Premium
    "ffzRainbow", "ffzJam",
    "ffzBounce", "ffzSpin", "ffzLeave",
    "ffzArrive",
    // Background Effects
    "ffzHyper", "ffzSlide"
];


function sortEmotes(emotes) {
    // Ensure that the input array is not empty
    if (emotes.length === 0) {
        return null;
    }
    emotes.sort((a, b) => Math.abs(a.endIndex) - Math.abs(b.endIndex));
    return emotes;
}


async function renderEmotes(message) {
    if (!message.emotes || message.emotes.length == 0) return message;

    // Make sure the Emotes are in order
    message.emotes = sortEmotes(message.emotes);

    // Check if Message is emote only
    if (message.message.split(" ").length == message.emotes.length) {
        message.classes.push("emoteonly");
    }

    var emote_key = 0;

    // Adding classes for styles
    Object.entries(message.emotes).forEach(e => {
        const [key, emote] = e;
        message.emotes[key]['classes'] = ["emote"];

        if (emote.type == "FFZGlobal" && FFZEffects.includes(emote.name)) {

            message.emotes[emote_key]["classes"].push(emote.name);
            message.message = message.message.replace(
                emote.name,
                ``
            );
            delete message.emotes[key]
        }
        else {
            emote_key = key
            message.emotes[key]["classes"].push(emote.name);
        }
    });

    let emoteSearchPointer = 0;
    let formattedMessage = "";

    // Render
    message.emotes.forEach((emote) => {

        let searchStr = message.message.substring(emoteSearchPointer);
        let emoteLocation = searchStr.indexOf(emote.name);

        console.log(emoteSearchPointer, searchStr);

        let replacement;

        if (emote.classes.includes("ffzHyper") || emote.classes.includes("ffzSlide")) {
            replacement = `<div class="${emote.classes.join(" ")}" style="background-image:url(${emote.imageUrl})"><div>`;

        } else {
            replacement = `<img class="${emote.classes.join(" ")}" src="${emote.imageUrl}">`
        }

        formattedMessage += searchStr.substring(0, emoteLocation) + replacement + " ";
        emoteSearchPointer += emoteLocation + emote.name.length;
    });

    if (formattedMessage) {
        message.message = formattedMessage + message.message.substring(emoteSearchPointer);
    }

    return message;
}

/**
 * Swaping Emote names for emote images
 * @param {object} message
 * @returns
 */
async function renderYTEmotes(message) {
    // Todo: Find a way to get Emotes https://github.com/BlackyWhoElse/streamer.bot-actions/issues/56
    // Todo: Add it back into renderMessage
    const baseEmoteURL = 'https://yt3.ggpht.com/';
    const suffix = '=w24-h24-c-k-nd';

    const yt_emotes = {
        'pride-flower-rainbow-heart': '8cF4z9clPGshgty6vT3ImAtx_CUvz3TMY-SAu_UKw-x1Z9-2KzcK4OuyAIROrKhyvcabrw',
        'pride-person-earth-intersex': 'Gr-3he7L8jjQFj7aI0kSY1eV4aIsy-vT7Hk5shdakigG9aAJO_uMBmV6haCtK1OHjTEjj1o',
        'pride-person-heart-lesbian': 'tKVZ2TfK5tMLvF88cnz2YNVwuHNgr0eDR9Ef8J0OCkZEHXLFUtH3f6-xSHhqhwd2sL3Tu4I',
        'pride-person-flower-nonbinary': 'le1X4KHLOmK5K1s5xu-owmP_eZK4D0ExyjnMCS6UNqZa-Zh4uEzz3mZnU3jBlLfi14Zpngw',
        'pride-flower-pansexual': 'blSdVv_UpdTn8BIWU6u9oCWhdtpc0-a-3dJeaRX9As6ftLc0OGPJ1PveQEJbUEDzf6by2Xi9',
        'pride-heart-rainbow-philly': '7iYeXsmU2YMcKsKalaKJhirWdDASATIpl_c7Ib7akaRhvz8GChI4xpM0d0dtASjmmWPbg1NG',
        'pride-flowers-turquoise-transgender': 'ovz1T6ay1D1GNFXwwYibZeu_rV5_iSRXWSHR2thQDLLWejVQMqWPUhsUWrMMw1tlBwllYA',
        'pride-fan-rainbow-open': 'lDH5aORWtlc42NxTwiP3aIUIjttLVvE4Q_xIJDuu55DKvYSLeDIysOEKtGuMmEtOLgvZ_zTX',
        'pride-face-pink-earrings': 'utFog-w4fqgJ05xfQFjSdy8jvRBtFCeuWRkLH3IaVJ4WCBrdjDbXzXOprJA_h6MPOuksv0c',
        'pride-unicorn-rainbow-mane': 'fvdANfncTw5aDF8GBq20kHicN5rMVoCMTM3FY8MQbZH9sZXvHy5o48yvHZWN4No5rz8b7-0',
        'pride-people-embracing-two': 'h1zJqFv2R4LzS3ZUpVyHhprCHQTIhbSecqu2Lid23byl5hD5cJdnshluOCyRdldYkWCUNg',
        'pride-face-green-tears': '2BNf4_qBG7mqt1sN-JwThp1srHlDr03xoya9hpIvbgS65HwLaaDz46r3A6dy8JnO2GtLNag',
        'pride-megaphone-rainbow-handle': 'cop1MU9YkEuUxbe8d1NhPl1S9uJ60YSVTMM1gelP7Cy0BICa6Ey_TpxEFFdYITtsUK1cSg',
        'pride-hand-yellow-nails': '1dEPlxkQ1RdZkPo5CLgYvneMQ-BBo63b3nnASEAXoccnVktMjgviKqMj1pjPiK2zTPTc7g',
        'pride-face-orange-flowing': 'RuhTeU8YiT0_NaOYjMmXv77eEw5eO5Bdzfr7ouS0u3ZAK2J4coKGe5g4fN8mJV85jC63hw',
        'yt': 'IkpeJf1g9Lq0WNjvSa4XFq4LVNZ9IP5FKW8yywXb12djo1OGdJtziejNASITyq4L0itkMNw',
        'oops': 'PFoVIqIiFRS3aFf5-bt_tTC0WrDm_ylhF4BKKwgqAASNb7hVgx_adFP-XVhFiJLXdRK0EQ',
        'buffering': '5gfMEfdqO9CiLwhN9Mq7VI6--T2QFp8AXNNy5Fo7btfY6fRKkThWq35SCZ6SPMVCjg-sUA',
        'stayhome': '_1FGHypiub51kuTiNBX1a0H3NyFih3TnHX7bHU06j_ajTzT0OQfMLl9RI1SiQoxtgA2Grg',
        'dothefive': '-nM0DOd49969h3GNcl705Ti1fIf1ZG_E3JxcOUVV-qPfCW6jY8xZ98caNLHkVSGRTSEb7Y9y',
        'elbowbump': '2ou58X5XuhTrxjtIM2wew1f-HKRhN_T5SILQgHE-WD9dySzzJdGwL4R1gpKiJXcbtq6sjQ',
        'goodvibes': '2CvFOwgKpL29mW_C51XvaWa7Eixtv-3tD1XvZa1_WemaDDL2AqevKbTZ1rdV0OWcnOZRag',
        'thanksdoc': 'bUnO_VwXW2hDf-Da8D64KKv6nBJDYUBuo13RrOg141g2da8pi9-KClJYlUDuqIwyPBfvOO8',
        'videocall': 'k5v_oxUzRWmTOXP0V6WJver6xdS1lyHMPcMTfxn23Md6rmixoR5RZUusFbZi1uZwjF__pv4',
        'virtualhug': 'U1TjOZlqtS58NGqQhE8VWDptPSrmJNkrbVRp_8jI4f84QqIGflq2Ibu7YmuOg5MmVYnpevc',
        'yougotthis': 's3uOe4lUx3iPIt1h901SlMp_sKCTp3oOVj1JV8izBw_vDVLxFqk5dq-3NX-nK_gnUwVEXld3',
        'sanitizer': 'EJ_8vc4Gl-WxCWBurHwwWROAHrPzxgePodoNfkRY1U_I8L1O2zlqf7-wfUtTeyzq2qHNnocZ',
        'takeout': 'FizHI5IYMoNql9XeP7TV3E0ffOaNKTUSXbjtJe90e1OUODJfZbWU37VqBbTh-vpyFHlFIS0',
        'hydrate': 'tpgZgmhX8snKniye36mnrDVfTnlc44EK92EPeZ0m9M2EPizn1vKEGJzNYdp7KQy6iNZlYDc1',
        'chillwcat': 'y03dFcPc1B7CO20zgQYzhcRPka5Bhs6iSg57MaxJdhaLidFvvXBLf_i4_SHG7zJ_2VpBMNs',
        'chillwdog': 'Ir9mDxzUi0mbqyYdJ3N9Lq7bN5Xdt0Q7fEYFngN3GYAcJT_tccH1as1PKmInnpt2cbWOam4',
        'elbowcough': 'DTR9bZd1HOqpRJyz9TKiLb0cqe5Hb84Yi_79A6LWlN1tY-5kXqLDXRmtYVKE9rcqzEghmw',
        'learning': 'ZuBuz8GAQ6IEcQc7CoJL8IEBTYbXEvzhBeqy1AiytmhuAT0VHjpXEjd-A5GfR4zDin1L53Q',
        'washhands': 'qXUeUW0KpKBc9Z3AqUqr_0B7HbW1unAv4qmt7-LJGUK_gsFBIaHISWJNt4n3yvmAnQNZHE-u',
        'socialdist': 'igBNi55-TACUi1xQkqMAor-IEXmt8He56K7pDTG5XoTsbM-rVswNzUfC5iwnfrpunWihrg',
        'shelterin': 'gjC5x98J4BoVSEPfFJaoLtc4tSBGSEdIlfL2FV4iJG9uGNykDP9oJC_QxAuBTJy6dakPxVeC',
        ':hand-pink-waving:': 'KOxdr_z3A5h1Gb7kqnxqOCnbZrBmxI2B_tRQ453BhTWUhYAlpg5ZP8IKEBkcvRoY8grY91Q',
        'face-blue-smiling': 'cktIaPxFwnrPwn-alHvnvedHLUJwbHi8HCK3AgbHpphrMAW99qw0bDfxuZagSY5ieE9BBrA',
        'face-red-droopy-eyes': 'oih9s26MOYPWC_uL6tgaeOlXSGBv8MMoDrWzBt-80nEiVSL9nClgnuzUAKqkU9_TWygF6CI',
        'face-purple-crying': 'g6_km98AfdHbN43gvEuNdZ2I07MmzVpArLwEvNBwwPqpZYzszqhRzU_DXALl11TchX5_xFE',
        'text-green-game-over': 'cr36FHhSiMAJUSpO9XzjbOgxhtrdJNTVJUlMJeOOfLOFzKleAKT2SEkZwbqihBqfTXYCIg',
        'person-turqouise-waving': 'uNSzQ2M106OC1L3VGzrOsGNjopboOv-m1bnZKFGuh0DxcceSpYHhYbuyggcgnYyaF3o-AQ',
        'face-green-smiling': 'G061SAfXg2bmG1ZXbJsJzQJpN8qEf_W3f5cb5nwzBYIV58IpPf6H90lElDl85iti3HgoL3o',
        'face-orange-frowning': 'Ar8jaEIxzfiyYmB7ejDOHba2kUMdR37MHn_R39mtxqO5CD4aYGvjDFL22DW_Cka6LKzhGDk',
        'eyes-purple-crying': 'FrYgdeZPpvXs-6Mp305ZiimWJ0wV5bcVZctaUy80mnIdwe-P8HRGYAm0OyBtVx8EB9_Dxkc',
        'face-fuchsia-wide-eyes': 'zdcOC1SMmyXJOAddl9DYeEFN9YYcn5mHemJCdRFQMtDuS0V-IyE-5YjNUL1tduX1zs17tQ',
        'cat-orange-whistling': '0ocqEmuhrKCK87_J21lBkvjW70wRGC32-Buwk6TP4352CgcNjL6ug8zcsel6JiPbE58xhq5g',
        'face-blue-wide-eyes': '2Ht4KImoWDlCddiDQVuzSJwpEb59nZJ576ckfaMh57oqz2pUkkgVTXV8osqUOgFHZdUISJM',
        'face-orange-raised-eyebrow': 'JbCfmOgYI-mO17LPw8e_ycqbBGESL8AVP6i7ZsBOVLd3PEpgrfEuJ9rEGpP_unDcqgWSCg',
        'face-fuchsia-tongue-out': 'EURfJZi_heNulV3mfHzXBk8PIs9XmZ9lOOYi5za6wFMCGrps4i2BJX9j-H2gK6LIhW6h7sY',
        'face-orange-biting-nails': 'HmsXEgqUogkQOnL5LP_FdPit9Z909RJxby-uYcPxBLNhaPyqPTcGwvGaGPk2hzB_cC0hs_pV',
        'face-red-heart-shape': 'I0Mem9dU_IZ4a9cQPzR0pUJ8bH-882Eg0sDQjBmPcHA6Oq0uXOZcsjPvPbtormx91Ha2eRA',
        'face-fuchsia-poop-shape': '_xlyzvSimqMzhdhODyqUBLXIGA6F_d5en2bq-AIfc6fc3M7tw2jucuXRIo5igcW3g9VVe3A',
        'face-purple-wide-eyes': '5RDrtjmzRQKuVYE_FKPUHiGh7TNtX5eSNe6XzcSytMsHirXYKunxpyAsVacTFMg0jmUGhQ',
        'glasses-purple-yellow-diamond': 'EnDBiuksboKsLkxp_CqMWlTcZtlL77QBkbjz_rLedMSDzrHmy_6k44YWFy2rk4I0LG6K2KI',
        'face-pink-tears': 'RL5QHCNcO_Mc98SxFEblXZt9FNoh3bIgsjm0Kj8kmeQJWMeTu7JX_NpICJ6KKwKT0oVHhAA',
        'body-blue-raised-arms': '2Jds3I9UKOfgjid97b_nlDU4X2t5MgjTof8yseCp7M-6ZhOhRkPGSPfYwmE9HjCibsfA1Uzo',
        'hand-orange-covering-eyes': 'y8ppa6GcJoRUdw7GwmjDmTAnSkeIkUptZMVQuFmFaTlF_CVIL7YP7hH7hd0TJbd8p9w67IM',
        'trophy-yellow-smiling': '7tf3A_D48gBg9g2N0Rm6HWs2aqzshHU4CuVubTXVxh1BP7YDBRC6pLBoC-ibvr-zCl_Lgg',
        'eyes-pink-heart-shape': '5vzlCQfQQdzsG7nlQzD8eNjtyLlnATwFwGvrMpC8dgLcosNhWLXu8NN9qIS3HZjJYd872dM',
        'face-turquoise-covering-eyes': 'H2HNPRO8f4SjMmPNh5fl10okSETW7dLTZtuE4jh9D6pSmaUiLfoZJ2oiY-qWU3Owfm1IsXg',
        'hand-green-crystal-ball': 'qZfJrWDEmR03FIak7PMNRNpMjNsCnOzD9PqK8mOpAp4Kacn_uXRNJNb99tE_1uyEbvgJReF2',
        'face-turquoise-drinking-coffee': 'myqoI1MgFUXQr5fuWTC9mz0BCfgf3F8GSDp06o1G7w6pTz48lwARjdG8vj0vMxADvbwA1dA',
        'body-green-covering-eyes': 'UR8ydcU3gz360bzDsprB6d1klFSQyVzgn-Fkgu13dIKPj3iS8OtG1bhBUXPdj9pMwtM00ro',
        'goat-turquoise-white-horns': 'jMnX4lu5GnjBRgiPtX5FwFmEyKTlWFrr5voz-Auko35oP0t3-zhPxR3PQMYa-7KhDeDtrv4',
        'hand-purple-blue-peace': '-sC8wj6pThd7FNdslEoJlG4nB9SIbrJG3CRGh7-bNV0RVfcrJuwiWHoUZ6UmcVs7sQjxTg4',
        'face-blue-question-mark': 'Wx4PMqTwG3f4gtR7J9Go1s8uozzByGWLSXHzrh3166ixaYRinkH_F05lslfsRUsKRvHXrDk',
        'face-blue-covering-eyes': 'kj3IgbbR6u-mifDkBNWVcdOXC-ut-tiFbDpBMGVeW79c2c54n5vI-HNYCOC6XZ9Bzgupc10',
        'face-purple-smiling-fangs': 'k1vqi6xoHakGUfa0XuZYWHOv035807ARP-ZLwFmA-_NxENJMxsisb-kUgkSr96fj5baBOZE',
        'face-purple-sweating': 'tRnrCQtEKlTM9YLPo0vaxq9mDvlT0mhDld2KI7e_nDRbhta3ULKSoPVHZ1-bNlzQRANmH90',
        'face-purple-smiling-tears': 'MJV1k3J5s0hcUfuo78Y6MKi-apDY5NVDjO9Q7hL8fU4i0cIBgU-cU4rq4sHessJuvuGpDOjJ',
        'face-blue-star-eyes': 'm_ANavMhp6cQ1HzX0HCTgp_er_yO2UA28JPbi-0HElQgnQ4_q5RUhgwueTpH-st8L3MyTA',
        'face-blue-heart-eyes': 'M9tzKd64_r3hvgpTSgca7K3eBlGuyiqdzzhYPp7ullFAHMgeFoNLA0uQ1dGxj3fXgfcHW4w',
        'face-blue-three-eyes': 'nSQHitVplLe5uZC404dyAwv1f58S3PN-U_799fvFzq-6b3bv-MwENO-Zs1qQI4oEXCbOJg',
        'face-blue-droopy-eyes': 'hGPqMUCiXGt6zuX4dHy0HRZtQ-vZmOY8FM7NOHrJTta3UEJksBKjOcoE6ZUAW9sz7gIF_nk',
        'planet-orange-purple-ring': 'xkaLigm3P4_1g4X1JOtkymcC7snuJu_C5YwIFAyQlAXK093X0IUjaSTinMTLKeRZ6280jXg',
        'person-yellow-podium-blue': 'N28nFDm82F8kLPAa-jY_OySFsn3Ezs_2Bl5kdxC8Yxau5abkj_XZHYsS3uYKojs8qy8N-9w',
        'baseball-white-cap-out': '8DaGaXfaBN0c-ZsZ-1WqPJ6H9TsJOlUUQQEoXvmdROphZE9vdRtN0867Gb2YZcm2x38E9Q',
        'whistle-red-blow': 'DBu1ZfPJTnX9S1RyKKdBY-X_CEmj7eF6Uzl71j5jVBz5y4k9JcKnoiFtImAbeu4u8M2X8tU',
        'person-turquoise-crowd-surf': 'Q0wFvHZ5h54xGSTo-JeGst6InRU3yR6NdBRoyowaqGY66LPzdcrV2t-wBN21kBIdb2TeNA',
        'finger-red-number-one': 'Hbk0wxBzPTBCDvD_y4qdcHL5_uu7SeOnaT2B7gl9GLB4u8Ecm9OaXCGSMMUBFeNGl5Q3fHJ2',
        'text-yellow-goal': 'tnHp8rHjXecGbGrWNcs7xss_aVReaYE6H-QWRCXYg_aaYszHXnbP_pVADnibUiimspLvgX0L',
        'medal-yellow-first-red': 'EEHiiIalCBKuWDPtNOjjvmEZ-KRkf5dlgmhe5rbLn8aZQl-pNz_paq5UjxNhCrI019TWOQ',
        'person-blue-wheelchair-race': 'ZepxPGk5TwzrKAP9LUkzmKmEkbaF5OttNyybwok6mJENw3p0lxDXkD1X2_rAwGcUM0L-D04',
        'card-red-penalty': 'uRDUMIeAHnNsaIaShtRkQ6hO0vycbNH_BQT7i3PWetFJb09q88RTjxwzToBy9Cez20D7hA',
        'stopwatch-blue-hand-timer': 'DCvefDAiskRfACgolTlvV1kMfiZVcG50UrmpnRrg3k0udFWG2Uo9zFMaJrJMSJYwcx6fMgk',
        'face-turquoise-speaker-shape': 'WTFFqm70DuMxSC6ezQ5Zs45GaWD85Xwrd9Sullxt54vErPUKb_o0NJQ4kna5m7rvjbRMgr3A',
        'octopus-red-waving': 'L9Wo5tLT_lRQX36iZO_fJqLJR4U74J77tJ6Dg-QmPmSC_zhVQ-NodMRc9T0ozwvRXRaT43o',
        'pillow-turquoise-hot-chocolate': 'cAR4cehRxbn6dPbxKIb-7ShDdWnMxbaBqy2CXzBW4aRL3IqXs3rxG0UdS7IU71OEU7LSd20q',
        'hourglass-purple-sand-orange': 'MFDLjasPt5cuSM_tK5Fnjaz_k08lKHdX_Mf7JkI6awaHriC3rGL7J_wHxyG6PPhJ8CJ6vsQ',
        'fish-orange-wide-eyes': 'iQLKgKs7qL3091VHgVgpaezc62uPewy50G_DoI0dMtVGmQEX5pflZrUxWfYGmRfzfUOOgJs',
        'popcorn-yellow-striped-smile': 'TW_GktV5uVYviPDtkCRCKRDrGlUc3sJ5OHO81uqdMaaHrIQ5-sXXwJfDI3FKPyv4xtGpOlg',
        'penguin-blue-waving-tear': 'p2u7dcfZau4_bMOMtN7Ma8mjHX_43jOjDwITf4U9adT44I-y-PT7ddwPKkfbW6Wx02BTpNoC',
        'clock-turquoise-looking-up': 'tDnDkDZykkJTrsWEJPlRF30rmbek2wcDcAIymruOvSLTsUFIZHoAiYTRe9OtO-80lDfFGvo',
        'face-red-smiling-live': '14Pb--7rVcqnHvM7UlrYnV9Rm4J-uojX1B1kiXYvv1my-eyu77pIoPR5sH28-eNIFyLaQHs',
        'hands-yellow-heart-red': 'qWSu2zrgOKLKgt_E-XUP9e30aydT5aF3TnNjvfBL55cTu1clP8Eoh5exN3NDPEVPYmasmoA',
        'volcano-green-lava-orange': '_IWOdMxapt6IBY5Cb6LFVkA3J77dGQ7P2fuvYYv1-ahigpVfBvkubOuGLSCyFJ7jvis-X8I',
        'person-turquoise-waving-speech': 'gafhCE49PH_9q-PuigZaDdU6zOKD6grfwEh1MM7fYVs7smAS_yhYCBipq8gEiW73E0apKTzi',
        'face-orange-tv-shape': 'EVK0ik6dL5mngojX9I9Juw4iFh053emP0wcUjZH0whC_LabPq-DZxN4Jg-tpMcEVfJ0QpcJ4',
        'face-blue-spam-shape': 'hpwvR5UgJtf0bGkUf8Rn-jTlD6DYZ8FPOFY7rhZZL-JHj_7OPDr7XUOesilRPxlf-aW42Zg',
        'face-fuchsia-flower-shape': 'o9kq4LQ0fE_x8yxj29ZeLFZiUFpHpL_k2OivHbjZbttzgQytU49Y8-VRhkOP18jgH1dQNSVz',
        'person-blue-holding-pencil': 'TKgph5IHIHL-A3fgkrGzmiNXzxJkibB4QWRcf_kcjIofhwcUK_pWGUFC4xPXoimmne3h8eQ',
        'body-turquoise-yoga-pose': 'GW3otW7CmWpuayb7Ddo0ux5c-OvmPZ2K3vaytJi8bHFjcn-ulT8vcHMNcqVqMp1j2lit2Vw',
        'location-yellow-teal-bars': 'YgeWJsRspSlAp3BIS5HMmwtpWtMi8DqLg9fH7DwUZaf5kG4yABfE1mObAvjCh0xKX_HoIR23',
        'person-turquoise-writing-headphones': 'DC4KrwzNkVxLZa2_KbKyjZTUyB9oIvH5JuEWAshsMv9Ctz4lEUVK0yX5PaMsTK3gGS-r9w',
        'person-turquoise-wizard-wand': 'OiZeNvmELg2PQKbT5UCS0xbmsGbqRBSbaRVSsKnRS9gvJPw7AzPp-3ysVffHFbSMqlWKeQ',
        'person-blue-eating-spaghetti': 'AXZ8POmCHoxXuBaRxX6-xlT5M-nJZmO1AeUNo0t4o7xxT2Da2oGy347sHpMM8shtUs7Xxh0',
        'face-turquoise-music-note': '-K6oRITFKVU8V4FedrqXGkV_vTqUufVCQpBpyLK6w3chF4AS1kzT0JVfJxhtlfIAw5jrNco',
        'person-pink-swaying-hair': 'L8cwo8hEoVhB1k1TopQaeR7oPTn7Ypn5IOae5NACgQT0E9PNYkmuENzVqS7dk2bYRthNAkQ',
        'person-blue-speaking-microphone': 'FMaw3drKKGyc6dk3DvtHbkJ1Ki2uD0FLqSIiFDyuChc1lWcA9leahX3mCFMBIWviN2o8eyc',
        'rocket-red-countdown-liftoff': 'lQZFYAeWe5-SJ_fz6dCAFYz1MjBnEek8DvioGxhlj395UFTSSHqYAmfhJN2i0rz3fDD5DQ',
        'face-purple-rain-drops': 'woHW5Jl2RD0qxijnl_4vx4ZhP0Zp65D4Ve1DM_HrwJW-Kh6bQZoRjesGnEwjde8F4LynrQ',
        'face-pink-drinking-tea': 'WRLIgKpnClgYOZyAwnqP-Edrdxu6_N19qa8gsB9P_6snZJYIMu5YBJX8dlM81YG6H307KA',
        'person-purple-stage-event': 'YeVVscOyRcDJAhKo2bMwMz_B6127_7lojqafTZECTR9NSEunYO5zEi7R7RqxBD7LYLxfNnXe',
        'face-purple-open-box': '7lJM2sLrozPtNLagPTcN0xlcStWpAuZEmO2f4Ej5kYgSp3woGdq3tWFrTH30S3mD2PyjlQ',
        'awesome': 'xqqFxk7nC5nYnjy0oiSPpeWX4yu4I-ysb3QJMOuVml8dHWz82FvF8bhGVjlosZRIG_XxHA',
        'gar': 'pxQTF9D-uxlSIgoopRcS8zAZnBBEPp2R9bwo5qIc3kc7PF2k18so72-ohINWPa6OvWudEcsC',
        'jakepeter': 'iq0g14tKRcLwmfdpHULRMeUGfpWUlUyJWr0adf1K1-dStgPOguOe8eo5bKrxmCqIOlu-J18',
        'wormRedBlue': 'QrjYSGexvrRfCVpWrgctyB3shVRAgKmXtctM1vUnA78taji1zYNWwrHs1GKBpdpG5A6yK_k',
        'wormOrangeGreen': 'S-L8lYTuP13Ds9TJZ2UlxdjDiwNRFPnj0o4x6DAecyJLXDdQ941upYRhxalbjzpJn5USU_k',
        'wormYellowRed': 'L9TQqjca5x7TE8ZB-ifFyU51xWXArz47rJFU7Pg2KgWMut5th9qsU-pCu1zIF98szO5wNXE',
        'ytg': '7PgbidnZLTC-38qeoqYensfXg7s7EC1Dudv9q9l8aIjqLgnfvpfhnEBH_7toCmVmqhIe4I45',
    };


    Object.keys(yt_emotes).forEach((emoteID) => {
        const emoteURL = `${baseEmoteURL}${yt_emotes[emoteID]}${suffix}`;
        message.message = message.message.replace(
            emoteID,
            `<img class="emote" src="${emoteURL}">`
        );
    });

    return message;
}

/**
 * Calling decapi.me to recive avatar link as string
 * @param {string} username
 * @returns
 */
async function getProfileImage(type, message) {

    username = "";

    switch (type) {
        case "chatmessage":

            username = message.username;

            // Check if avatar is already stored
            if (avatars.get(username)) {
                return avatars.get(username);
            }

            return fetch(`https://decapi.me/twitch/avatar/${username}`)
                .then((response) => {
                    return response.text();
                })
                .then((avatar) => {
                    avatars.set(username, avatar);
                    return avatar;
                });
            break;

        case "message":
            username = message.user.name;

            // Check if avatar is already stored
            if (avatars.get(username)) {
                return avatars.get(username);
            }

            avatars.set(username, message.user.profileImageUrl);
            return message.user.profileImageUrl;
            break;
    }

}

// Command Code
function ClearChat() {
    $("#chat").html("");
}

// Helper Code
function delay(t, v) {
    return new Promise(function (resolve) {
        setTimeout(resolve.bind(null, v), t);
    });
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
