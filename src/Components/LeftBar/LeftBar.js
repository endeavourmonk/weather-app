import styles from "./styles.module.css";
import CityCard from "./CityCard";
import InfoCard from "./infoCard";

const LeftBar = ({ weather, children }) => {
  const {
    location: { name, region, country },
  } = weather;
  return (
    <div className={styles.container}>
      {children}
      <InfoCard weather={weather} />
      <CityCard info={`${name}, ${region}, ${country}`} />
    </div>
  );
};

export default LeftBar;
