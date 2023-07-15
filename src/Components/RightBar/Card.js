import styles from "./styles.module.css";

const Card = ({ title, className, children }) => {
  return (
    <div className={styles[className]}>
      <div className={styles.cardTitle}>{title}</div>
      {children}
    </div>
  );
};

export default Card;
