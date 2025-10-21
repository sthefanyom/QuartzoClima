const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const errorMessage = document.getElementById("error-message");

// Mapeamento dos códigos da API Open-Meteo
const weatherCodes = {
  0: { desc: "Céu limpo", icon: "☀️" },
  1: { desc: "Principalmente limpo", icon: "🌤️" },
  2: { desc: "Parcialmente nublado", icon: "⛅" },
  3: { desc: "Nublado", icon: "☁️" },
  45: { desc: "Nevoeiro", icon: "🌫️" },
  48: { desc: "Nevoeiro gelado", icon: "🌫️" },
  51: { desc: "Garoa leve", icon: "🌦️" },
  61: { desc: "Chuva leve", icon: "🌧️" },
  63: { desc: "Chuva moderada", icon: "🌧️" },
  65: { desc: "Chuva forte", icon: "🌧️" },
  80: { desc: "Aguaceiros", icon: "🌦️" },
  95: { desc: "Trovoadas", icon: "⛈️" },
};

// 🔍 Evento de busca
searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) return;

  try {
    errorMessage.classList.add("hidden");
    weatherInfo.classList.add("hidden");

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
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&forecast_days=7`
    );
    const weatherData = await weatherResponse.json();

    // 🌤️ Clima atual
    const current = weatherData.current;
    const currentWeather = weatherCodes[current.weathercode] || { desc: "Desconhecido", icon: "❓" };

    cityName.textContent = `${name}, ${country}`;
    temperature.textContent = `${current.temperature_2m.toFixed(1)}°C`;
    description.textContent = `${currentWeather.desc} ${currentWeather.icon}`;
    weatherIcon.innerHTML = currentWeather.icon;

    weatherInfo.classList.remove("hidden");

    // 📅 Previsão semanal
    createForecast(weatherData.daily);
  } catch (error) {
    console.error(error);
    errorMessage.textContent = error.message;
    errorMessage.classList.remove("hidden");
  }
});

// Função para criar os cards de previsão da semana
function createForecast(daily) {
  // Remove previsão anterior, se houver
  const oldForecast = document.getElementById("forecast");
  if (oldForecast) oldForecast.remove();

  const forecastContainer = document.createElement("div");
  forecastContainer.id = "forecast";
  forecastContainer.classList.add("forecast");

  daily.time.forEach((dateStr, i) => {
    const date = new Date(dateStr);
    const options = { weekday: "short", day: "2-digit", month: "2-digit" };
    const dayName = date.toLocaleDateString("pt-BR", options);

    const code = daily.weathercode[i];
    const iconData = weatherCodes[code] || { desc: "Desconhecido", icon: "❓" };
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
