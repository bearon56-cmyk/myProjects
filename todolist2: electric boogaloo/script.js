let addButton = document.getElementById("addButton");
let userForm = document.getElementById("container");
let todos = document.getElementById("todos");
let boxTemplateContent = document.getElementById("boxTemplate").content;
let saveButton = document.getElementById("saveButton");
let titleInput = document.getElementById("titleInput");
let contentInput = document.getElementById("contentInput");
let containerVisibility = true;
let saveModeAddTodos = true;
let saveModeModifyTodos = false;
let currentContainer = null;
let cancelButton = document.getElementById("cancelButton");


function handleVisibility() {
  containerVisibility = !containerVisibility;
  if (!containerVisibility) {
    userForm.style.visibility = "visible";
    todos.style.filter = "blur(5px)";
  } else {
    userForm.style.visibility = "hidden";
    todos.style.filter = "none";
  }
}

addButton.addEventListener("click", function () {
  saveButton.addEventListener("click", saveBox);
  saveModeAddTodos = true;
  saveModeModifyTodos = false;
  userForm.querySelector("p").textContent = "Add new notes";
  handleVisibility();
});

function onContainerClick(container) {
  container.addEventListener("click", function () {
    saveModeAddTodos = false;
    saveModeModifyTodos = true;

    titleInput.value = this.dataset.myTitle;
    currentContainer = this;
    
    userForm.querySelector("p").textContent = "Modify todos";
    handleVisibility();
  });
}

function saveBox() {
  let boxTemplate = boxTemplateContent.cloneNode(true);
  let todosContainer = boxTemplate.querySelector(".todosContainer");
  let deleteButton = boxTemplate.querySelector("#delete")
  boxTemplate.querySelector("#contentTitle").textContent = titleInput.value;
  boxTemplate.querySelector("#contentText").textContent = contentInput.value;

  deleteButton.addEventListener("click", function(){
    todosContainer.remove()
    containerVisibility = !containerVisibility
  })

  todosContainer.dataset.myTitle = titleInput.value;

  onContainerClick(todosContainer);
  if (titleInput.value == "" || contentInput.value == "") {
    alert("Fill the input");
    return;
  }
  if (saveModeAddTodos == true) {
    todosContainer.style.borderLeft = randomColor();
    todos.append(boxTemplate);
  }
  if (saveModeModifyTodos == true && currentContainer) {
    currentContainer.querySelector("#contentTitle").textContent =
      titleInput.value;
    currentContainer.querySelector("#contentText").textContent =
      contentInput.value;
    currentContainer.dataset.myTitle = titleInput.value;
  }
}

cancelButton.addEventListener("click", function () {
  containerVisibility = false;
  handleVisibility();
});

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `3px solid rgb(${r}, ${g}, ${b})`;
}

