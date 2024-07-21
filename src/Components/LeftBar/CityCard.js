import styles from "./styles.module.css";

const CityCard = ({ info }) => {
  return (
    <div className={styles.cityCard}>
      <div className={styles.cityName}>{info}</div>
    </div>
  );
};

export default CityCard;
