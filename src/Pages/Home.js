import styles from "./styles.module.css";
import LeftBar from "../Components/LeftBar/LeftBar";
import RightBar from "../Components/RightBar/RightBar";
import SearchBar from "../Components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { URL, API_KEY } from "../Constants";

// get latitude and longitude of a place
const getLatandLon = async (place) => {
  const data = await fetch(
    `${URL}/geo/1.0/direct?q=${place}&limit=5&appid=${API_KEY}`
  );
  const lat = await data.json()[0].lat;
  const lon = await data.json()[0].lon;
  return [lat, lon];
};

// fetch the Air Quality data
const getAirQuality = async (lat, lon) => {
  const data = fetch(
    `${URL}/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API key}`
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

const Home = () => {
  const [currWeather, setCurrWeather] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(true);

  // displaying the weather report based on the current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const res = await getCurrentWeatherByLatLon(latitude, longitude);
          setCurrWeather(res);
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
    setCurrWeather(res);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <LeftBar currentWeather={currWeather}>
        <SearchBar fetchWeather={fetchWeather} />
      </LeftBar>
      <RightBar currentWeather={currWeather} />
    </div>
  );
};

export default Home;
