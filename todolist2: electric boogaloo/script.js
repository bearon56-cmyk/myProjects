let addButton = document.getElementById("addButton")
let container = document.getElementById("container")
let todos = document.getElementById("todos")
let boxTemplateContent = document.getElementById("boxTemplate").content
let saveButton = document.getElementById("saveButton")
let titleInput = document.getElementById("titleInput")
let contentInput = document.getElementById("contentInput")
let containerVisibility = true

function handleVisibility(){
    containerVisibility = !containerVisibility
    if(!containerVisibility){
    container.style.visibility = "visible"
    todos.style.filter = "blur(5px)"
    }
    else{
        container.style.visibility = "hidden"   
        todos.style.filter = "none"    
    }
}

addButton.addEventListener("click", function(){
    saveButton.addEventListener("click", saveBox)
    handleVisibility()
})


function onContainerClick(container) {
    saveButton.addEventListener("click", function () {
        console.log("please work")
    })

  container.addEventListener("click", function () {
    titleInput.value = this.dataset.myTitle
    handleVisibility()
  })
}

function saveBox(){
d
    let boxTemplate = boxTemplateContent.cloneNode(true)
    let container2 = boxTemplate.querySelector(".container2")
    boxTemplate.querySelector("#contentTitle").textContent = titleInput.value
    boxTemplate.querySelector("#contentText").textContent = contentInput.value
    container2.dataset.myTitle = titleInput.value
    onContainerClick(container2)
    todos.append(boxTemplate);

}
