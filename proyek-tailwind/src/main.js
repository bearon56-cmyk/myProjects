import './style.css'

const hamburg = document.getElementById("hamburg")
const menu = document.getElementById('menu')

hamburg.addEventListener("click", ()=>{
    hamburg.classList.toggle("toX")
    menu.classList.toggle("flex")
    menu.classList.toggle("hidden")

})