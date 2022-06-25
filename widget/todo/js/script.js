var settings = {
    "websocketURL": "ws://localhost:8080/",
};

var currentList;
var lists;

$(document).ready(function() {
    $.getJSON("./todo.json", function(json) {
        lists = json;

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
            case "ItemCreate":
                createItem(wsdata.data.arguments);
                break;

            case "ItemDelete":
                deleteItem(wsdata.data.arguments.id);
                break;
            case "ItemToggle":
                toggleItem(wsdata.data.arguments.id);
                break;
            case "ItemEdit":
                editItem(wsdata.data.arguments);
                break;

            case "ListLoad":
                loadList(wsdata.data.arguments.index);
                break;
            case "ListPrint":
                printList();
                break;
            case "ListCreate":
                createList(wsdata.data.arguments.headline);
                break;
            case "ListDelete":
                deleteList(wsdata.data.arguments.index);
                break;

            default:
                console.log(wsdata.data.name);
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
// Done Command: !todo edit 3 Lorem ipsum dolor  | Input : 3, Lorem ipsum dolor


// Done Command: !list create Lorem ipsum dolor  | Input : Lorem ipsum dolor
// Done Command: !list delete 1  | Input : Lorem ipsum dolor
// Done Command: !list all
// Done Command: !list load 1    | Input : 1

function reloadList(json) {
    // Json to Lists
    currentList = lists[id];
    // reload currentList
    loadList(currentList);
}

function loadList(index) {

    if (lists[index]) {
        $(`#list li`).remove();

        currentList = lists[index];
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
            "name": "List Update"
        },
        "args": {
            "list": JSON.stringify(lists),
        },
        "id": "UpdateList"
    }));
}

function printList() {
    message = "";
    for (let index = 0; index < lists.length; index++) {
        const element = lists[index];
        console.debug(element);
        message += `[${index}] ${element.headline}, `;
    }

    ws.send(JSON.stringify({
        "request": "DoAction",
        "action": {
            "id": "2fbc6f75-530f-442b-9052-3bda4942662e",
            "name": "List Message"
        },
        "args": {
            "message": message,
        },
        "id": "TodoMessage"
    }));
}

function createList(name) {

    newList = {
        headline: name,
        id: lists.length,
        items: {}
    }

    lists.push(newList);
    saveList();
}

function deleteList(index) {
    if (lists[index].id != "default" && lists[index].id != currentList.id) {
        lists.splice(index, 1);
        saveList();
    } else {
        errorMessage("Default and current selected lists can not be deleted");
        console.error("Default and current selected lists can not be deleted");
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
function editItem(changes) {

    // Loading old item
    id = itemIndexToID(changes.index);
    item = currentList.items[id];

    // Remove index from value
    value = changes.value.substring(2);
    item.value = value;

    // Saving to List 
    currentList.items[id] = item;
    saveList();

    $(`#item-${changes.index} .value`).html(value);
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


function errorMessage(message) {
    ws.send(JSON.stringify({
        "request": "DoAction",
        "action": {
            "id": "2fbc6f75-530f-442b-9052-3bda4942662e",
            "name": "List Message"
        },
        "args": {
            "message": message,
        },
        "id": "TodoMessage"
    }));
}