const success = (position) => {
  const lon = position.coords.longitude;
  const lat = position.coords.latitude;
  status.textContent = "Location: ";
  getForecast(lat, lon);
};

const error = () => {
  const lon = 7.26608;
  const lat = 43.70313;
  status.textContent = "Could not get location... Showing default location: ";
  getForecast(lat, lon);
};

const getForecast = (lat, lon) => {
  fetch(`/forecast?lat=${lat}&lon=${lon}`)
    .then((res) => res.json())
    .then((data) => {
      status.textContent += `${data.location.name}, ${data.location.country}`;
      updateTemp(Math.round(data.current.temp_f));
    });
};

const updateTemp = (temp) => {
  let text = document.createElement("h1");
  text.textContent = temp === 69 ? "Nice" : "No";
  document.body.appendChild(text);
  let tempText = document.createElement("h1");
  tempText.textContent = `${temp}°F`;
  document.body.appendChild(tempText);
};

let status = document.createElement("p");
document.body.appendChild(status);
navigator.geolocation.getCurrentPosition(success, error);
