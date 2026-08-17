import express from "express";
import axios from "axios";

const router =express.Router();

//fetch the current weather information
router.get("/", async (req, res) => {
  try {

    console.log("Weather API Key:", process.env.WEATHER_API_KEY);
    const city ="Seattle"; //city location

    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}`
    );

    const weather = response.data;

    //send the 3 data we need to frontend
    res.json({
      city: weather.location.name,
      temperature: weather.current.temp_f,
      condition: weather.current.condition.text,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Can't get the weather."
    });
  }
});

export default router;