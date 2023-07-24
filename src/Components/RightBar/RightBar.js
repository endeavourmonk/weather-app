import Card from "./Card";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureArrowDown,
  faTemperatureArrowUp,
  faMountainSun,
  faCloudSun,
  faWind,
  faCompass,
  faEye,
  faDroplet,
  faThermometer,
  faLungs,
} from "@fortawesome/free-solid-svg-icons";

import { AQI } from "../../constants/AQI-Index";

const getDayName = (dateEpoch) => {
  const dayName = new Date(dateEpoch * 1000).toLocaleString("en-US", {
    weekday: "long",
  });
  return dayName;
};

const RightBar = ({ weather }) => {
  const index = weather.current.air_quality["us-epa-index"];

  const {
    wind_kph,
    wind_dir,
    pressure_in,
    humidity,
    cloud,
    feelslike_c,
    vis_km,
    uv,
    gust_kph,
  } = weather.current;
  const { co, pm2_5, pm10 } = weather.current.air_quality;
  const { sunrise, sunset, moonrise, moonset, moon_phase } =
    weather.forecast.forecastday[0].astro;
  const { maxtemp_c, mintemp_c } = weather.forecast.forecastday[0].day;

  // constructing list of weather forecast
  const forecastlistItems = weather.forecast.forecastday.map((val) => (
    <Card
      key={val.date_epoch}
      className="forecastCard"
      title={getDayName(val.date_epoch)}
    >
      <div>
        <div className={styles.forecastImg}>
          <img src={val.day.condition.icon} alt="error loading" />
        </div>

        <div>
          <FontAwesomeIcon
            icon={faTemperatureArrowDown}
            style={{ color: "#00D1D1" }}
          />
          <span className={styles.cardData}>{`${val.day.mintemp_c} °C`}</span>
        </div>

        <div>
          <FontAwesomeIcon
            icon={faTemperatureArrowUp}
            style={{ color: "#FF0000" }}
          />
          <span className={styles.cardData}>{`${val.day.maxtemp_c} °C`}</span>
        </div>
      </div>
    </Card>
  ));

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>This Week</h2>
      <div className={styles.forecast}>{forecastlistItems}</div>
      <h2 className={styles.heading}>Today's Highlights</h2>

      <div className={styles.todayData}>
        <Card className="todayCard" title="Feels Like">
          <div>
            <FontAwesomeIcon icon={faThermometer} />
            <span className={styles.cardData}>{`${feelslike_c} °C`}</span>
          </div>
        </Card>

        <Card className="todayCard" title="Wind">
          <div>
            <FontAwesomeIcon icon={faWind} style={{ color: "#FFA500" }} />
            <span className={styles.cardData}>{`${wind_kph} Km/h`}</span>
          </div>

          <div>
            <FontAwesomeIcon
              icon={faCompass}
              spin
              style={{ color: "#FFA500" }}
            />
            <span className={styles.cardData}>{wind_dir}</span>
          </div>
        </Card>

        <Card className="todayCard" title="Visibility">
          <div>
            <FontAwesomeIcon icon={faEye} fade />
            <span className={styles.cardData}>{`${vis_km} Km`}</span>
          </div>
        </Card>

        <Card className="todayCard" title="Humidity">
          <div>
            <FontAwesomeIcon icon={faDroplet} />
            <span className={styles.cardData}>{`${humidity}`}</span>
          </div>
        </Card>

        <Card className="todayCard" title="Min & Max">
          <div>
            <FontAwesomeIcon
              icon={faTemperatureArrowUp}
              style={{ color: "#FF0000" }}
            />
            <span className={styles.cardData}>{`${maxtemp_c} °C`}</span>
          </div>

          <div>
            <FontAwesomeIcon
              icon={faTemperatureArrowDown}
              style={{ color: "#00D1D1" }}
            />
            <span className={styles.cardData}>{`${mintemp_c} °C`}</span>
          </div>
        </Card>

        <Card className="todayCard" title="Sunrise & Sunset">
          <div>
            <FontAwesomeIcon
              icon={faMountainSun}
              style={{ color: "#FFA500" }}
            />
            <span className={styles.cardData}>{sunrise}</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faCloudSun} style={{ color: "#FFA500" }} />
            <span className={styles.cardData}>{sunset}</span>
          </div>
        </Card>

        <Card className="todayCard" title="Air Components">
          <div className={styles.cardData}>
            <b>PM 2.5: </b>
            {pm2_5.toFixed(2)}
          </div>
          <div className={styles.cardData}>
            <b>PM 10: </b>
            {pm10.toFixed(2)}
          </div>
        </Card>

        <Card className="todayCard" title="Air Quaity">
          <div>
            <FontAwesomeIcon icon={faLungs} />
            <span
              style={{
                color: AQI[index].color,
                fontSize: "26px",
                fontWeight: "900",
                textAlign: "center",
              }}
              className={styles.cardData}
            >
              {AQI[index].label}
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RightBar;
