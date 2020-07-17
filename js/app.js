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

let idArray = []
let todoItems = [];

// add items from the localStorage to the todoItems array
for (let key in localStorage) {
    if (!localStorage.hasOwnProperty(key)) {
        continue;
    }
    let newHTML = localStorage.getItem(key);
    todoItems.push(newHTML);
    idArray.push(key);
};

// add the corresponding items in the array to the document body
todoItems.forEach(e => {
    items.insertAdjacentHTML("beforebegin", e);
})



// console.log(todoItems);



const clearAll = () => {
    localStorage.clear();
    for (let elem of idArray) {
        workingDocument = document.getElementById(elem);
        document.getElementById(elem).remove();
        console.log(workingDocument);
        delete workingDocument;
    };
    idArray = [];
    todoItems = [];
}



const deleteEntry = event => {
    let entry = event.target.parentNode.parentNode.parentNode;
    // entry.remove()
    console.log(idArray);
    console.log(entry);
    idArray = idArray.filter(e => e !== entry.id);
    console.log(idArray)
    // delete entry;
};

complete = 0

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

};


idArray.forEach(e => {
    const deleteBtn = document.getElementById(e).querySelector(".delete-item");
    deleteBtn.onclick = deleteEntry;
    const completeBtn = document.getElementById(e).querySelector(".complete-item");
    completeBtn.onclick = markComplete;
    const editBtn = document.getElementById(e).querySelector(".edit-item");
    editBtn.addEventListener("click", editEntry);
})



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
        idArray.push(itemId);
        todoItems.push(newItem);
        inputField.value = "";
        localStorage.setItem(itemId, newItem);
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


