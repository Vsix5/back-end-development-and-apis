import express from "express";

const router = express.Router();

const SUPPORTED_CITIES = [ "New York",
  "Chicago",
  "Los Angeles",
  "Tokyo",
  "London"];

router.get("/", (req, res) => {
    res.status(200).json(SUPPORTED_CITIES);
})
router.get("/:city", async (req, res) => {
    const {city} = req.params;
    try {
    const response = await fetch(
        `https:weather-proxy.freecodecamp.rocks/api/city/${city}`,
    )
    const data = await response.json();
    res.json({
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
    })
}
catch(error) {
    res
       .status(404)
       .json({
        error: `Could not fetch weather data for "${city}".`
       })
}
    res.json({
        message: `City: ${req.params.city}`
    })
})
router.get("/api/weather/london", (req, res) => {
    res.status(200).json({
        
    })
})

export default router;