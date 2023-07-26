import styles from "./styles.module.css";
import themes from "../../Pages/theme.module.css";
import CityCard from "./CityCard";
import InfoCard from "./infoCard";

const LeftBar = ({ weather, children, mode }) => {
  const {
    location: { name, region, country },
  } = weather;
  return (
    <div
      className={`${styles.container} ${
        mode === "dark" ? themes.fgDark : themes.fgLight
      }`}
    >
      {children}
      <InfoCard weather={weather} />
      <CityCard info={`${name}, ${region}, ${country}`} />
    </div>
  );
};

export default LeftBar;
