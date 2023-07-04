import './style.css'
import {getWeather} from './weather'


navigator.geolocation.getCurrentPosition(positionSuccess , positionFailure)

function positionSuccess({coords}){
    getWeather(coords.latitude,coords.longitude,Intl.DateTimeFormat().resolvedOptions().timeZone)
.then(updateWeatherDetails)
.catch(e => {
    console.error(e)
    alert("Error getting weather")
})

}


function positionFailure(){
    alert("Unable to fetch your location , please allow me to fetch your location so that I could fetch weather location for you")
}



// function which updates weather details
function updateWeatherDetails({current,daily,hourly}){
    updateCurrentWeather(current);
    updateDailyWeather(daily);
    updateHourlyWeather(hourly);
    document.body.classList.remove("blurred");
}

// function which updates current weather data
function updateCurrentWeather(data){

    document.querySelector("[data-current-temp]").textContent = data.currentTemperature;
    document.querySelector("[data-current-high]").textContent = data.highTemperature;
    document.querySelector("[data-current-low]").textContent = data.lowTemperature;
    document.querySelector("[data-current-fl-low]").textContent = data.lowFeelsLike;
    document.querySelector("[data-current-precip]").textContent = data.precipitation;
    document.querySelector("[data-current-fl-high]").textContent = data.highFeelsLike;
    document.querySelector('.weather_icon').src = `./public/icons/${data.iconCode}.png`
}


// function which updates daily current details
function updateDailyWeather(data){
    let day__card__items = document.querySelectorAll(".day--card");
    // day__card__items.innerHTML = ''
    for(let i = 0;i<day__card__items.length;i++){
        let day_card = day__card__items[i];
        let img = day_card.querySelector(".day--card-img") 
        let day = day_card.querySelector(".day--card-day") 
        let temp = day_card.querySelector(".day--card-temp")

        img.src = `./public/icons/${data[i].weatherCode}.png`
        day.textContent = data[i].dateOfWeather,
        temp.textContent = data[i].maxTemp

        
    }
}


    const hourlySection = document.querySelector("[data-hour-section]")
    const hourRowTemplate = document.querySelector("#hour-row-template")



// function which updates hourly weather 
function updateHourlyWeather(hourly){
  
    hourlySection.innerHTML = ""

    hourly.forEach(hour=>{
        let element = hourRowTemplate.content.cloneNode(true);
        element.querySelector("[data-time]").textContent = hour.time;
        element.querySelector("[data-day]").textContent = hour.dateOfWeather;
        element.querySelector("[data-icon]").src = `./public/icons/${hour.weathercode}.png`
        element.querySelector("[data-temp").textContent = hour.temperature;
        element.querySelector("[data-fl-temp]").textContent = hour.feels_like;
        element.querySelector("[data-wind]").textContent = hour.wind;
        element.querySelector("[data-precip]").textContent = hour.precipitation;

         
        hourlySection.append(element)
    })
    
}