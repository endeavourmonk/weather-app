import styles from "./styles.module.css";
import LeftBar from "../Components/LeftBar/LeftBar";
import RightBar from "../Components/RightBar/RightBar";
import SearchBar from "../Components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
// require("dotenv").config();

const API_KEY = process.env.REACT_APP_API_KEY;
const URL = process.env.REACT_APP_URL;
console.log(URL);
console.log(API_KEY);

// get latitude and longitude of a place
const getLatandLon = async (place) => {
  const data = await fetch(
    `${URL}/geo/1.0/direct?q=${place}&limit=5&appid=${API_KEY}`
  );
  const jsonData = await data.json();
  const lat = jsonData[0].lat;
  const lon = jsonData[0].lon;
  return [lat, lon];
};

// fetch the Air Quality data
const getAirQuality = async (lat, lon) => {
  const data = fetch(
    `${URL}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  return (await data).json();
};

// fetch weather by latitude and longitude
const getCurrentWeatherByLatLon = async (lat, lon) => {
  const data = await fetch(
    `${URL}/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
  );
  return await data.json();
};

// fetch weather by place
const getCurrentWeather = async (place) => {
  const data = await fetch(
    `${URL}/data/2.5/weather?q=${place}&APPID=${API_KEY}&units=metric`
  );
  return await data.json();
};

// fetch 5 day forecast by place name
const getForecast = async (place) => {
  const data = await fetch(
    `${URL}/data/2.5/forecast?q=${place}&appid=${API_KEY}`
  );
  return await data.json();
};

const Home = () => {
  const [currWeather, setCurrWeather] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  // displaying the weather report based on the current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const res = await getCurrentWeatherByLatLon(latitude, longitude);
          const air_pollution = await getAirQuality(latitude, longitude);
          setCurrWeather(res);
          setAirQuality(air_pollution);
          setLoading(false);
        },
        async (error) => {
          console.error("Error getting geolocation:", error);
          // if not got location then displaying London's weather
          const res = await getCurrentWeather("London");
          setCurrWeather(res);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  const fetchWeather = async (place) => {
    const res = await getCurrentWeather(place);
    const [lat, lon] = await getLatandLon(place);
    const air_pollution = await getAirQuality(lat, lon);
    const forecast_data = await getForecast(place);
    console.log(forecast_data);
    setForecast(forecast_data);
    setCurrWeather(res);
    setAirQuality(air_pollution);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <LeftBar currentWeather={currWeather}>
        <SearchBar fetchWeather={fetchWeather} />
      </LeftBar>
      <RightBar
        currentWeather={currWeather}
        airQuality={airQuality}
        forecast={forecast}
      />
    </div>
  );
};

export default Home;
