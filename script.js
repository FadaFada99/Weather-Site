const currentURL = `https://api.openweathermap.org/data/4.0/onecall/current?lat={lat}&lon={lon}&appid={API key}`;

async function getWeather(city) {
    try{
        const response = await fetch(

            `${currentURL}?q=${city}&units=metric&appid=${API_KEY}`
        );
        if(!response.ok){
        throw new Error("City not found");
        }

        const data = await response.json();
        displayWeather(data);
        }
    catch(error){
        alert(error.message);
    }
}
getWeather();

// function displayWeather(data){

// document.getElementById("cityName").innerHTML =
// `${data.name}, ${data.sys.country}`;

// document.getElementById("temperature").innerHTML =
// `${Math.round(data.main.temp)}°C`;

// document.getElementById("description").innerHTML =
// data.weather[0].description;

// document.getElementById("humidity").innerHTML =
// `${data.main.humidity}%`;

// document.getElementById("wind").innerHTML =
// `${data.wind.speed} km/hr`;

// document.getElementById("visibility").innerHTML =
// `${data.visibility/1000} km`;

// document.getElementById("sunrise").innerHTML =
// convertTime(data.sys.sunrise);

// document.getElementById("sunset").innerHTML =
// convertTime(data.sys.sunset);

// changeIcon(data.weather[0].icon);

// }

// function convertTime(unix){

//     const date =
//     new Date(unix*1000);

//     return date.toLocaleTimeString([],{

//     hour:"2-digit",

//     minute:"2-digit"

//     });
// }

// function changeIcon(icon){

// const weatherIcon = document.getElementById("weatherIcon");

// weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;

// }

// document.getElementById("searchBtn").addEventListener("click",()=>{

// const city = document.getElementById("searchBox").value;

// if(city!="") {getWeather(city);
// }
// });

// document.getElementById("searchBox").addEventListener("keypress",(e)=>{

// if(e.key==="Enter"){getWeather(e.target.value);
// }
// });

// window.onload=()=>{getWeather("London");
// }

// function getLocation(){navigator.geolocation.getCurrentPosition(

// async(position)=>{

// const lat=position.coords.latitude;

// const lon=position.coords.longitude;

// const response=
// await fetch(
// `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
// );

// const data=
// await response.json();

// displayWeather(data);

// });

// }