const searchName = document.querySelector(".search_value");
const currentWeatherDiv = document.querySelector(".currentweather");
const nextWeatherDiv = document.querySelector(".forecast .Weather-list");
const foreCastDiv = document.querySelector(".forecast");
const forecastlive = document.querySelector(".container2");
const currLocation = document.querySelector(".location_icon");
const result = document.querySelector(".result-found");



const API_KEY="7c82acffdb5f447784e133935242009";

// Weather codes for mapping to custom icons
const weatherCodes = {
    clear: [1000],
    clouds: [1003, 1006, 1009],
    mist: [1030, 1135, 1147],
    rain: [1063, 1150, 1153, 1168, 1171, 1180, 1183, 1198, 1201, 1240, 1243, 1246, 1273, 1276],
    moderate_heavy_rain: [1186, 1189, 1192, 1195, 1243, 1246],
    snow: [1066, 1069, 1072, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264, 1279, 1282],
    thunder: [1087, 1279, 1282],
    thunder_rain: [1273, 1276],
}


const displayHourlyForecast = (HourlyData) => {
    const currentHour = new Date().setMinutes(0,0,0);
    const next24Hours = currentHour+24*60*60*1000;
    
    const next24HoursData =HourlyData.filter(({ time })=>{
        const forecastTime = new Date(time).getTime();
        return forecastTime >= currentHour && forecastTime <= next24Hours;
    });

    nextWeatherDiv.innerHTML = next24HoursData.map(item => {
        const temperature = Math.floor(item.temp_c);
        const time = item.time.split(" ")[1].substring(0,5);
        const weatherIcon = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(item.condition.code));

        return `<li class="weather-item">
                    <p class="time-duration">
                        ${time}
                    </p>
                    <img src="icons/${weatherIcon}.svg" class="weather-item-image">
                    <p class="temperature">
                        ${temperature}°C
                    </p>
                </li>`;
    }).join("");

}


const getWeatherdata = async (API_URL) => {
    window.innerWidth <=768 && searchName.blur();
    forecastlive.classList.remove("container2");
    forecastlive.classList.add("container");
    result.className="result-found";
    currentWeatherDiv.className="currentweather";
    foreCastDiv.className="forecast";

    try{
        const response = await fetch(API_URL);
        const data = await response.json();

        const temperature = Math.floor(data.current.temp_c);
        const description = data.current.condition.text;
        const weatherIcon = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(data.current.condition.code));

        currentWeatherDiv.querySelector(".temperature").innerHTML=`${temperature}<span>°C</span>`;
        currentWeatherDiv.querySelector(".description").innerText=description;
        currentWeatherDiv.querySelector(".currentweather_image").src = `icons/${weatherIcon}.svg`;

        const combinedHourlyData = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour];
        // console.log(combinedHourlyData);
        displayHourlyForecast(combinedHourlyData);
        searchName.value = data.location.name;

    }catch(error){
        console.log(error);
        result.className="noresultfound";
        currentWeatherDiv.className="notvisible";
        foreCastDiv.className="forecastnotvisible";

    }
}


const setWeatherDataRequest = (cityName) =>{
    const API_URL=  ` http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=2`;
    getWeatherdata(API_URL);
}

searchName.addEventListener("keyup",(e)=>{
    const cityName = searchName.value.trim();

    if(e.key == "Enter" && cityName){

        setWeatherDataRequest(cityName);
    }
});



currLocation.addEventListener("click",() =>{
    navigator.geolocation.getCurrentPosition(position=>{
        const {latitude,longitude} = position.coords;
        const API_URL=  ` http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=2`;
        getWeatherdata(API_URL);
        forecastlive.classList.remove("container2");
        forecastlive.classList.add("container");
        console.log(position);
    },error=>{
        alert("Location Access Denied. Please allow to find your Location");
    });
});


setWeatherDataRequest("london");
