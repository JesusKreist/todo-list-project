const items = document.querySelector(".my-5");
const submitFormButton = document.querySelector(".input-group-append").querySelector("button");
const inputField = document.getElementById("itemInput");
const clearButton = document.getElementById("clear-list");
const feedback = document.querySelector(".feedback");

Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}

let todoList;
let complete = 0;
let state;
let divArray = [];

//added comment




// add items from the localStorage to the todoItems array


localStorage.getObj("todoItems") ? todoList = localStorage.getObj("todoItems") : todoList = {};
localStorage.getObj("state") ? state = localStorage.getObj("state") : state = {};
localStorage.getObj("counter") ? counter = localStorage.getObj("counter") : counter = 0;

// add the html stored in the values of the todoList object to the document body.
for (let i of Object.values(todoList)) {
    items.insertAdjacentHTML("beforebegin", i);
    // console.log(i);
    divArray.push(i)
};
// console.log(divArray);

// console.log(Object.keys(state).length)

if (Object.keys(state).length > 0) {
    for (let i of Object.keys(state)) {
        let workingDocument = document.getElementById(i).firstElementChild;
        let taskState = state[i];
        console.log(taskState);
        if (taskState === 1) {
            // console.log("It's pending now!");
            workingDocument.classList.add("completed");
            // console.log("It's done now!");
        } else {
            // console.log("It's done now!");
            workingDocument.classList.remove("completed");
            // console.log("Resetting to pending");
        };
    };
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
    state = {};
};


// get the event that triggered the action and go high-up the hierachy
const deleteEntry = event => {
    let entry = event.target.parentNode.parentNode.parentNode;
    entry.remove();
    console.log(entry.id);
    console.log(state);
    delete todoList[entry.id];
    delete state[entry.id];
    localStorage.setObj("todoItems", todoList);
    localStorage.setObj("state", state);
};


const markComplete = event => {
    let entry = event.target.parentNode.parentNode.parentNode;
    let taskState = state[entry.id];
    console.log(taskState);
    let text = event.target.parentNode.parentNode.parentNode.firstElementChild;
    
    if (taskState === 0) {
        console.log("It's pending now!");
        text.classList.add("completed");
        console.log("It's done now!");
        taskState++;
    } else {
        console.log("It's done now!");
        text.classList.remove("completed");
        console.log("Resetting to pending");
        taskState--;
    };
    state[entry.id] = taskState;
    localStorage.setObj("todoItems", todoList);
    localStorage.setObj("state", state);
};

// event handler function to edit the entry
const editEntry = event => {
    let entry = event.target.parentNode.parentNode.parentNode.firstElementChild;
    inputField.value = entry.innerHTML;
    entry = event.target.parentNode.parentNode.parentNode;
    entry.remove();
    console.log(state);
    delete todoList[entry.id];
    delete state[entry.id];
    localStorage.setObj("todoItems", todoList);
    localStorage.setObj("state", state);
};

// loop through the keys of the todoList object and wire up event listeners for their div entries
for (let e of Object.keys(todoList)) {
    const deleteBtn = document.getElementById(e).querySelector(".delete-item");    
    const completeBtn = document.getElementById(e).querySelector(".complete-item");    
    const editBtn = document.getElementById(e).querySelector(".edit-item");
    deleteBtn.addEventListener("click", deleteEntry);
    completeBtn.addEventListener("click", markComplete);
    editBtn.addEventListener("click", editEntry);
};


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
        // increment counter, add the new id to the todoList object, add the on state to the state object
        // reset the input filed value
        counter++        
        todoList[itemId] = newItem;
        state[itemId]  = 0;
        inputField.value = "";
        // add the items to the local storage
        localStorage.setObj("todoItems", todoList);
        localStorage.setObj("state", state);
        localStorage.setObj("counter", counter);
        // add the new html to the DOM 
        items.insertAdjacentHTML("beforebegin", newItem);
        // get the new buttons from the newly inserted html and wire up the event listeners
        const deleteBtn = document.getElementById(itemId).querySelector(".delete-item");
        const completeBtn = document.getElementById(itemId).querySelector(".complete-item");
        const editBtn = document.getElementById(itemId).querySelector(".edit-item");
        deleteBtn.addEventListener("click", deleteEntry);
        completeBtn.addEventListener("click", markComplete);
        editBtn.addEventListener("click", editEntry);   

    } else {
        feedback.innerHTML = "Please add an item to your list!"
        setTimeout(() => {
            feedback.style.display = "none";
            feedback.classList.remove("showItem", "alert-danger", "text-capitalize");
        }, 5000);
        feedback.style.display = "block";
        feedback.classList.add("showItem", "alert-danger", "text-capitalize");
    };
};


const testSubmit = event => {
    event.preventDefault();
    addItem();
}


submitFormButton.addEventListener("click", testSubmit);
clearButton.addEventListener("click", clearAll);


