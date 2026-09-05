let addButton = document.getElementById("addButton")
let container = document.getElementById("container")
let todos = document.getElementById("todos")
let boxTemplateContent = document.getElementById("boxTemplate").content
let saveButton = document.getElementById("saveButton")
let titleInput = document.getElementById("titleInput")
let contentInput = document.getElementById("contentInput")
let containerVisibility = true
let saveModeAddTodos = true
let saveModeModifyTodos = false
let currentContainer = null

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
    saveModeAddTodos = true
    saveModeModifyTodos = false
    handleVisibility()
})


function onContainerClick(container) {
  container.addEventListener("click", function () {
    saveModeAddTodos = false
    saveModeModifyTodos = true
    titleInput.value = this.dataset.myTitle
    currentContainer = this
    handleVisibility()
  })
}

function saveBox(){
    let boxTemplate = boxTemplateContent.cloneNode(true)
    let container2 = boxTemplate.querySelector(".container2")
    boxTemplate.querySelector("#contentTitle").textContent = titleInput.value
    boxTemplate.querySelector("#contentText").textContent = contentInput.value
    container2.dataset.myTitle = titleInput.value

    onContainerClick(container2)

    if(saveModeAddTodos == true){
     todos.append(boxTemplate);       
    }
    if(saveModeModifyTodos == true && currentContainer){
        console.log(titleInput.value)
        currentContainer.querySelector("#contentTitle").textContent = titleInput.value
        currentContainer.querySelector("#contentText").textContent = contentInput.value
        currentContainer.dataset.myTitle = titleInput.value
    }

}
