const apiKey = "dcb66753beab8eeb43ed7f4376e3244e";

// Constructor para el objeto Weather
function Weather(city) {
  this.city = city;

  this.getWeather = async function () {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apiKey}&lang=es`,
      );
      if (response.ok) {
        const data = await response.json();
        const f = new Date();
        //Devuelve formato sólo de fecha pero en el formato regional actual ejemplo: 24/8/2019
        console.log(f.toLocaleDateString());
        // Procesar la respuesta
        const weatherData = `
        <p>${f.toLocaleDateString()}     Ciudad: ${data.name}</p>
          <p>Temperatura: ${data.main.temp}°C</p>
          <p>Temperatura minima: ${data.main.temp_min}°C</p>
          <p>Temperatura maxima: ${data.main.temp_max}°C</p>
          <p>Clima: ${data.weather[0].description}</p>
          <p>Humedad: ${data.main.humidity}°</p>
        `;
        document.getElementById("weatherData").innerHTML = weatherData;
      } else {
        throw new Error("Error al obtener datos del clima");
      }
    } catch (error) {
      console.error("Error al obtener datos del clima:", error);
    }
  };
}

// Objeto WeatherApp
const WeatherApp = {
  init: function () {
    document.getElementById("getWeatherBtn").addEventListener("click", () => {
      const city = document.getElementById("cityInput").value;
      const weather = new Weather(city);
      weather.getWeather();
    });
  },
};

WeatherApp.init();
