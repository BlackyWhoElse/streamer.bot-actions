
var settings = {
    "websocketURL": "ws://localhost:8080/",
};

window.addEventListener('load', (event) => {
    template = document.querySelector('#todo');
    //connectws();
});

function connectws() {
    if ("WebSocket" in window) {

        console.log("Connecting to Streamer.Bot");
        ws = new WebSocket(settings.websocketURL);
        bindEvents();
    }
}

function bindEvents() {
    ws.onopen = () => {
        ws.send(JSON.stringify({
            "request": "Subscribe",
            "id": "todo",
            "events": {
                "general": [
                    "Custom"
                ],
            }
        }));
    };

    ws.onmessage = async (event) => {
        const wsdata = JSON.parse(event.data);

        if (wsdata.event == null) {
            return;
        }


    };


    ws.onclose = function () {
        setTimeout(connectws, 10000);
    };
}



// Command: !todo create Lorem ipsum dolor | Input : Lorem ipsum dolor
// Command: !todo delete 3 | Input : 3
// Command: !todo toggle 3 | Input : 3
// Command: !todo edit 3 Lorem ipsum dolor | Input : Lorem ipsum dolor


// Command: !list create Lorem ipsum dolor | Input : Lorem ipsum dolor
// Command: !list delete Lorem ipsum dolor | Input : Lorem ipsum dolor
// Command: !list list
// Command: !list load Lorem ipsum dolor | Input : Lorem ipsum dolor

// Add Item
// Remove Item
// Toggle Item
// Create new list
// Load other list

var lists = {
    default : {
        headline : "My default todo list",
        items : {
            0 : ["Lorem ipsum dolor sit amet consectetur adipisicing elit.",0],
            1 : ["Lorem ipsum dolor sit amet consectetur adipisicing elit.",1],
            2 : ["Lorem ipsum dolor sit amet consectetur adipisicing elit.",0],
            3 : ["Lorem ipsum dolor sit amet consectetur adipisicing elit.",0],
            4 : ["Lorem ipsum dolor sit amet consectetur adipisicing elit.",0],
        }
    },
    0 : {
        headline : "My todo list 2#",
        items : {
            0 : ["Lorem ipsum dolor sit amet consectetur adipisicing elit.",0],
            1 : ["Lorem ipsum dolor sit amet consectetur adipisicing elit.",1],
            2 : ["Lorem ipsum dolor sit amet consectetur adipisicing elit.",0],
            3 : ["Lorem ipsum dolor sit amet consectetur adipisicing elit.",0],
            4 : ["Lorem ipsum dolor sit amet consectetur adipisicing elit.",0],
        }
    }
}

function getLists(){

}

function getList() {
    const list = $("#list").children();
}

function setList(list) {

}

function loadList(index){

}

function saveList(list){

}

function deleteList(list){

}


/**
 * Item Getter
 * @param {int} index
 * @returns
 */
function getItem(index) {
    return $("#list").children()[index]
}
/**
 * Alters a exsisting item
 * @param {object} changes  {index:1, value:"Hello world"}
 */
function setItem(changes) {
    item = getItem(changes.index);
    item.getElementsByClassName("value")[0].innerHTML = changes.value;
}

/**
 * Creates a new list item from a user input
 * @param {string} input
 */
function createItem(input) {

    // Get template and populate
    var tpl = template;

    const pattern = /{{\s*(\w+?)\s*}}/g; // {property}
    $("#list").append(tpl.innerHTML.replace(pattern, (_, token) => input[token] || ''));
}

/**
 * Toggles a specific item
 * @param {int} index
 */
function toggleItem(index) {

    // Get item
    item = getItem(index);

    // Find Checkbox
    checkbox = item.getElementsByClassName("state");

    if (checkbox.length > 0 && checkbox[0].checked) {
        checkbox[0].checked = false;
    } else {
        checkbox[0].checked = true;
    }
}
