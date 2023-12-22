import { Metadata, NextPage } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "PPC.io - About the platform!",
  description: "About PPC.io and it's benefits!",
};

const AboutPage: NextPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1>
        Welcome to <span>PPC</span>.IO!
      </h1>
      <h4>
        <span>PPC</span>.IO is an advertisement platform based on a Pay Per
        Click system.
      </h4>
      <h4>
        At <span>PPC</span>.IO you can create and origanize you PPC ad
        campaigns.
      </h4>
    </div>
  );
};

export default AboutPage;
