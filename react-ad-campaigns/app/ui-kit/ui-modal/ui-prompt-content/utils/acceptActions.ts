import { deleteCampaignQuery, updateCampaignQuery } from "@/app/queries";
import { Campaign, PromptActionType } from "@/app/types";
import { notifyError, notifySuccess } from "@/app/utils/notifications";
import { Dispatch, SetStateAction } from "react";

export const executePrompt = async (
  type: PromptActionType,
  data: { id: string; payload?: Campaign },
  disablePrompt: Dispatch<SetStateAction<boolean>>,
  openPrompt: Dispatch<SetStateAction<boolean>>,
  updateCampaign: (campaign: Campaign) => void,
  deleteCampaign: (campaignId: string) => void
) => {
  disablePrompt(true);
  switch (type) {
    case PromptActionType.DELETE:
      const resp = await deleteCampaignQuery(data.id);
      if (!("error" in resp)) {
        notifySuccess();
        deleteCampaign(data.id);
      } else notifyError(resp.error);
      break;
    case PromptActionType.UPDATE:
      if (data.payload) {
        const resp = await updateCampaignQuery(data.id, data.payload);
        if (!("error" in resp)) {
          notifySuccess();
          updateCampaign(resp);
        } else notifyError(resp.error);
      }
      break;
    default:
      notifyError("Invalid action type!");
      break;
  }
  disablePrompt(false);
  openPrompt(false);
};
