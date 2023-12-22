import { Metadata, NextPage } from "next";
import Link from "next/link";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "PPC.io - Page Not Found!",
  description: "Wrong page route, return to homepage!",
};

const Custom404Page: NextPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Ops!</h1>
      <p>404</p>
      <h3>This route doesn&apos;t exist.</h3>
      <h3>
        Return back to the{" "}
        <Link href={"/"} className={styles.link}>
          homepage
        </Link>
      </h3>
    </div>
  );
};

export default Custom404Page;
