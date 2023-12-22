import { NextPage } from "next";
import { UICampaignListing } from "./components/ui-campaign-listing";
import styles from "./page.module.css";
import { getCampaignsQuery } from "./queries";

const HomePage: NextPage = async () => {
  const { data, pages, records, limit } = await getCampaignsQuery(1);

  return (
    <div className={styles.container}>
      <UICampaignListing
        listing={data}
        page={1}
        pages={pages}
        records={records}
        limit={limit}
      />
    </div>
  );
};

export default HomePage;
