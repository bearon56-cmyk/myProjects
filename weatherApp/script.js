let windSpeedText = document.getElementById("windspeed")
let windSpeed;
let userLocation = document.getElementById("userLocation")
let encodedLocation = encodeURIComponent(userLocation.value)
let submit = document.getElementById("submit")
let temperatureText = document.getElementById("temperature")
let temperature;
let loading = document.getElementById('state')

//fetch
async function getWeatherData() {
    try {
        loading.style.visibility = "visible"
        let url =  `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${userLocation.value}/today?key=K4SKGDNJN3W5H38EB8BDXYJ7F`
        let response = await fetch(url)

        if (response.status == 400){
            throw new Error(`Invalid location, error:${(response.status)}`)
        }
        if(!response.ok){
            throw new Error(`Error status ${response.status}`)
        }


        let data = await response.json()
        windSpeed = data.currentConditions.windspeed
        temperature = data.currentConditions.temp
        
    } catch (error) {
        alert(error.message)
    } finally{
        loading.style.visibility = "hidden"
    }
}

submit.addEventListener("click", async function(){
    if (userLocation.value == ""){
        return
    }
    await getWeatherData()
    windSpeedText.textContent = `${windSpeed} MPH`
    temperatureText.textContent = `${temperature} F`
})