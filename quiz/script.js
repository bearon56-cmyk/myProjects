const cardQuestion = document.getElementById("cardQuestion")
const span = document.createElement("span")
const nextQuestionButton = document.getElementById("nextQuestion")
const previousQuestionButton = document.getElementById("previousQuestion")
const showAnswerButton = document.getElementById("showAnswer")
const progress = document.querySelector("progress")
let progressValue = progress.value
let showAnswer = false 
const button = document.getElementById("submit")
const container1 = document.getElementById("container1")
let currentQuestionIndex = 0
const userQuestionInput = document.getElementById("userQuestionInput")
let addAnswer = true
const userPTagContainer =document.getElementById("userPTagContainer")
const pTagTemplate = document.getElementById("pTagTemplate").content
const userQuestionContainer = document.getElementById("userQuestionContainer")
const accept = document.getElementById("accept")
const userAnswerAndQuestion = document.getElementById("userAnswerAndQuestion")


let object = {}

let cardsData = []

accept.addEventListener("click", () =>{
    if (cardsData.length == 0 ){
        return
    }
    else{
    userAnswerAndQuestion.style.display = "none"
    userQuestionContainer.style.display = "none"
    container1.style.display = "inline"
    }

})

progress.max = cardsData.length
function cardsLoader(){
    progressValue = currentQuestionIndex + 1
    progress.value = progressValue

    let currentCard = cardsData[currentQuestionIndex]
    if(cardsData.length == 0){
        return
    }
    if (showAnswer){
        span.textContent = currentCard.answer
        showAnswerButton.textContent = "Show question"
    }
    else{
        span.textContent = currentCard.question
        showAnswerButton.textContent = "Show answer"
    }
}

showAnswerButton.addEventListener("click", function(){

    showAnswer = !showAnswer
    if(showAnswer == true){
        span.textContent = cardsData[currentQuestionIndex].answer
        showAnswerButton.textContent = "Show question"
    }else{
        span.textContent = cardsData[currentQuestionIndex].question
        showAnswerButton.textContent = "Show answer"
    }


})

nextQuestionButton.addEventListener("click", function(){
    if(currentQuestionIndex > cardsData.length-2){
        return
    }

    currentQuestionIndex++
    showAnswer = false
    cardsLoader()
})
previousQuestionButton.addEventListener("click",function(){
    if(currentQuestionIndex <= 0){
        return
    }
    currentQuestionIndex--
    showAnswer = false
    cardsLoader()

})



progress.max = cardsData.length


button.addEventListener("click", () => {
    addAnswer =! addAnswer
    let template = pTagTemplate.cloneNode(true)
    let userPTAGS = template.querySelector("#userPTags")
    let userQuestion = userPTAGS.querySelector("#userQuestion")
    let userAnswer = userPTAGS.querySelector("#userAnswer")
    const remove = userPTAGS.querySelector("#remove")

    if(userQuestionInput.value == ""){
        alert("Enter in your quiz data!")
        return
    }
    if (addAnswer == false){
        object = {}
        object.question = userQuestionInput.value

        userQuestionInput.value = ""
    }
    else{
        object.answer = userQuestionInput.value
        const thisObject = object
        userQuestionInput.value = ""
        cardsData.push(object)


        
        cardQuestion.append(span)
        span.textContent = cardsData[currentQuestionIndex].question

        remove.addEventListener("click", function(){
            let index = cardsData.indexOf(thisObject)
            if(index > -1)cardsData.splice(index, 1)
            userPTAGS.remove()
            console.log(cardsData);
            progress.max = cardsData.length
        })

        cardsData.forEach(element => {
            userAnswer.textContent = `Answer:${element.answer}`
            userQuestion.textContent = `Question: ${element.question}`
            userPTagContainer.append(template)
        });

    }
})

