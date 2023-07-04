import axios from "axios";
// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&windspeed_unit=ms&precipitation_unit=inch&timezone=Asia%2FTokyo




export function getWeather(lat ,lon , timezone){

    return axios.get(
        "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&windspeed_unit=ms&precipitation_unit=inch",
        {
            params: {
                latitude : lat,
                longitude : lon,
                timezone,
            },
        }
    ).then(({data})=>{
        return{
            current : parseCurrentWeather(data),
            daily : parseDailyWeather(data),          
            hourly : parseHourlyWeather(data),           
        }
    })

}

// function that parses current weather
function parseCurrentWeather({current_weather,daily}){

    const {
        temperature : currentTemperature,
        weathercode : iconCode,
        windspeed   : windSpeed,
    } = current_weather
    return{
        currentTemperature : Math.round(currentTemperature),
        highTemperature : Math.round(daily.temperature_2m_max[0]),
        lowTemperature :  Math.round(daily.temperature_2m_min[0]),
        highFeelsLike :  Math.round(daily.apparent_temperature_max[0]),
        lowFeelsLike :  Math.round(daily.apparent_temperature_min[0]),
        precipitation : Math.round(daily.precipitation_sum[0]*100) / 100 ,
        windSpeed : Math.round(windSpeed),
        iconCode,
    }

 

    
}

// function that parses daily weather
function parseDailyWeather({daily}){
    return daily.time.map((date, index)=>{
        return{
            dateOfWeather : getDayOfWeek(date),
            weatherCode : daily.weathercode[index],
            maxTemp : Math.round(daily.temperature_2m_max[index]) 
        }
    })

}


// function which parses hourly weather
function parseHourlyWeather({hourly,current_weather}){
    // console.log(data)
    // day of the week
    // time 
    // weatherCode
    // Temperature
    // Feels likeTemperature
    // Wind
    // precipitation
    
    return hourly.time.map((time, index)=>{
        return{
            dateOfWeather : getDayOfWeek(time),
            weathercode : hourly.weathercode[index],
            temperature : Math.round(hourly.temperature_2m[index]) ,
            feels_like : Math.round(hourly.apparent_temperature[index]),
            wind : hourly.windspeed_10m[index],
            precipitation : Math.round((hourly.precipitation[index]*100)/100) ,
            time : getTime(hourly.time[index])
        }
    }).filter(({time ,dateOfWeather}) =>{
        
        if(dateOfWeather === getDayOfWeek(current_weather.time)){
            return time >= getTime(current_weather.time)
        }else{
            return time;

        }
    })
}
   








// function which gets current day of the week
function getDayOfWeek(dateString) {
  const date = new Date(dateString);
  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
  return dayOfWeek;
}


// function which returns both day and time 
function getDayOfWeekAndTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);

  // Get the day of the week
  const dayOfWeek = dateTime.toLocaleDateString("en-US", { weekday: "long" });

  // Get the current time of the day
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const timeOfDay = `${hours}:${minutes.toString().padStart(2, "0")}`;

  return { dayOfWeek, timeOfDay };
}

// Get time of the string using date string
function getTime(dateTimeString) {
  const timeString = dateTimeString.split('T')[1];
  return timeString;
}