import {
  Campaign,
  PromptActionType,
  PromptType,
  StatusEnum,
} from "@/app/types";
import StatusIcon from "@/app/ui-kit/icons/statusIcon";
import DeleteIcon from "@/app/ui-kit/icons/trashBinIcon";
import { formatDate } from "@/app/utils/formatDate";
import { Dispatch, SetStateAction } from "react";
import styles from "./ui-campaign.module.css";

interface UICampaignInterface {
  campaign: Campaign;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setModalPrompt: Dispatch<SetStateAction<PromptType>>;
  index: number;
}

export const UICampaign: React.FC<UICampaignInterface> = ({
  campaign,
  setIsModalOpen,
  setModalPrompt,
  index,
}) => {
  const { id, name, status, created_at } = campaign;
  const { date, time } = formatDate(created_at);

  const updatePrompt = (
    prompt: string,
    data: { id: string; payload?: Campaign },
    type: PromptActionType
  ) => {
    setModalPrompt({
      prompt,
      data,
      type,
    });
    setIsModalOpen(true);
  };

  const isStatusActive = status === StatusEnum.ACTIVE;

  return (
    <div className={styles.wrapper}>
      <div>{index}</div>
      <div>{name}</div>
      <div
        className={styles.status}
        onClick={() =>
          updatePrompt(
            `Do you really want to ${
              isStatusActive ? "pause" : "activate"
            } this campaign`,
            {
              id,
              payload: {
                ...campaign,
                status: isStatusActive ? StatusEnum.PAUSED : StatusEnum.ACTIVE,
              },
            },
            PromptActionType.UPDATE
          )
        }
      >
        {status} <StatusIcon color={isStatusActive ? "green" : "red"} />
      </div>
      <div className={styles.date}>
        {date}
        <br />
        {time}
      </div>
      <div
        className={styles.delete}
        onClick={() => {
          updatePrompt(
            "Do you really want to delete this campaign?",
            { id },
            PromptActionType.DELETE
          );
        }}
      >
        <DeleteIcon color="red" />
      </div>
    </div>
  );
};
