const axios = require('axios');

exports.getWeather = async (city) => {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
  );

  return {
    condition: res.data.weather[0].main,
    temp: res.data.main.temp
  };
};
