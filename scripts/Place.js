// =====================
//  STATIC WEATHER DATA (simulated, meets conditions for wind chill)
// =====================
const weatherData = {
  temperatureCelsius: 10,        // 10°C (≤ 10°C qualifies for metric wind chill)
  windSpeedKmh: 12,              // 12 km/h (> 4.8 km/h required)
  conditions: "Partly Cloudy"
};

// DOM elements
const tempSpan = document.getElementById("temp-value");
const conditionsSpan = document.getElementById("conditions");
const windSpan = document.getElementById("wind-speed");
const windChillSpan = document.getElementById("windchill-value");

// =====================
//  WIND CHILL CALCULATION (Metric formula)
//  Formula: 13.12 + 0.6215*T - 11.37*(V^0.16) + 0.3965*T*(V^0.16)
//  T = temperature in °C, V = wind speed in km/h
// =====================
function calculateWindChill(temperature, windSpeed, unit = "metric") {
  // Validate conditions: metric unit, temp ≤ 10°C, wind speed > 4.8 km/h
  if (unit === "metric") {
    if (temperature <= 10 && windSpeed > 4.8) {
      // Using exponent for wind speed
      const windPow = Math.pow(windSpeed, 0.16);
      const windChill = 13.12 + 0.6215 * temperature - 11.37 * windPow + 0.3965 * temperature * windPow;
      return Math.round(windChill * 10) / 10; // round to 1 decimal
    } else {
      return "N/A";
    }
  }
  // fallback (imperial not used in this metric page, but for completeness)
  else if (unit === "imperial") {
    if (temperature <= 50 && windSpeed > 3) {
      const windPow = Math.pow(windSpeed, 0.16);
      const windChill = 35.74 + 0.6215 * temperature - 35.75 * windPow + 0.4275 * temperature * windPow;
      return Math.round(windChill * 10) / 10;
    } else {
      return "N/A";
    }
  }
  return "N/A";
}

// =====================
//  UPDATE WEATHER SECTION WITH STATIC DATA & WIND CHILL
// =====================
function updateWeatherUI() {
  // Set static values from weatherData
  tempSpan.textContent = `${weatherData.temperatureCelsius}°C`;
  conditionsSpan.textContent = weatherData.conditions;
  windSpan.textContent = `${weatherData.windSpeedKmh} km/h`;

  // Compute wind chill based on metric conditions
  const windChillResult = calculateWindChill(
    weatherData.temperatureCelsius,
    weatherData.windSpeedKmh,
    "metric"
  );

  // Display wind chill (if N/A show as is, else add °C)
  if (windChillResult === "N/A") {
    windChillSpan.textContent = "N/A";
  } else {
    windChillSpan.textContent = `${windChillResult}°C`;
  }
}

// =====================
//  FOOTER: CURRENT YEAR & LAST MODIFIED DATE
// =====================
function setFooterDynamicContent() {
  // Current year
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Last modified date (format: MM/DD/YYYY HH:MM:SS)
  const lastModifiedSpan = document.getElementById("last-modified");
  if (lastModifiedSpan) {
    const lastMod = new Date(document.lastModified);
    const formattedDate = `${String(lastMod.getMonth() + 1).padStart(2, '0')}/${String(lastMod.getDate()).padStart(2, '0')}/${lastMod.getFullYear()} ${String(lastMod.getHours()).padStart(2, '0')}:${String(lastMod.getMinutes()).padStart(2, '0')}:${String(lastMod.getSeconds()).padStart(2, '0')}`;
    lastModifiedSpan.textContent = formattedDate;
  }
}

// =====================
//  INITIALIZE PAGE
// =====================
function initPage() {
  updateWeatherUI();
  setFooterDynamicContent();
}

// Run after DOM is fully loaded
document.addEventListener("DOMContentLoaded", initPage);