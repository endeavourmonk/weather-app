import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCrosshairs,
} from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ fetchWeather }) => {
  const handleSearch = async (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      fetchWeather(e.target.value);
    }
  };

  const handleCrosshairClick = () => {
    const input = document.querySelector(`.${styles.searchBar}`);
    const place = input.value;
    fetchWeather(place);
  };

  return (
    <div className={styles.container}>
      <FontAwesomeIcon className={styles.icon} icon={faMagnifyingGlass} />
      <input
        onKeyUp={handleSearch}
        className={styles.searchBar}
        type="text"
        placeholder="Search for Places..."
      />
      <FontAwesomeIcon
        className={styles.icon}
        icon={faCrosshairs}
        onClick={handleCrosshairClick}
      />
    </div>
  );
};

export default SearchBar;
