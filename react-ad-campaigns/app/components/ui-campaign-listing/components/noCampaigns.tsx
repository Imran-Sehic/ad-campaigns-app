import styles from "./no-campaigns.module.css";

export const NoCampaigns: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <p>No Campaigns available!</p>
    </div>
  );
};
