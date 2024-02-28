const addButton = document.querySelector(".add-button");
const editButton = document.querySelector(".edit-button");
const displayItem = document.querySelector(".displayItem");
const message = document.querySelector(".message");
const inputField = document.querySelector(".input");
const clearBtn = document.querySelector(".clearBtn");
const addMessage = document.querySelector(".addMessage");


const storedList = localStorage.getItem("groceryList"); //get grocery from local storage
if (storedList) {
  groceryList = JSON.parse(storedList);
  emptyListMessage()
  createHtml();

}


addButton.addEventListener("click", addToList);

clearBtn.addEventListener("click",()=>{
    groceryList=[];
    emptyListMessage();
    displayMessage("All items are deleted successfully.","red")
    createHtml();
    setTimeout(clearMessage, 3000);

    localStorage.setItem("groceryList", JSON.stringify(groceryList));

    })

function addToList() {
  const item = inputField.value.trim(); // Trim leading/trailing whitespace

  if (!item) { // Check for empty input
    return displayMessage("Cannot add an empty item." , "red");
  }

  if (groceryList.includes(item)) { //check if item already in list
    return displayMessage("Item already exists in the list.","red");
  }

  groceryList.push(item);
  emptyListMessage()
  inputField.value = ""; // Clear input field
  createHtml();
  displayMessage("Item added successfully.","green");
  setTimeout(clearMessage, 3000); // Clear message after 3 seconds

  localStorage.setItem("groceryList", JSON.stringify(groceryList)); // save grocery to locak storage
}

function createHtml() {
  displayItem.textContent = ""; // Clear existing content

  groceryList.forEach((item) => {
    const newItemElement = document.createElement("div");
    newItemElement.className = "itemClass";

    newItemElement.innerHTML = `

      <span>${item}</span>
      <div class="DleEdt">
        <button onclick="update('${item}')"><i class="fa fa-edit" style="font-size:18px;color:green"></i></button>
        <button onclick="deleteItem(${groceryList.indexOf(item)})"><i class="fa fa-trash-o" style="font-size:18px;color:red"></i></button>
      </div>
      
    `;

    displayItem.appendChild(newItemElement);
  });
}

function displayMessage(messageText,color) {
  message.textContent = messageText;
  message.style.color =color ; // change messager color
}

function clearMessage() {
  message.textContent = "";
  message.style.backgroundColor = ""; // Reset color 
}

function deleteItem(index) {
  const deletedItem = groceryList.splice(index, 1)[0]; // Get the deleted item
  emptyListMessage();
  console.log(groceryList)
  displayItem.textContent = ""; // Clear display before re-rendering
  createHtml();
  displayMessage(`${deletedItem} is successfully deleted.`,"red");
  setTimeout(clearMessage, 3000);

  localStorage.setItem("groceryList", JSON.stringify(groceryList));
}

function update(item) {
  inputField.value = item;
  addButton.style.display = "none";
  editButton.style.display = "inline";

  editButton.addEventListener("click", () => editItem(item));
}

function editItem(originalItem) {
  const newItem = inputField.value.trim();


  if (!newItem) { // Check for empty input again
    return displayMessage("Cannot update with an empty item.","red");
  }

  if (newItem === originalItem) { // No change, no need to update
    return displayMessage("No changes made.","red");
  }

  if (groceryList.includes(newItem)) {
    return displayMessage("Item already exists in the list.", "red");
  }

  const index = groceryList.indexOf(originalItem);
  groceryList[index] = newItem; // Update the specific item
  addButton.style.display = "inline";
  editButton.style.display = "none";
  createHtml();
  displayMessage("Item updated successfully.","green");
  setTimeout(clearMessage, 3000);
  
}

function emptyListMessage(){
    if(groceryList.length<=0){
        addMessage.style.display = "block";
        clearBtn.style.display="none"
    }else{
        addMessage.style.display = "none";
        clearBtn.style.display="inline"
    }

}
