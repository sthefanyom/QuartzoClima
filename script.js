const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const errorMessage = document.getElementById("error-message");

// Permitir buscar com Enter
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

// Mapeamento completo dos códigos da API Open-Meteo
const weatherCodes = {
  0:  { desc: "Céu limpo", icon: "☀️" },
  1:  { desc: "Principalmente limpo", icon: "🌤️" },
  2:  { desc: "Parcialmente nublado", icon: "⛅" },
  3:  { desc: "Nublado", icon: "☁️" },
  45: { desc: "Nevoeiro", icon: "🌫️" },
  48: { desc: "Nevoeiro gelado", icon: "🌫️❄️" },
  51: { desc: "Garoa leve", icon: "🌦️" },
  53: { desc: "Garoa moderada", icon: "🌧️" },
  55: { desc: "Garoa intensa", icon: "🌧️" },
  56: { desc: "Garoa congelante leve", icon: "🌨️" },
  57: { desc: "Garoa congelante forte", icon: "🌨️❄️" },
  61: { desc: "Chuva leve", icon: "🌦️" },
  63: { desc: "Chuva moderada", icon: "🌧️" },
  65: { desc: "Chuva forte", icon: "🌧️☔" },
  66: { desc: "Chuva congelante leve", icon: "🌨️" },
  67: { desc: "Chuva congelante forte", icon: "🌨️❄️" },
  71: { desc: "Neve leve", icon: "🌨️" },
  73: { desc: "Neve moderada", icon: "❄️" },
  75: { desc: "Neve forte", icon: "❄️🌨️" },
  77: { desc: "Grãos de neve", icon: "🌨️" },
  80: { desc: "Aguaceiros leves", icon: "🌦️" },
  81: { desc: "Aguaceiros moderados", icon: "🌧️" },
  82: { desc: "Aguaceiros fortes", icon: "⛈️" },
  85: { desc: "Aguaceiros de neve leves", icon: "🌨️" },
  86: { desc: "Aguaceiros de neve fortes", icon: "❄️🌨️" },
  95: { desc: "Trovoadas leves ou moderadas", icon: "🌩️" },
  96: { desc: "Trovoadas com granizo leve", icon: "🌩️🌧️" },
  99: { desc: "Trovoadas com granizo forte", icon: "⛈️🌪️" },
  default: { desc: "Desconhecido", icon: "❓" }
};

// 🔍 Evento de busca
searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) return;

  searchBtn.disabled = true;
  searchBtn.textContent = "Buscando...";
  errorMessage.classList.add("hidden");
  weatherInfo.classList.add("hidden");

  try {
    // 1️⃣ Buscar latitude e longitude
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`
    );
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("Cidade não encontrada!");
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // 2️⃣ Buscar dados do clima
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=7`
    );
    const weatherData = await weatherResponse.json();

    // 🌦️ Clima atual
    const currentWeatherCode = weatherData.current.weather_code;
    const temperatureNow = weatherData.current.temperature_2m;

    const weather = weatherCodes[currentWeatherCode] || weatherCodes.default;

    cityName.textContent = `${name}, ${country}`;
    temperature.textContent = `${temperatureNow.toFixed(1)}°C`;
    description.textContent = `${weather.desc} ${weather.icon}`;
    weatherIcon.innerHTML = weather.icon;
    weatherInfo.classList.remove("hidden");

    // 📅 Previsão semanal
    createForecast(weatherData.daily);

  } catch (error) {
    console.error(error);
    errorMessage.textContent = "⚠️ " + error.message;
    errorMessage.classList.remove("hidden");

    const oldForecast = document.getElementById("forecast");
    if (oldForecast) oldForecast.remove();

  } finally {
    searchBtn.disabled = false;
    searchBtn.textContent = "Buscar";
  }
});

// Função para criar os cards de previsão da semana
function createForecast(daily) {
  const oldForecast = document.getElementById("forecast");
  if (oldForecast) oldForecast.remove();

  const forecastContainer = document.createElement("div");
  forecastContainer.id = "forecast";
  forecastContainer.classList.add("forecast");

  daily.time.forEach((dateStr, i) => {
    const date = new Date(dateStr);
    const options = { weekday: "short", day: "2-digit", month: "2-digit" };
    const dayName = date.toLocaleDateString("pt-BR", options);

    const code = daily.weather_code[i];
    const iconData = weatherCodes[code] || weatherCodes.default;
    const max = daily.temperature_2m_max[i].toFixed(1);
    const min = daily.temperature_2m_min[i].toFixed(1);

    const dayCard = document.createElement("div");
    dayCard.classList.add("day-card");
    dayCard.innerHTML = `
      <p><strong>${dayName}</strong></p>
      <p class="icon">${iconData.icon}</p>
      <p>${min}°C / ${max}°C</p>
      <small>${iconData.desc}</small>
    `;

    forecastContainer.appendChild(dayCard);
  });

  document.querySelector("main").appendChild(forecastContainer);
}
