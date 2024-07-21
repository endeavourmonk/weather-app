import styles from "./styles.module.css";

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loading}>
        <img
          className={styles.loadingImg}
          src="https://res.cloudinary.com/cloudimagestore-/image/upload/v1721560112/Assets/iu90c6ilsbpbhokymvmj.gif"
          alt="...loading"
        />
      </div>
    </div>
  );
};
export default Loading;
