const seachBtn = document.getElementById("seachBtn");
const seachBtn1 = document.getElementById("seachBtn1");
const seachCity1 = document.getElementById("seachCity1");
const seachCity = document.getElementById("seachCity");

function seachCityBtn(searchBtn, inputField) {
  searchBtn.addEventListener("click", function () {
    const city = inputField.value.trim().toLowerCase();

    if (!city) {
      alert("Please enter a city.");
      return;
    }
    const header = document.getElementById("header");
    const section = document.getElementById("section");

    const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=f`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "3bdf80e1edmsh0e814b0d8274cdep1e9e51jsn3ebc72b6cb07",
        "x-rapidapi-host": "yahoo-weather5.p.rapidapi.com",
      },
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not fetch resource");
        }
        return response.json();
      })
      .then((data) => {
        const weatherHeader = document.querySelector(".weather-item");
        const weatherIconCode = data.current_observation.condition.code;
        const weatherIconUrl = `https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/${weatherIconCode}d.png`;

        weatherHeader.innerHTML = `  
          <div class="weather-location">
            <div class="city">
              <h1 id="cityName">${data.location.city}</h1>
              <p id="countryName">${data.current_observation.condition.text}</p>
              <h1 id="temp">${data.current_observation.condition.temperature}°</h1>
            </div>
            <div class="weather-image">
              <img src="${weatherIconUrl}" alt="" id="weatherImg" />
            </div>
          </div>`;

        const weatherPerDay = document.querySelector(".weather-forcast");
        const dailyForecasts = data.forecasts;
        weatherPerDay.innerHTML = "";
        dailyForecasts.forEach((element) => {
          const forecastIconUrl = `https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/${element.code}d.png`;
          weatherPerDay.innerHTML += `
            <div class="aside-item">
              <p class="day">${element.day}</p> 
              <div class="aside-img">
                <img src="${forecastIconUrl}" alt="${element.condition}" class="forecastImg">
                <p class="weatherCondition">${element.text}</p> 
              </div>
              <p>
                <span class="highTemp">${element.high}°</span>
                <span class="lowTemp">/ ${element.low}°</span> 
              </p>
            </div>`;
        });

        section.style.display = "block";
        header.style.display = "none";
      })
      .catch((error) => console.log("Fetch error:", error));
  });
}

seachCityBtn(seachBtn, seachCity);
seachCityBtn(seachBtn1, seachCity1);
