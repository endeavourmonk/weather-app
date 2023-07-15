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
} from "@fortawesome/free-solid-svg-icons";

const RightBar = ({ currentWeather }) => {
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
            <FontAwesomeIcon icon={faDroplet} />
            <span>{` ${currentWeather.main.feels_like} °C`}</span>
          </div>
        </Card>

        <Card className="todayCard" title="Min & Max">
          <div>
            <FontAwesomeIcon
              icon={faTemperatureArrowDown}
              style={{ color: "#00D1D1" }}
            />
            <span>{`${currentWeather.main.temp_min} °C`}</span>
          </div>
          <div>
            <FontAwesomeIcon
              icon={faTemperatureArrowUp}
              style={{ color: "#FF0000" }}
            />
            <span>{`${currentWeather.main.temp_max} °C`}</span>
          </div>
        </Card>

        <Card className="todayCard" title="Sunrise & Sunset">
          <div>
            <FontAwesomeIcon
              icon={faMountainSun}
              style={{ color: "#FFA500" }}
            />
            <span style={{ paddingLeft: "6px" }}>
              {new Date(1000 * currentWeather.sys.sunrise).toLocaleTimeString()}
            </span>
          </div>
          <div>
            <FontAwesomeIcon icon={faCloudSun} style={{ color: "#FFA500" }} />
            <span>
              {new Date(1000 * currentWeather.sys.sunset).toLocaleTimeString()}
            </span>
          </div>
        </Card>

        <Card className="todayCard" title="Wind">
          <div>
            <FontAwesomeIcon icon={faWind} style={{ color: "#FFA500" }} />
            <span>{` ${currentWeather.wind.speed} Km`}</span>
          </div>
        </Card>

        <Card className="todayCard" title="Visibility">
          <div>
            <FontAwesomeIcon icon={faEye} />
            <span>{` ${currentWeather.visibility / 1000} Km`}</span>
          </div>
        </Card>

        <Card className="todayCard" title="Humidity">
          <div>
            <FontAwesomeIcon icon={faDroplet} />
            <span>{` ${currentWeather.main.humidity / 1000}`}</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RightBar;
