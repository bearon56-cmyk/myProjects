let userInputsBox = document.querySelector("#inputs")
let repoNameText = document.getElementById("repoNameText")
let userProgramLang = document.getElementById("userProgramLanguage")
let submit = document.getElementById("submit")
let loading = document.getElementById("loading")
let repoCreatorText = document.getElementById("repoCreator")
let repoDescriptionText = document.getElementById("repoDescription")
let container3 = document.getElementById("container3")
let starCountText = document.getElementById("starCounts")
let forkCountsText = document.getElementById("forkCounts")
let OpenIssuesCountText = document.getElementById("openIssuesCount")

addOptions()
submit.addEventListener("click", function(){
    if(userProgramLang.value == "" || userProgramLang.value == " "){
        return
    }
    else{
        takeGithubRepo()
        repoNameText.style.color = "black"
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
    let starCount;
    let forks;
    let openIssues;

    try {
        loading.style.filter = "none"
        loading.style.visibility = "visible"
        userInputsBox.style.filter = "blur(5px)"


        const response = await fetch(url)
        const data = await response.json()


        updateText(
            repoName, 
            repoDescription, 
            repoCreator, 
            starCount, 
            forks, 
            openIssues, 
            data)
        
    } catch (error) {
        console.error(error)
    }
        finally{
        loading.style.visibility = "hidden"
        userInputsBox.style.filter = "none"

    }
}

    function updateText(
        repoName,
        repoDescription, 
        repoCreator, 
        starCount, 
        forks, 
        openIssues, 
        data
        ) 
        {
        let currentItem = data.items[0]
        repoCreator = currentItem.owner.login
        repoCreatorText.textContent = `Creator: ${repoCreator}`

        repoName = currentItem.full_name
        repoNameText.textContent = repoName
        repoNameText.style.color = "orange"
        repoNameText.href = currentItem.html_url
        
        repoDescription = currentItem.description
        if (repoDescription == ""){
            repoDescriptionText.textContent = "No description"
        }
        else{
            repoDescriptionText.textContent = repoDescription  
        }


        starCount = currentItem.stargazers_count
        starCountText.textContent = starCount

        forks = currentItem.forks
        forkCountsText.textContent = forks

        openIssues = currentItem.open_issues
        OpenIssuesCountText.textContent = openIssues



}