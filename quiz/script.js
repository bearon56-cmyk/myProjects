let cardQuestion = document.getElementById("cardQuestion")
let span = document.createElement("span")
let nextQuestionButton = document.getElementById("nextQuestion")
let cardsData = [
    question1 = "Hello there",
    question2 = "Hell nah there",
    question3 = "yo yo yo"
]

nextQuestionButton.addEventListener("click", function(){
    if(currentQuestion > cardsData.length-2){
        return
    }
    currentQuestion++
    span.textContent = cardsData[currentQuestion]
    console.log(currentQuestion)
})

let currentQuestion = 0
cardQuestion.append(span)

span.textContent = cardsData[currentQuestion]