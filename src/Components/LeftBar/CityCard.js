import styles from "./styles.module.css";

const CityCard = ({ city }) => {
  return (
    <div className={styles.cityCard}>
      <img
        className={styles.imgCard}
        src="https://images.unsplash.com/photo-1454537468202-b7ff71d51c2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
        alt="error loading"
      />
      <div className={styles.cityName}>{city}</div>
    </div>
  );
};

export default CityCard;
