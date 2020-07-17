const items = document.querySelector(".my-5");
const submitFormButton = document.querySelector(".input-group-append").querySelector("button");
const inputField = document.getElementById("itemInput");

Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}

let counter = 0;
let todoItems = {};
let addedItems = [];


const deleteEntry = event => {
    // console.log();
};

const markComplete = event => {
    let text = event.target.parentNode.parentNode.parentNode.firstElementChild;
    console.log(text);
    }
    

};

const editEntry = event => {

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
        counter++
        // add the item to the local storage
        localStorage.setItem(itemId, newItem)
        inputField.value = "";
        // check if the item is in the document, if it's not... delete it.
        let checkDocument = document.getElementById(itemId);
        if (!checkDocument) {
            items.insertAdjacentHTML("afterend", newItem);
        };
        const deleteBtn = document.getElementById(itemId).querySelector(".delete-item");
        deleteBtn.onclick = deleteEntry;
        const completeBtn = document.getElementById(itemId).querySelector(".complete-item");
        completeBtn.onclick = markComplete;
        

    }
};






const testSubmit = event => {
    event.preventDefault();
    addItem();
}


submitFormButton.addEventListener("click", testSubmit);



for (let key in localStorage) {
    if (!localStorage.hasOwnProperty(key)) {
        continue;
    }
    let newHTML = localStorage.getItem(key);
    let idInDocument = document.getElementById(key);
    if (!idInDocument) {
        items.insertAdjacentHTML("afterend", newHTML)
    }
}