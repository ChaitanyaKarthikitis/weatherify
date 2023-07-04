import './style.css'
import {getWeather} from './weather'
import myImage from './public/icons/0.png';
import myImage1 from './public/icons/1.png';
import myImage2 from './public/icons/2.png';
import myImage3 from './public/icons/3.png';
import myImage4 from './public/icons/45.png';
import myImage5 from './public/icons/48.png';
import myImage6 from './public/icons/51.png';
import myImage7 from './public/icons/53.png';
import myImage8 from './public/icons/55.png';
import myImage9 from './public/icons/56.png';
import myImage10 from './public/icons/57.png';
import myImage11 from './public/icons/61.png';
import myImage12 from './public/icons/63.png';
import myImage13 from './public/icons/65.png';
import myImage14 from './public/icons/66.png';
import myImage15 from './public/icons/67.png';
import myImage16 from './public/icons/71.png';
import myImage17 from './public/icons/73.png';
import myImage18 from './public/icons/77.png';
import myImage19 from './public/icons/80.png';
import myImage20 from './public/icons/81.png';
import myImage21 from './public/icons/82.png';
import myImage22 from './public/icons/85.png';
import myImage23 from './public/icons/86.png';
import myImage24 from './public/icons/95.png';
import myImage25 from './public/icons/96.png';
import myImage26 from './public/icons/99.png';


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