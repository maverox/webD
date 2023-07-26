let form = document.querySelector("#form");
let items = document.querySelector("#items");
let item = document.querySelector(".list-group-item");
let search = document.querySelector("#search");
//form submit event
form.addEventListener("submit", addItem);
// deletion event
items.addEventListener("click", removeItem);
// search event
search.addEventListener("keyup", searcher);
//list hover event


//loading the lists function
function boot() {
  let localList = JSON.parse(localStorage.getItem("localList")); // fetching list from local storage
  localList.forEach((item) => {
    // creating a list element;
    let li = document.createElement("li");
    // giving it the same class as other ancestors
    li.className = "list-group-item";

    //creating a textNode;
    let text = document.createTextNode(item);
    //appending node child in li
    li.appendChild(text);
    // appending the above element as child of ul
    items.appendChild(li);
  });
}

// adding function
function addItem(e) {
  e.preventDefault(); // normal submission override

  //get value
  let newItem = document.querySelector("#addForm").value;
  // update/instantiate localStorage
  if (localStorage.getItem("localList") === null) {
    let localList = []; //creating a new list
    localList.push(newItem); // pushing new submission into the array
    localStorage.setItem("localList", JSON.stringify(localList)); // setting array into localStorage
  } else {
    let localList = JSON.parse(localStorage.getItem("localList")); //fetch from localstorage and parse it into an array
    localList.push(newItem); // pushing new submission into the array
    localStorage.setItem("localList", JSON.stringify(localList)); // setting array into localStorage
  }
  //reload/reboot site
  let li = document.createElement("li");
  // giving it the same class as other ancestors
  li.className = "list-group-item";

  //creating a textNode;
  if (!(newItem === "")) {
    let text = document.createTextNode(newItem);
    //appending node child in li
    li.appendChild(text);
    // appending the above element as child of ul
    items.appendChild(li);
    //to clear the entry after submission
    form.reset();
  }
}

//deleting function
function removeItem(e) {
  if (confirm("are you sure?")) {
    let localList = JSON.parse(localStorage.getItem("localList"));
    for (let i = 0; i < localList.length; i++) {
      if (localList[i] === e.target.innerHTML) localList.splice(i, 1); // find and remove the element from JSON array stored in localStorage
    }
    localStorage.setItem("localList", JSON.stringify(localList)); // setting array into localStorage
    items.removeChild(e.target); //removing child
  }
}

// search function
function searcher(e) {
  let query = e.target.value.toLowerCase();
  let li = items.getElementsByTagName("li"); // HTMl collection
  //converting to an array

  Array.from(li).forEach((l) => {
    let liName = l.firstChild.textContent;
    if (liName.toLowerCase().indexOf(query) != -1) {
      l.style.display = "block";
      l.style.backgroundColor = "#20c997";
    } else {
      l.style.display = "none";
    }
  });
}