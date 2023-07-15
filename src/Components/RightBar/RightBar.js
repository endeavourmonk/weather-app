import Card from "./Card";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureArrowDown,
  faTemperatureArrowUp,
  faMountainSun,
  faCloudSun,
  faWind,
  faEye,
  faDroplet,
  faThermometer,
  faLungs,
} from "@fortawesome/free-solid-svg-icons";

const RightBar = ({ currentWeather, airQuality, forecast }) => {
  const AQI = {
    1: { label: "Good", color: "#00D100" },
    2: { label: "Fair", color: "#D1D100" },
    3: { label: "Moderate", color: "#FFA500" },
    4: { label: "Poor", color: "#FF5C5C" },
    5: { label: "Very Poor", color: "#FF0000" },
  };

  const index = airQuality.list[0].main.aqi;
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>This Week</h2>
      <div className={styles.forecast}>
        <Card className="forecastCard" title="Mon" data="20 C" />
        <Card className="forecastCard" title="Mon" data="20 C" />
        <Card className="forecastCard" title="Mon" data="20 C" />
        <Card className="forecastCard" title="Mon" data="20 C" />
        <Card className="forecastCard" title="Mon" data="20 C" />
      </div>
      <h2 className={styles.heading}>Today's Highlights</h2>

      <div className={styles.todayData}>
        <Card className="todayCard" title="Feels Like">
          <div>
            <FontAwesomeIcon icon={faThermometer} />
            <span
              className={styles.cardData}
            >{`${currentWeather.main.feels_like} °C`}</span>
          </div>
        </Card>

        <Card className="todayCard" title="Wind">
          <div>
            <FontAwesomeIcon icon={faWind} style={{ color: "#FFA500" }} />
            <span
              className={styles.cardData}
            >{`${currentWeather.wind.speed} Km/h`}</span>
          </div>
        </Card>

        <Card className="todayCard" title="Visibility">
          <div>
            <FontAwesomeIcon icon={faEye} />
            <span className={styles.cardData}>{`${
              currentWeather.visibility / 1000
            } Km`}</span>
          </div>
        </Card>

        <Card className="todayCard" title="Humidity">
          <div>
            <FontAwesomeIcon icon={faDroplet} />
            <span className={styles.cardData}>{`${
              currentWeather.main.humidity / 1000
            }`}</span>
          </div>
        </Card>

        <Card className="todayCard" title="Min & Max">
          <div>
            <FontAwesomeIcon
              icon={faTemperatureArrowDown}
              style={{ color: "#00D1D1" }}
            />
            <span
              className={styles.cardData}
            >{`${currentWeather.main.temp_min} °C`}</span>
          </div>
          <div>
            <FontAwesomeIcon
              icon={faTemperatureArrowUp}
              style={{ color: "#FF0000" }}
            />
            <span
              className={styles.cardData}
            >{`${currentWeather.main.temp_max} °C`}</span>
          </div>
        </Card>

        <Card className="todayCard" title="Sunrise & Sunset">
          <div>
            <FontAwesomeIcon
              icon={faMountainSun}
              style={{ color: "#FFA500" }}
            />
            <span className={styles.cardData}>
              {new Date(1000 * currentWeather.sys.sunrise).toLocaleTimeString()}
            </span>
          </div>
          <div>
            <FontAwesomeIcon icon={faCloudSun} style={{ color: "#FFA500" }} />
            <span className={styles.cardData}>
              {new Date(1000 * currentWeather.sys.sunset).toLocaleTimeString()}
            </span>
          </div>
        </Card>

        <Card className="todayCard" title="Air Components">
          <div className={styles.cardData}>
            <b>CO: </b>
            {airQuality.list[0].components.co}
          </div>
          <div className={styles.cardData}>
            <b>PM 2.5: </b>
            {airQuality.list[0].components.pm2_5}
          </div>
          <div className={styles.cardData}>
            <b>PM 10: </b>
            {airQuality.list[0].components.pm10}
          </div>
        </Card>

        <Card className="todayCard" title="Air Quaity">
          <div>
            <FontAwesomeIcon icon={faLungs} />
            <span
              style={{
                color: AQI[index].color,
                fontSize: "28px",
                fontWeight: "900",
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
