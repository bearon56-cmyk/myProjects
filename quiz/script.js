let cardQuestion = document.getElementById("cardQuestion")
let span = document.createElement("span")
let nextQuestionButton = document.getElementById("nextQuestion")
let previousQuestionButton = document.getElementById("previousQuestion")
let showAnswerButton = document.getElementById("showAnswer")
let cardsData = [
    question1 = {
        question : "Hello there",
        answer : "answer1"
    },
    question2 = {
        question : "Hell nah there",
        answer : "answer2"
    },
    question3 = {
        question : "yo yo yo",
        answer : "answer3"
    }
]

nextQuestionButton.addEventListener("click", function(){
    if(currentQuestionIndex > cardsData.length-2){
        return
    }
    currentQuestionIndex++
    span.textContent = cardsData[currentQuestionIndex].question
})
previousQuestionButton.addEventListener("click",function(){
    if(currentQuestionIndex <= 0){
        return
    }
    currentQuestionIndex--
    span.textContent = cardsData[currentQuestionIndex].question

})
showAnswerButton.addEventListener()
let currentQuestionIndex = 0
cardQuestion.append(span)

span.textContent = cardsData[currentQuestionIndex].question