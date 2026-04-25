const { Activity } = require('../models');
const { getWeather } = require('../services/weatherService');

exports.createActivity = async (req, res) => {
  try {
    const { name, date, city } = req.body;

    let weatherData = { condition: null, temp: null };

    if (city) {
      try {
        weatherData = await getWeather(city);
      } catch {
        // fallback if API fails
        weatherData = { condition: 'Unknown', temp: null };
      }
    }

    const activity = await Activity.create({
      name,
      date,
      city,
      weather: weatherData.condition,
      temperature: weatherData.temp,
      UserId: req.userId
    });

    res.status(201).json(activity);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll({
      where: { UserId: req.userId }
    });

    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, city } = req.body;

    const activity = await Activity.findOne({
      where: { id, UserId: req.userId }
    });

    if (!activity) {
      return res.status(404).json({ error: "Activity not found" });
    }

    await activity.update({ name, date, city });

    res.json(activity);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;

    const activity = await Activity.findOne({
      where: { id, UserId: req.userId }
    });

    if (!activity) {
      return res.status(404).json({ error: "Activity not found" });
    }

    await activity.destroy();

    res.json({ message: "Activity deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};