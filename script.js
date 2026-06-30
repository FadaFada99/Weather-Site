const API_KEY="968a6baebb080fef9de33c66739aa544";
const coordinateURL = `https://api.openweathermap.org/geo/1.0/direct`;
const weatherURL =  `https://api.openweathermap.org/data/2.5/weather`

const placeSearch = document.getElementById('searchBox')

async function getWeatherCondition(lon, lat) {
    try {
            const response = await fetch(`${weatherURL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
            if(!response.ok){
            throw new Error("City not found");
            }

            const data = await response.json();
            return data;
    } catch (error) {
        alert(error.message);
    }    
}

async function getCoordinate(city) {
    try{
            const response = await fetch(`${coordinateURL}?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`);
            if(!response.ok){
            throw new Error("City not found");
            }

            const data = await response.json();
            const longitude = data[0].lon
            const latitude = data[0].lat

            const weather_response = await getWeatherCondition(longitude, latitude)
            console.log(weather_response)
            ReplaceValue(weather_response)
        }
    catch(error){
        alert(error.message);
    }
}

// async function getAirQuality(lon, lat){

//     const response = await fetch(
//       `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
//     );

//     const data = await response.json();

//     return data;
// }

function convertTimestamp (suntime){
    const sunriseDate = new Date(suntime * 1000); // convert seconds to milliseconds

    const formattedSunrise = sunriseDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
    });
    
    return formattedSunrise
}



placeSearch.addEventListener('keydown', (event)=>{
    if(event.key === 'Enter'){
        const place = placeSearch.value
        getCoordinate(place)
        placeSearch.value = ''
    }
    
})

function ReplaceValue (data){

    const cityName = document.getElementById('cityName')
    const citytemperature = document.getElementById('temperature')
    const currentDate = document.getElementById('currentDate')
    const windSpeed = document.getElementById ('wind')
    const sunrise = document.getElementById ('sunrise')
    const sunset = document.getElementById ('sunset')
    const humidity = document.getElementById('humidity');
    const visibility = document.getElementById('visibility');
    // const airQuality = await getAirQuality(longitude,latitude);
    // // console.log(airData);



    cityName.innerHTML = data?.name
    citytemperature.innerText = `${data?.main.temp}°C`
    currentDate.innerHTML = new Date().toDateString()
    windSpeed.innerHTML =`Wind Speed - ${data?.wind.speed}km/hr`
    sunrise.innerHTML = `Sunrise - ${convertTimestamp(data?.sys.sunrise)}`
    sunset.innerHTML = `Sunset - ${convertTimestamp(data?.sys.sunset)}`
    humidity.innerHTML = `Humidity - ${data?.main.humidity}%`;
    visibility.innerHTML = `Visibility - ${(data.visibility / 1000).toFixed(1)} km`;

    

}







