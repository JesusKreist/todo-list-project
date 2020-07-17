const items = document.querySelector(".my-5");
const submitFormButton = document.querySelector(".input-group-append").querySelector("button");
const inputField = document.getElementById("itemInput");
const clearButton = document.getElementById("clear-list");

Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}

let counter = 0;
let todoList;
let complete = 0;
let state;

//added comment




// add items from the localStorage to the todoItems array

// if (localStorage.getObj("todoItems")) {
//     todoList = localStorage.getObj("todoItems");
// } else {
//     todoList = {};
// };

localStorage.getObj("todoItems") ? todoList = localStorage.getObj("todoItems") : todoList = {};
localStorage.getObj("state") ? state = localStorage.getObj("state") : state = {};
// console.log(state);


// add the html stored in the values of the todoList object to the document body.

for (let i of Object.values(todoList)) {
    items.insertAdjacentHTML("beforebegin", i);
};


// clear the local storage, loop through all the keys in the todolist == the div ids
// get the elements and delete them
// set the todoList back to an empty object

const clearAll = () => {
    localStorage.clear();
    for (let i of Object.keys(todoList)) {
        document.getElementById(i).remove();
    };
    todoList = {};
};


// get the event that triggered the action and go high-up the hierachy
const deleteEntry = event => {
    let entry = event.target.parentNode.parentNode.parentNode;
    entry.remove();
    delete todoList[entry.id];
    localStorage.setObj("todoItems", todoList)
};



const markComplete = event => {
    let text = event.target.parentNode.parentNode.parentNode.firstElementChild;
    
    if (complete === 0) {
        console.log("It's off")
        text.classList.add("completed");
        complete++
    } else {
        console.log("It's on")
        text.classList.remove("completed");
        complete--
    }
};

const editEntry = event => {
    let entry = event.target.parentNode.parentNode.parentNode.firstElementChild;
    inputField.value = entry.innerHTML;
    entry = event.target.parentNode.parentNode.parentNode;
    entry.remove();
    delete todoList[entry.id];
    localStorage.setObj("todoItems", todoList);

};

for (let e of Object.keys(todoList)) {
    const deleteBtn = document.getElementById(e).querySelector(".delete-item");
    deleteBtn.onclick = deleteEntry;
    const completeBtn = document.getElementById(e).querySelector(".complete-item");
    completeBtn.onclick = markComplete;
    const editBtn = document.getElementById(e).querySelector(".edit-item");
    editBtn.addEventListener("click", editEntry);
};


// idArray.forEach(e => {
//     const deleteBtn = document.getElementById(e).querySelector(".delete-item");
//     deleteBtn.onclick = deleteEntry;
//     const completeBtn = document.getElementById(e).querySelector(".complete-item");
//     completeBtn.onclick = markComplete;
//     const editBtn = document.getElementById(e).querySelector(".edit-item");
//     editBtn.addEventListener("click", editEntry);
// })



const addItem = () => {
    let newEntry = inputField.value;
    // check if new entry is not empty
    // add a check to see if the element is already in the array
    if (newEntry) {
        let itemId = `item${counter}`;
        let newItem = `<div id=${itemId} class="item my-3">
    <h5 class="item-name text-capitalize">${newEntry}</h5>
    <div class="item-icons">
        <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
        <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
        <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
    </div>
</div>`
        counter++
        // add the item to the local storage
        todoList[itemId] = newItem;
        inputField.value = "";
        localStorage.setObj("todoItems", todoList);
        // check if the item is in the document, if it's not... delete it.
        // let checkDocument = document.getElementById(itemId);
        items.insertAdjacentHTML("beforebegin", newItem);
        const deleteBtn = document.getElementById(itemId).querySelector(".delete-item");
        deleteBtn.onclick = deleteEntry;
        const completeBtn = document.getElementById(itemId).querySelector(".complete-item");
        completeBtn.onclick = markComplete;
        const editBtn = document.getElementById(itemId).querySelector(".edit-item");
        editBtn.addEventListener("click", editEntry);      

    }
};






const testSubmit = event => {
    event.preventDefault();
    addItem();
}


submitFormButton.addEventListener("click", testSubmit);
clearButton.addEventListener("click", clearAll);


