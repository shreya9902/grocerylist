// Select items
const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery_container");
const list = document.querySelector(".grocery_list");
const clearBtn = document.querySelector(".clear-btn")


// edit option
let editElement;
let editFlag = false;
let editID = "";

//event listeners

form.addEventListener("submit", addItem);
// clear btn
clearBtn.addEventListener("click", clearItem);

// load items
window.addEventListener("DOMContentLoaded", setupItems);



// functions
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value && !editFlag) { // here !editFlag === not true
    const element = document.createElement("article");
    // add id
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    // add class
    element.classList.add("grocery_item");
    element.innerHTML = `<p class="title">${value}</p>
     <div class="btn_container">
       <button type="button" class="edit-btn" name="button"><i class="fa-solid fa-pen-to-square"></i></button>
       <button type="button" class="delete-btn" name="button"><i class="fa-solid fa-trash-can"></i></button>
     </div>`;
     // event listeners
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);

    // append child
    list.appendChild(element);
    //display displayAlert
    displayAlert("Item successfully added", "success");
    //show btn_container
    container.classList.add("show-container");
    // add to local storage
    addToLocalStorage(id, value);
    // set back to default
    setBackToDefault();
  } else if (value && editFlag) { // here editFlag === true
    editElement.innerHTML = value;
    displayAlert("value changed", "success");
    // editlocalstorage
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert("please enter value", "danger")
  }
}

// function

// display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  //remove alert
  setTimeout(function() {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);

  }, 2000);
}

// clearbtn function
function clearItem() {
  const items = document.querySelectorAll(".grocery_item");

  if (items.length > 0) {
    items.forEach(function(item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("empty list", "success");
  setBackToDefault();
  localStorage.removeItem("list");
}
// delete function
function deleteItem(e){
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  if(list.children.length===0){
    container.classList.remove("show-container");
  }
  displayAlert("item removed", "danger");
  setBackToDefault();
  // remove from local localStorage
  removeFromLocalStorage(id);
}

// edit function
function editItem(e){
  const element = e.currentTarget.parentElement.parentElement;
  // set edit element
  editElement = e.currentTarget.parentElement.previousElementSibling;
  // set form valueOf
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent ="edit";
}
// set back to default
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}

// local Storage
// add local storage
function addToLocalStorage(id, value) {
const grocery ={id,value}; //const grocery ={id:id,value:value};
let items = localStorage.getItem("list")?JSON.parse(localStorage.getItem("list")):[];

items.push(grocery);
localStorage.setItem("list", JSON.stringify(items));
}
// remove from local storage
function removeFromLocalStorage(id){
let items = getLocalStorage();
items = items.filter(function(item){
  if(item.id !==id){
    return item;
  }
});
localStorage.setItem("list", JSON.stringify(items));
}
// edit local storage function
function editLocalStorage(id, value){
let items = getLocalStorage();
items = items.map(function(item){
  if(item.id===id){
    item.value =value;
  }
  return item;
});
localStorage.setItem("list", JSON.stringify(items));
}
function getLocalStorage(){
  return localStorage.getItem("list")?JSON.parse(localStorage.getItem("list")):[];
}

// set up items
function setupItems(){
  let items = getLocalStorage();
  if(items.length > 0){
    items.forEach(function(item){
      createListItem(item.id,item.value)
    })
    container.classList.add("show-container");
  }
}

function createListItem(id, value){
  const element = document.createElement("article");
  // add id
  let attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  // add class
  element.classList.add("grocery_item");
  element.innerHTML = `<p class="title">${value}</p>
   <div class="btn_container">
     <button type="button" class="edit-btn" name="button"><i class="fa-solid fa-pen-to-square"></i></button>
     <button type="button" class="delete-btn" name="button"><i class="fa-solid fa-trash-can"></i></button>
   </div>`;
   // event listeners
  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  const editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);

  // append child
  list.appendChild(element);
}
