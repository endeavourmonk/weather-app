import styles from "./styles.module.css";

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loading}>
        <img
          className={styles.loadingImg}
          src={process.env.PUBLIC_URL + "/loading.gif"}
          alt="...loading"
        />
      </div>
    </div>
  );
};
export default Loading;
