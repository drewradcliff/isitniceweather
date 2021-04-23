const success = (position) => {
  const lon = position.coords.longitude;
  const lat = position.coords.latitude;
  status.textContent = `Current location: ${lat}, ${lon}`;
  getGridData(lat, lon);
};

const error = () => {
  const lon = -122.431297;
  const lat = 37.773972;
  status.textContent = `Could not get location... Showing default location (San Francisco): ${lat}, ${lon}`;
  getGridData(lat, lon);
};

const getGridData = (lat, lon) => {
  fetch(`https://api.weather.gov/points/${lat},${lon}`)
    .then((res) => res.json())
    .then((data) => getForcast(data.properties.forecast))
    .catch((error) => console.error("Could not get grid data"));
};

const getForcast = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => updateTemp(data.properties.periods[0].temperature))
    .catch((error) => console.error("Could not get forcast data"));
};

const updateTemp = (temp) => {
  let element = document.getElementById("text");
  element.textContent = temp === 69 ? "Yes" : "No";
};

navigator.geolocation.getCurrentPosition(success, error);
