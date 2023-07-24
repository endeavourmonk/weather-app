import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const URL2 = process.env.REACT_APP_URL2;
const KEY = process.env.REACT_APP_KEY;

const searchSuggestion = async (query) => {
  if (query) {
    const suggestions = await fetch(
      `${URL2}/v1/search.json?key=${KEY}&q=${query}`
    );
    return await suggestions.json();
  }
};

const SearchBar = ({ fetchWeather }) => {
  const [searchSuggestions, setSearchSuggestions] = useState(null);

  const handleSearchChange = async (e) => {
    const suggestions = await searchSuggestion(e.target.value);
    setSearchSuggestions(suggestions);
  };

  const handleDropdownItemClick = (e) => {
    fetchWeather(e.target.innerText);
    setSearchSuggestions(null);
    document.querySelector(`.${styles.searchBar}`).value = "";
  };

  const handleSearch = async (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      fetchWeather(e.target.value);
      e.target.value = "";
      setSearchSuggestions(null);
    }
  };

  const handleCrosshairClick = () => {
    const input = document.querySelector(`.${styles.searchBar}`);
    let place = input.value;
    fetchWeather(place);
    input.value = "";
    setSearchSuggestions(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <FontAwesomeIcon className={styles.icon} icon={faMagnifyingGlass} />
        <input
          onChange={handleSearchChange}
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
      <div className={styles.dropdown}>
        {searchSuggestions &&
          searchSuggestions.map((item) => (
            <div
              onClick={handleDropdownItemClick}
              className={styles.dropdownItem}
              key={item.id}
            >{`${item.name}, ${item.region}, ${item.country}`}</div>
          ))}
      </div>
    </div>
  );
};

export default SearchBar;
