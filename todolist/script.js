let ol = document.getElementById("userTodosOL")
let submit = document.querySelector("button")
let input = document.querySelector("input")
let form = document.querySelector("form")
let doneTodosOl = document.getElementById("userDoneTodosOL")
form.addEventListener("submit", function(event){
    event.preventDefault()
    let userInput = input.value
    if(userInput === ""){
        alert("Please enter")
        return
    }
    
    let li = document.createElement("li")
    li.id = "createdLi"
    let checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    li.textContent = userInput
    li.appendChild(checkbox)
    ol.append(li)
    
    checkbox.addEventListener("change", function(){
        doneTodosOl.appendChild(li)
        li.removeChild(checkbox)
    })
    form.reset()

})