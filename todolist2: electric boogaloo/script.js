let button = document.getElementById("Test")
let container = document.getElementById("container")
let containerVisibility = true
let todos = document.getElementById("todos")
let boxTemplateContent = document.getElementById("boxTemplate").content
let saveButton = document.getElementById("saveButton")
let titleInput = document.getElementById("titleInput")
let contentInput = document.getElementById("contentInput")


function handleVisibility(){
    if(!containerVisibility){
    container.style.visibility = "visible"
    todos.style.filter = "blur(5px)"
    }
    else{
        container.style.visibility = "hidden"   
        todos.style.filter = "none"    
    }
    console.log(containerVisibility)
}

button.addEventListener("click", function(){
    containerVisibility = !containerVisibility
    handleVisibility()
})

saveButton.addEventListener("click", function(){
    let boxTemplate = boxTemplateContent.cloneNode(true)    
    boxTemplate.querySelector("#contentTitle").textContent = titleInput.value
    boxTemplate.querySelector("#contentText").textContent = contentInput.value


    todos.append(boxTemplate)


})



