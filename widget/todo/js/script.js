
var settings = {
    "websocketURL": "ws://localhost:8080/",
};

var currentList;

// Todo: Fill this with data from Streamer.bot
var lists = [
    {
        id: "default",
        headline: "My default todo list",
        items: {
            0: { value: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", state: 0 },
            1: { value: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", state: 1 },
            2: { value: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", state: 0 },
            3: { value: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", state: 0 },
            4: { value: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", state: 1 },
            5: { value: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", state: 0 },
        }
    },
    {
        id: 0,
        headline: "My todo list 2#",
        items: {
            0: { value: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", state: 0 },
            1: { value: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", state: 0 },
            2: { value: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", state: 1 },
            3: { value: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", state: 0 },
            4: { value: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", state: 0 },
            5: { value: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", state: 0 },
        }
    }
];


window.addEventListener('load', (event) => {
    template = document.querySelector('#todo');
    // Init first list
    currentList = lists[0];
    renderList(currentList);

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



// Command: !todo create Lorem ipsum dolor  | Input : Lorem ipsum dolor
// Command: !todo delete 3                  | Input : 3
// Command: !todo toggle 3                  | Input : 3
// Command: !todo edit 3 Lorem ipsum dolor  | Input : 3, Lorem ipsum dolor


// Command: !list create Lorem ipsum dolor  | Input : Lorem ipsum dolor
// Command: !list delete Lorem ipsum dolor  | Input : Lorem ipsum dolor
// Command: !list list
// Command: !list reload
// Command: !list load Lorem ipsum dolor    | Input : Lorem ipsum dolor

function reloadList(json) {
    // Json to Lists
    currentList = lists[id];
    // reload currentList
    loadList(currentList);
}

function loadList(id) {
    if (lists[id]) {
        saveList(currentList);

        $(`#list li`).remove();

        currentList = lists[id];
        renderList(currentList);
    }
}

function renderList(list) {
    // Get template and populate
    var tpl = template;

    $("#list h1").html(list.headline);

    Object.keys(list.items).forEach(key => {
        list.items[key].id = key;
        const pattern = /{{\s*(\w+?)\s*}}/g; // {property}
        $("#list").append(renderItem(list.items[key]));

        if (list.items[key].state === 1) {
            toggleItem(key);
        }

    });

}

function saveList(list) {
    listid = lists.findIndex((obj => obj.id == list.id));

    lists[listid] = list;
}

function deleteList(list) {
    if (list.id != "default") {
        listid = lists.findIndex((obj => obj.id == list.id));

        lists[listid] = list;
    } else{
        console.error("Default list can not be deleted")
    }
}


/**
 * Item Contorller
 */

/**
 * Alters a exsisting item
 * @param {object} changes  {index:1, value:"Hello world"}
 */
function setItem(changes) {
    $(`#item-${changes.index} .value`).html(changes.value);
}

/**
 * Creates a new list item from a user input
 * @param {string} input
 */
function createItem(input) {

    console.debug(lists[currentList]);

    $("#list").append(renderItem(input));
}

function renderItem(item) {

    // Get template and populate
    var tpl = template;
    const pattern = /{{\s*(\w+?)\s*}}/g; // {property}
    return tpl.innerHTML.replace(pattern, (_, token) => item[token] || '')
}

function deleteItem(id) {
    $(`#item-${id}`).remove();
    listid = lists.findIndex((obj => obj.id == currentList.id));
    delete currentList.items[id];
}

/**
 * Toggles a specific item
 * @param {int} index
 */
function toggleItem(id) {

    // Find Checkbox
    checkbox = $(`#item-${id} .state`);

    if (checkbox.length > 0 && checkbox[0].checked) {
        checkbox[0].checked = false;
    } else {
        checkbox[0].checked = true;
    }
}
