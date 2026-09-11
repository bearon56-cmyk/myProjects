let userInputsBox = document.querySelector("#inputs")
let repoNameText = document.getElementById("repoNameText")
let userProgramLang = document.getElementById("userProgramLanguage")
let submit = document.getElementById("submit")
let loading = document.getElementById("loading")
let repoCreatorText = document.getElementById("repoCreator")
let repoDescriptionText = document.getElementById("repoDescription")
let container3 = document.getElementById("container3")

addOptions()
submit.addEventListener("click", function(){
    if(userProgramLang.value == "" || userProgramLang.value == " "){
        return
    }
    else{
        takeGithubRepo()
    }
})

async function addOptions() {
    try {
        let languageDatalist = document.getElementById("language")
        let languageApi = "https://raw.githubusercontent.com/nilbuild/githunt/refs/heads/master/src/components/filters/language-filter/languages.json"
        const response = await fetch(languageApi)
        const data = await response.json()

        data.forEach(element => {
            const options = document.createElement("option")
            options.value = element.title
            languageDatalist.append(options)
        });
        
    } catch (error) {
        console.error(error)
    }
}

async function takeGithubRepo() {
    let randomNumber = Math.floor(Math.random() * 100) + 1

    const url = `https://api.github.com/search/repositories?q=${userProgramLang.value}&page=${randomNumber}&per_page=1`
    let repoName;
    let repoDescription;
    let repoCreator;

    try {
        loading.style.filter = "none"
        loading.style.visibility = "visible"
        userInputsBox.style.filter = "blur(5px)"


        const response = await fetch(url)
        const data = await response.json()


        updateText(repoName, repoDescription, repoCreator, data)
        
    } catch (error) {
        console.error(error)
    }
        finally{
        loading.style.visibility = "hidden"
        userInputsBox.style.filter = "none"

    }
}

    function updateText(repoName, repoDescription, repoCreator, data) {
        repoCreator = data.items[0].owner.login
        repoCreatorText.textContent = `Creator: ${repoCreator}`

        repoName = data.items[0].full_name
        repoNameText.textContent = repoName

        repoDescription = data.items[0].description
        repoDescriptionText.textContent = repoDescription

}