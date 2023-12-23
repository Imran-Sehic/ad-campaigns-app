import { getCampaignsQuery } from "@/app/queries";
import useCampaignStore from "@/app/store";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import styles from "./ui-pagination.module.css";

interface UIPaginationInterface {
  pages: number;
  activePage: number;
  setActivePage: Dispatch<SetStateAction<number>>;
}

export const UIPagination: React.FC<UIPaginationInterface> = ({
  pages,
  activePage,
  setActivePage,
}) => {
  const { setCampaigns } = useCampaignStore();
  const paginate = async (page: number) => {
    setActivePage(page);
    const resp = await getCampaignsQuery(page);
    if (!("error" in resp)) setCampaigns(resp.data);
  };
  return (
    <div className={styles.wrapper}>
      {Array(pages)
        .fill(0)
        .map((page, index) => (
          <div
            key={index}
            className={clsx(
              styles.page,
              index + 1 === activePage && styles.active
            )}
            onClick={async () => {
              index + 1 != activePage && (await paginate(index + 1));
            }}
          >
            {index + 1}
          </div>
        ))}
    </div>
  );
};
