let cardQuestion = document.getElementById("cardQuestion")
let span = document.createElement("span")
let nextQuestionButton = document.getElementById("nextQuestion")
let previousQuestionButton = document.getElementById("previousQuestion")
let showAnswerButton = document.getElementById("showAnswer")
let progress = document.querySelector("progress")
let progressValue = progress.value
let showAnswer = false 
let currentQuestionIndex = 0

let cardsData = [

    {
        question : "What is \"DRY\"",
        answer : "Dont Repeat Yourself"
    },
    {
        question : "What is the main 3 components of web developing as a beginner",
        answer : "Html, CSS, JavaScript"
    },
    {
        question : "I ran out of ideas for questions",
        answer : "Still have no idea for questions"
    },
    {
        question: "HAVE YOU EVER PLAYED FOOTBALL WITH YOU LIFE ON THE LINE???",
        answer: "Yeah still no idea"
    }
    
]
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
    if(showAnswer){
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