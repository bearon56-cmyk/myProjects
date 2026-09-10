let main = document.querySelector("main")
let text = document.getElementById("text")
let userProgramLang = document.getElementById("userProgramLanguage")
let submit = document.getElementById("submit")
let loading = document.getElementById("loading")
let languageDatalist = document.getElementById("language")
let languageApi = "https://raw.githubusercontent.com/nilbuild/githunt/refs/heads/master/src/components/filters/language-filter/languages.json"

addOptions()
submit.addEventListener("click", takeGithubRepo)

async function addOptions() {
    try {
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
    let repoDecription;
    try {
        loading.style.filter = "none"
        loading.style.visibility = "visible"
        main.style.filter = "blur(5px)"


        const response = await fetch(url)
        const data = await response.json()


        repoName = data.items[0].full_name
        repoDecription = data.items[0].description
        text.textContent = repoName
    } catch (error) {
        console.error(error)
    }
        finally{
        loading.style.visibility = "hidden"
        main.style.filter = "none"

    }
}

