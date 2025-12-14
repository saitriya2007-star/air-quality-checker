const apiKey = "PASTE_YOUR_API_KEY_HERE";

function getAirQuality() {
  const city = document.getElementById("city").value;
  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
    .then(response => response.json())
    .then(location => {
      const lat = location[0].lat;
      const lon = location[0].lon;

      fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => {
          const aqi = data.list[0].main.aqi;
          let status = "";
          let advice = "";

          if (aqi === 1) {
            status = "Good";
            advice = "Air quality is satisfactory.";
          } else if (aqi === 2) {
            status = "Fair";
            advice = "Sensitive people should be cautious.";
          } else if (aqi === 3) {
            status = "Moderate";
            advice = "Limit prolonged outdoor activities.";
          } else if (aqi === 4) {
            status = "Poor";
            advice = "Avoid outdoor exposure.";
          } else {
            status = "Very Poor";
            advice = "Health alert: Stay indoors.";
          }

          document.getElementById("result").innerHTML = `
            <h3>AQI Level: ${aqi}</h3>
            <p><b>Status:</b> ${status}</p>
            <p><b>Health Advice:</b> ${advice}</p>
          `;
        });
    })
    .catch(() => alert("City not found"));
}
