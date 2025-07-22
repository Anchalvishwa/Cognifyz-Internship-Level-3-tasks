const apiKey = "[Your api key]";
const weatherIcon = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temprature");
const cityElement = document.querySelector(".City");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const getWeatherBtn = document.querySelectorAll("button")[0];
const locationBtn = document.querySelectorAll("button")[1];
const cityInput = document.querySelector("input[name='city']");

const weatherImages = {
    "Clear": "assets/clear.png",
    "Clouds": "assets/clouds.png",
    "Rain": "assets/rain.png",
    "Drizzle": "assets/drizzle.png",
    "Mist": "assets/mist.png",
    "Snow": "assets/snow.png",
    "Thunderstorm": "assets/thunderstorm.png",
    "Haze": "assets/haze.png",
};

async function getWeather(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        alert("Error: " + error.message);
    }
}

function updateWeatherUI(data) {
    const name = data.name;
    const temp = Math.round(data.main.temp);
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const weatherMain = data.weather[0].main;

    cityElement.textContent = name;
    tempElement.textContent = `${temp}°C`;
    humidityElement.textContent = `${humidity}%`;
    windElement.textContent = `${wind} km/h`;

   let matched = false;
for (const key in weatherImages) {
    if (weatherMain.toLowerCase().includes(key.toLowerCase())) {
        weatherIcon.src = weatherImages[key];
        matched = true;
        break;
    }
}
if (!matched) {
    weatherIcon.src = "assets/clouds.png";
}

}


getWeatherBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
        getWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
                const response = await fetch(url);
                const data = await response.json();
                updateWeatherUI(data);
            } catch (error) {
                alert("Could not fetch weather for your location.");
            }
        }, () => {
            alert("Geolocation access denied.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});


const button = document.getElementById("bgBtn");
button.onclick = function () {
  document.body.style.backgroundImage = "none";
  document.body.style.backgroundColor = "#dd68aaff";
};

// lets add reset button

const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", () => {
    
    cityInput.value = "";

    cityElement.textContent = "City";
    tempElement.textContent = "--°C";
    humidityElement.textContent = "--%";
    windElement.textContent = "-- km/h";
    weatherIcon.src = "assets/clouds.png"; 
});
