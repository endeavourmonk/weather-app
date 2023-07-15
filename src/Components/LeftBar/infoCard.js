import styles from "./styles.module.css";
import { useState } from "react";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const dayNumber = new Date().getDay();

const InfoCard = ({ currentWeather }) => {
  const [currTime, setCurrTime] = useState(
    new Date(Date.now()).toLocaleTimeString()
  );

  setInterval(
    () => setCurrTime(new Date(Date.now()).toLocaleTimeString()),
    1000
  );

  return (
    <div className={styles.infoCard}>
      <div className={styles.infoImg}>
        <img
          className="styles.infoImg"
          src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
          alt="error loading"
        />
      </div>
      <div className={styles.infoTemp}>{`${currentWeather.main.temp}  °C`}</div>
      <div className={styles.weekdayTime}>
        <span className={styles.weekday}>{`${dayNames[dayNumber]}, `}</span>
        <span className={styles.currentTime}>{currTime}</span>
      </div>

      <div className={styles.borderLine}></div>

      <div className={styles.infoBox}>
        <div>{currentWeather.weather[0].main}</div>
        <div>{currentWeather.weather[0].description}</div>
      </div>
    </div>
  );
};

export default InfoCard;
