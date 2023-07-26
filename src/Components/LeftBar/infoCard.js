import styles from "./styles.module.css";
import { useState, useEffect } from "react";

const getlocalTimeAndDay = (timeZone) => {
  const timeOptions = {
    timeZone: timeZone,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const dayOptions = { timeZone: timeZone, weekday: "long" };

  return {
    localTime: new Date().toLocaleTimeString([], timeOptions),
    currentTime: new Date(Date.now()).toLocaleTimeString(),
    dayOfWeek: new Date().toLocaleDateString([], dayOptions),
    today: new Date().toLocaleString("en", { weekday: "long" }),
  };
};

const InfoCard = ({ weather }) => {
  const [timeAndDay, setTimeAndDay] = useState(
    getlocalTimeAndDay(weather.location.tz_id)
  );

  useEffect(() => {
    // Start the interval when the component mounts
    const intervalId = setInterval(() => {
      setTimeAndDay(getlocalTimeAndDay(weather.location.tz_id));
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [weather.location.tz_id]);

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
        <div>
          <span className={styles.weekday}>{`${timeAndDay.today}, `}</span>
          <span className={styles.currentTime}>{timeAndDay.currentTime}</span>
        </div>
        <div>
          <h5>Local Time</h5>
          <span className={styles.weekday}>{`${timeAndDay.dayOfWeek}, `}</span>
          <span className={styles.currentTime}>{timeAndDay.localTime}</span>
        </div>
      </div>

      <div className={styles.borderLine}></div>

      <div className={styles.infoBox}>
        <div>{text}</div>
        <div>
          <b>Precipitation</b>
          {` ${precip_mm} mm`}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
