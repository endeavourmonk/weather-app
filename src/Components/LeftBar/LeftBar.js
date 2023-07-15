import styles from "./styles.module.css";
import CityCard from "./CityCard";
import InfoCard from "./infoCard";

const LeftBar = ({ currentWeather, children }) => {
  return (
    <div className={styles.container}>
      {children}
      <InfoCard currentWeather={currentWeather} />
      <CityCard city={currentWeather.name} />
    </div>
  );
};

export default LeftBar;
