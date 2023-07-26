import styles from "./styles.module.css";
import themes from "../../Pages/theme.module.css";

const Card = ({ title, className, mode, children }) => {
  return (
    <div
      className={`${styles[className]} ${
        mode === "dark" ? themes.fgDark : themes.fgLight
      }`}
    >
      <div className={styles.cardTitle}>{title}</div>
      {children}
    </div>
  );
};

export default Card;
