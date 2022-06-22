var settings = {
    "websocketURL": "ws://localhost:8080/",
};

var currentList;

// Todo: Fill this with data from Streamer.bot
var lists;


window.addEventListener('load', (event) => {

    $.getJSON("./todo.json", function(json) {
        lists = json; // this will show the info it in firebug console

        template = document.querySelector('#todo');
        // Init first list
        currentList = lists[0];
        renderList(currentList);

        connectws();
    });
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

    ws.onmessage = async(event) => {
        const wsdata = JSON.parse(event.data);

        console.debug(wsdata);

        if (wsdata.event == null) {
            return;
        }

        switch (wsdata.data.name) {
            case "CreateItem":
                createItem(wsdata.data.arguments);
                break;

            case "DeleteItem":
                deleteItem(wsdata.data.arguments.id);
                break;
            case "ToggleItem":
                toggleItem(wsdata.data.arguments.id);
                break;


            default:
                console.log(wsdata.data.name)
                break;
        }

    };


    ws.onclose = function() {
        setTimeout(connectws, 10000);
    };
}


// Done Command: !todo create Lorem ipsum dolor  | Input : Lorem ipsum dolor
// Done Command: !todo delete 3                  | Input : 3
// Done Command: !todo toggle 3                  | Input : 3
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

function saveList() {

    lists[listIdtoIndex(currentList.id)] = currentList;

    ws.send(JSON.stringify({
        "request": "DoAction",
        "action": {
            "id": "a9dc14fb-6781-4599-a32f-021cb93d6a88",
            "name": "Update List"
        },
        "args": {
            "list": JSON.stringify(lists),
        },
        "id": "UpdateList"
    }));
}


function deleteList(list) {
    if (list.id != "default") {
        listid = listIdtoIndex(list.id);

        lists[listid] = list;
    } else {
        console.error("Default list can not be deleted")
    }
}

function listIdtoIndex(id) {
    return lists.findIndex((obj => obj.id == id));
}

/**
 * Item Contorller
 */

/**
 * Alters a exsisting item
 * @param {object} changes  {index:1, value:"Hello world"}
 */
function updateItem(changes) {
    $(`#item-${changes.index} .value`).html(changes.value);
}

/**
 * Creates a new list item from a user input
 * @param {string} input
 */
function createItem(input) {

    if (input.value == 'undefined' || input.state == 'undefined') {
        console.error("Invalid Input");
        return;
    }

    id = getNewId();
    input["id"] = id;
    currentList.items[id] = input;
    saveList();


    $("#list").append(renderItem(input));
}

function renderItem(item) {

    // Get template and populate
    var tpl = template;
    const pattern = /{{\s*(\w+?)\s*}}/g; // {property}
    return tpl.innerHTML.replace(pattern, (_, token) => item[token] || '')
}

function deleteItem(index) {

    id = itemIndexToID(index);
    $(`#item-${id}`).remove();
    delete currentList.items[id];

    saveList();
}

/**
 * Toggles a specific item
 * @param {int} index
 */
function toggleItem(index) {
    id = itemIndexToID(index);

    // Find Checkbox
    checkbox = $(`#item-${id} .state`);

    if (checkbox.length > 0 && checkbox[0].checked) {
        checkbox[0].checked = false;
    } else {
        checkbox[0].checked = true;
    }
}

function itemIndexToID(index) {

    // -1 the id because normal users count from 1
    index = index - 1;
    return Object.keys(currentList.items)[index];
}

function getNewId() {
    count = Object.keys(currentList.items).length;
    id = itemIndexToID(count);
    if (!id) {
        id = 0;
    }
    return parseInt(id) + 1
}