import styles from "./styles.module.css";
import LeftBar from "../Components/LeftBar/LeftBar";
import RightBar from "../Components/RightBar/RightBar";
import SearchBar from "../Components/SearchBar/SearchBar";
import Loading from "./Loading";
import { useState, useEffect } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;
const URL = process.env.REACT_APP_URL;

const URL2 = process.env.REACT_APP_URL2;
const KEY = process.env.REACT_APP_KEY;

const getPlaceByLatitudeAndLongitude = async (lat, lon) => {
  const data = await fetch(
    `${URL}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${API_KEY}`
  );
  const place = await data.json();
  return await place[0].name;
};

const getWeatherReport = async (place) => {
  const data =
    await fetch(`${URL2}/v1/forecast.json?key=${KEY}&q=${place}&days=3&aqi=yes&alerts=no
  `);
  return await data.json();
};

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState(false);

  const handleThemeChange = () => setMode(mode === "dark" ? "light" : "dark");

  // displaying the weather report based on the current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const place = await getPlaceByLatitudeAndLongitude(
            latitude,
            longitude
          );
          await fetchWeather(place);
          setLoading(false);
        },
        async (error) => {
          console.error("Error getting geolocation:", error);
          await fetchWeather("London");
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  const fetchWeather = async (place) => {
    if (place) {
      const data = await getWeatherReport(place);
      if (data.error) {
        console.log("place not exist");
      } else {
        setWeather(data);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <LeftBar weather={weather} mode={mode}>
        <SearchBar
          fetchWeather={fetchWeather}
          handleThemeChange={handleThemeChange}
          mode={mode}
        />
      </LeftBar>
      <RightBar weather={weather} mode={mode} />
    </div>
  );
};

export default Home;
