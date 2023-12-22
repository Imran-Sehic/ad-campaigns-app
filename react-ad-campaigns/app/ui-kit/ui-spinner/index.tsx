import styles from "./ui-spinner.module.css";

const UISpinner: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default UISpinner;
