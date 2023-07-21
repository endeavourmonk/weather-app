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

const InfoCard = ({ weather }) => {
  const [currTime, setCurrTime] = useState(
    new Date(Date.now()).toLocaleTimeString()
  );

  setInterval(
    () => setCurrTime(new Date(Date.now()).toLocaleTimeString()),
    1000
  );

  const {
    temp_c,
    condition: { text, icon },
    precip_mm,
  } = weather.current;

  return (
    <div className={styles.infoCard}>
      <div className={styles.infoImg}>
        <img className="styles.infoImg" src={icon} alt="error loading" />
      </div>
      <div className={styles.infoTemp}>{`${temp_c}  °C`}</div>
      <div className={styles.weekdayTime}>
        <span className={styles.weekday}>{`${dayNames[dayNumber]}, `}</span>
        <span className={styles.currentTime}>{currTime}</span>
      </div>

      <div className={styles.borderLine}></div>

      <div className={styles.infoBox}>
        <div>{text}</div>
        <div>{`Precepitation(mm): ${precip_mm}`}</div>
      </div>
    </div>
  );
};

export default InfoCard;
