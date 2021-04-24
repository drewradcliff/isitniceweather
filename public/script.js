const success = (position) => {
  const lon = position.coords.longitude;
  const lat = position.coords.latitude;
  fetch(`http://localhost:3000/forecast?lat=${lat}&lon=${lon}`)
    .then((res) => res.json())
    .then((data) => updateTemp(Math.round(data.current.temp_f)));
};

const error = () => {
  const lon = -122.431297;
  const lat = 37.773972;
  status.textContent = `Could not get location... Showing default location (San Francisco): ${lat}, ${lon}`;
  getForecast(lat, lon);
};

const updateTemp = (temp) => {
  let text = document.createElement("h1");
  text.textContent = temp === 69 ? "Nice" : "No";
  document.body.appendChild(text);
  let tempText = document.createElement("h1");
  tempText.textContent = `${temp}°F`;
  document.body.appendChild(tempText);
};

navigator.geolocation.getCurrentPosition(success, error);
