const getWeatherButton = document.getElementById("get-weather");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const cityList = document.getElementById("city-list");

const d = new Date();
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const storedCities = localStorage.getItem("city-input");
if (storedCities) {
  const storedCitiesArray = storedCities.split(",");
  for (let i = 0; i < storedCitiesArray.length; i++) {
    const city = document.createElement("li");

    city.textContent = storedCitiesArray[i];

    cityList.appendChild(city);
  }
  cityInput.value = storedCitiesArray[storedCitiesArray.length - 1];
}

cityList.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    cityInput.value = event.target.textContent;
  }
});

function checkDay(day) {
  if (day + d.getDay() > 6) {
    return day + d.getDay() - 7;
  } else {
    return day + d.getDay();
  }
}

for (let i = 0; i < 5; i++) {
  document.getElementById("day" + (i + 1)).innerHTML = weekday[checkDay(i)];
}

getWeatherButton.addEventListener("click", () => {
  cityName.innerHTML = "--" + cityInput.value + "--";

  const city = document.createElement("li");
  city.textContent = cityInput.value;

  cityList.appendChild(city);

  if (storedCities) {
    localStorage.setItem("city-input", storedCities + "," + cityInput.value);
  } else {
    localStorage.setItem("city-input", cityInput.value);
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&appid=6fb5bb4e0135bd380dd60dbd41ce6ad6`
  )
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1) + "Min").innerHTML =
          "Min:" + Number(data.list[i].main.temp_min - 288.53).toFixed(1) + "°";
      }
      for (let i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1) + "Max").innerHTML =
          "Max:" + Number(data.list[i].main.temp_max - 288.53).toFixed(1) + "°";
      }

      for (let i = 0; i < 5; i++) {
        document.getElementById("img" + (i + 1)).src =
          "http://openweathermap.org/img/wn/" +
          data.list[i].weather[0].icon +
          ".png";
      }
    });
});
