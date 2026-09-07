let windSpeedText = document.getElementById("windspeed")
let userLocation = document.getElementById("userLocation")
let encodedLocation = encodeURIComponent(userLocation.value)
let submit = document.getElementById("submit")





async function getWeatherData() {
    try {
        let url =  `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${userLocation.value}/today?key=K4SKGDNJN3W5H38EB8BDXYJ7F`
        let response = await fetch(url)

        if(!response.ok){
            alert("response not okay")
        }

        let data = await response.json()
        return data.currentConditions.windspeed

    } catch (error) {
        console.error(error)
    }
}

submit.addEventListener("click", async function(){
    const data = await getWeatherData()
    windSpeedText.textContent = data
})