// Static weather data (matches your screenshot: 10°C, 5 km/h)
const weatherData = {
  temperatureCelsius: 20,
  windSpeedKmh: 10,
  conditions: "Partly Cloudy"
};

// DOM elements
const tempSpan = document.getElementById("temp-value");
const conditionsSpan = document.getElementById("conditions");
const windSpan = document.getElementById("wind-speed");
const windChillSpan = document.getElementById("windchill-value");

// Wind chill calculation (metric formula)
function calculateWindChill(temperature, windSpeed, unit = "metric") {
  if (unit === "metric") {
    // Conditions: temperature ≤ 10°C AND wind speed > 4.8 km/h
    if (temperature <= 10 && windSpeed > 4.8) {
      const windPow = Math.pow(windSpeed, 0.16);
      const windChill = 15.60 + 0.6215 * temperature - 11.37 * windPow + 0.3965 * temperature * windPow;
      return Math.round(windChill * 10) / 10;
    } else {
      return "N/A";
    }
  }
  return "N/A";
}

// Update UI with static data and computed wind chill
function updateWeatherUI() {
  tempSpan.textContent = `${weatherData.temperatureCelsius}°C`;
  conditionsSpan.textContent = weatherData.conditions;
  windSpan.textContent = `${weatherData.windSpeedKmh} km/h`;

  const windChill = calculateWindChill(weatherData.temperatureCelsius, weatherData.windSpeedKmh, "metric");
  windChillSpan.textContent = windChill !== "N/A" ? `${windChill}°C` : "N/A";
}

// Footer: current year and last modified date
function setFooterDynamicContent() {
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  const lastModifiedSpan = document.getElementById("last-modified");
  if (lastModifiedSpan) {
    const lastMod = new Date(document.lastModified);
    const formatted = `${String(lastMod.getMonth() + 1).padStart(2, '0')}/${String(lastMod.getDate()).padStart(2, '0')}/${lastMod.getFullYear()} ${String(lastMod.getHours()).padStart(2, '0')}:${String(lastMod.getMinutes()).padStart(2, '0')}:${String(lastMod.getSeconds()).padStart(2, '0')}`;
    lastModifiedSpan.textContent = formatted;
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  updateWeatherUI();
  setFooterDynamicContent();
});