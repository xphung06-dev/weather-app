const temperatureField = document.querySelector(".temp p");
const locationField = document.querySelector(".time_location p");
const dateAndTimeField = document.querySelector(".time_location span");
const conditionField = document.querySelector(".condition span");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");
const weatherIcon = document.querySelector(".weather_icon");
const container = document.querySelector(".container");

let target = "Vietnam";

form.addEventListener("submit", searchForLocation);

const fetchWeather = async (targetLocation) => {
  let url = `https://api.weatherapi.com/v1/current.json?key=c249f99e8b804787b1321612263006&q=${targetLocation}&aqi=no`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error.message);
    }

    let locationName = data.location.name;
    let time = data.location.localtime;
    let temp = data.current.temp_c;
    let condition = data.current.condition.text;
    let icon = data.current.condition.icon;
    updateDetails(temp, locationName, time, condition, icon);
  } catch (err) {
    alert("Location not found!");
  }
};

function updateDetails(temp, locationName, time, condition, icon) {
  let splitDate = time.split(" ")[0];
  let splitTime = time.split(" ")[1];
  let hour = Number(splitTime.split(":")[0]);

  let currentDay = getDayName(new Date(splitDate).getDay());

  temperatureField.innerHTML = `${temp}&deg;C`;
  locationField.innerText = locationName;
  dateAndTimeField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
  conditionField.innerText = condition;
  weatherIcon.src = "https:" + icon;
  changeBackground(hour);
}

function getDayName(number) {
  switch (number) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
}

function searchForLocation(e) {
  e.preventDefault();
  if (searchField.value.trim() === "") return;
  target = searchField.value.trim();
  fetchWeather(target);
  searchField.value = "";
}

function changeBackground(hour) {
  container.classList.remove("sunrise", "day", "sunset", "night");

  if (hour >= 5 && hour < 7) {
    container.classList.add("sunrise");
  } else if (hour >= 7 && hour < 18) {
    container.classList.add("day");
  } else if (hour >= 18 && hour < 20) {
    container.classList.add("sunset");
  } else {
    container.classList.add("night");
  }
}
fetchWeather(target);
