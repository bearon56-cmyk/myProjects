let cardQuestion = document.getElementById("cardQuestion")
let span = document.createElement("span")
let nextQuestionButton = document.getElementById("nextQuestion")
let previousQuestionButton = document.getElementById("previousQuestion")
let showAnswerButton = document.getElementById("showAnswer")
let progress = document.querySelector("progress")
let progressValue = progress.value
let showAnswer = false 
let button = document.getElementById("submit")
let container1 = document.getElementById("container1")
let currentQuestionIndex = 0
let userQuestionInput = document.getElementById("userQuestionInput")
let addAnswer = true
let userPTagContainer =document.getElementById("userPTagContainer")
let pTagTemplate = document.getElementById("pTagTemplate").content
let accept = document.getElementById("accept")
let userAnswerAndQuestion = document.getElementById("userAnswerAndQuestion")
let userQuestionContainer = document.getElementById("userQuestionContainer")

let object = {}

let cardsData = [{question: 1, answer: 2}]

progress.max = cardsData.length
function cardsLoader(){
    progressValue = currentQuestionIndex + 1
    progress.value = progressValue

    let currentCard = cardsData[currentQuestionIndex]
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


cardQuestion.append(span)
span.textContent = cardsData[currentQuestionIndex].question



button.addEventListener("click", () => {
    addAnswer =! addAnswer
    let template = pTagTemplate.cloneNode(true)
    let userPTAGS = template.querySelector("#userPTags")
    let userQuestion = userPTAGS.querySelector("#userQuestion")
    let userAnswer = userPTAGS.querySelector("#userAnswer")
    
    if (addAnswer === false){
        object = {}
        object.question = userQuestionInput.value
        userQuestionInput.value = ""
    }
    else{
        object.answer = userQuestionInput.value
        userQuestionInput.value = ""
        cardsData.push(object)
        console.log(cardsData.length);
        progress.max = cardsData.length

        cardsData.forEach(element => {
            userAnswer.textContent = `Answer:${element.answer}`
            userQuestion.textContent = `Question: ${element.question}`
            userPTagContainer.append(template)
        });

    }
})

accept.addEventListener("click", () =>{
    userAnswerAndQuestion.style.display = "none"
    userQuestionContainer.style.display = "none"
    container1.style.display = "inline"
})