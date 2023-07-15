import styles from "./styles.module.css";

const Card = ({ title, data, className, children }) => {
  return (
    <div className={styles[className]}>
      <h3 className={styles.cardTitle}>{title}</h3>
      {children}
    </div>
  );
};

export default Card;
