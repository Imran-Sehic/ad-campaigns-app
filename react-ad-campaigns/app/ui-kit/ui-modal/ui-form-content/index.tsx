import { addCampaignQuery } from "@/app/queries";
import useCampaignStore from "@/app/store";
import { Campaign, StatusEnum } from "@/app/types";
import { UIButton } from "@/app/ui-kit/ui-button";
import { UIInput } from "@/app/ui-kit/ui-input";
import { Dispatch, SetStateAction, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./ui-form-content.module.css";

interface UIFormContentInterface {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setTotalPages: Dispatch<SetStateAction<number>>;
  totalRecords: number;
  setTotalRecords: Dispatch<SetStateAction<number>>;
  onSuccess: () => void;
  onError: () => void;
  limit: number;
  page: number;
}

export const UIFormContent: React.FC<UIFormContentInterface> = ({
  setOpen,
  setTotalPages,
  totalRecords,
  setTotalRecords,
  onSuccess,
  onError,
  limit,
  page,
}) => {
  const { addCampaign } = useCampaignStore();
  const [campaignName, setCampaignName] = useState<string>("");
  const [formDisabled, setFormDisabled] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const submit = async () => {
    const campaign: Partial<Campaign> = {
      id: uuidv4(),
      name: campaignName,
      status: StatusEnum.ACTIVE,
    };

    setFormDisabled(true);
    const data = await addCampaignQuery(campaign);
    if (!('error' in data)) {
      // we don't want to add to the state campaigns beyond page limit, instead we increase page number
      if (totalRecords % limit == 0)
        setTotalPages((totalPages) => totalPages + 1);
      if (totalRecords / limit < page) addCampaign(data);
      setTotalRecords((records) => records + 1);
      onSuccess();
    } else onError();
    setFormDisabled(false);
    setOpen(false);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (campaignName.length < 3) {
          setError("Campaign name must be at least 3 characters long!");
        } else {
          submit();
        }
      }}
      className={styles.form}
    >
      <UIInput
        label="Campaign Name"
        name="campaign"
        type="text"
        value={campaignName}
        placeholder="Enter campaign's name"
        onChange={setCampaignName}
        error={error}
      />
      <UIButton
        content="Submit"
        submit
        variant="small"
        disabled={formDisabled}
      />
    </form>
  );
};
