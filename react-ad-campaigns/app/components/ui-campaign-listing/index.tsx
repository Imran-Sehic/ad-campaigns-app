"use client";
import useCampaignStore from "@/app/store";
import { Campaign, PromptActionType, PromptType } from "@/app/types";
import { UIButton } from "@/app/ui-kit/ui-button";
import { UIModal } from "@/app/ui-kit/ui-modal";
import { UIFormContent } from "@/app/ui-kit/ui-modal/ui-form-content";
import { UIPromptContent } from "@/app/ui-kit/ui-modal/ui-prompt-content";
import { executePrompt } from "@/app/ui-kit/ui-modal/ui-prompt-content/utils/acceptActions";
import { UIPagination } from "@/app/ui-kit/ui-pagination";
import UISpinner from "@/app/ui-kit/ui-spinner";
import { notifyError, notifySuccess } from "@/app/utils/notifications";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UICampaign } from "../ui-campaign";
import { NoCampaigns } from "./components/noCampaigns";
import styles from "./ui-campaign-listing.module.css";

interface UICampaignListingInterface {
  listing: Campaign[];
  page: number;
  pages: number;
  records: number;
  limit: number;
}

export const UICampaignListing: React.FC<UICampaignListingInterface> = ({
  listing,
  page,
  pages,
  records,
  limit,
}) => {
  const { campaigns, setCampaigns, deleteCampaign, updateCampaign } =
    useCampaignStore();
  const [activePage, setActivePage] = useState<number>(page);
  const [totalPages, setTotalPages] = useState<number>(pages);
  const [totalRecords, setTotalRecords] = useState<number>(records);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState<boolean>(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const [promptDisabed, setPromptDisabled] = useState<boolean>(false);
  const [modalPrompt, setModalPrompt] = useState<PromptType>({
    prompt: "",
    data: { id: "" },
    type: PromptActionType.DELETE,
  });

  useEffect(() => {
    setCampaigns(listing);
    setIsLoading(false);
  }, [listing, setCampaigns]);

  return (
    <>
      <div className={styles.listingWrapper}>
        <p className={styles.info}>
          <span>
            showing {campaigns.length} from {totalRecords} results: page{" "}
            {activePage} - {pages}
          </span>
          <UIButton
            variant="small"
            content="New Campaign"
            onClick={() => setIsFormModalOpen(true)}
          ></UIButton>
        </p>
        {!isLoading && campaigns.length > 0 && (
          <div className={styles.listing}>
            <div className={styles.listingHeader}>
              <div>N.</div>
              <div>Name</div>
              <div>Status</div>
              <div>Created</div>
            </div>
            {campaigns.map((campaign, index) => (
              <UICampaign
                key={campaign.name}
                campaign={campaign}
                index={index + 1}
                setIsModalOpen={setIsPromptModalOpen}
                setModalPrompt={setModalPrompt}
              />
            ))}
          </div>
        )}
        {!isLoading && campaigns.length == 0 && <NoCampaigns />}
        {isLoading && (
          <div className={styles.spinnerWrapper}>
            <UISpinner />
          </div>
        )}
        {pages > 1 && (
          <UIPagination
            activePage={activePage}
            pages={totalPages}
            setActivePage={setActivePage}
          />
        )}
      </div>
      {isPromptModalOpen && (
        <UIModal onClose={() => setIsPromptModalOpen(false)}>
          <UIPromptContent
            prompt={modalPrompt.prompt}
            accept={() =>
              executePrompt(
                modalPrompt.type,
                modalPrompt.data,
                setPromptDisabled,
                setIsPromptModalOpen,
                updateCampaign,
                deleteCampaign
              )
            }
            decline={() => {
              setIsPromptModalOpen(false);
            }}
            promptDisabled={promptDisabed}
          />
        </UIModal>
      )}
      {isFormModalOpen && (
        <UIModal onClose={() => setIsFormModalOpen(false)}>
          <UIFormContent
            setOpen={setIsFormModalOpen}
            setTotalPages={setTotalPages}
            onSuccess={() => notifySuccess()}
            onError={() => notifyError()}
            limit={limit}
            totalRecords={totalRecords}
            setTotalRecords={setTotalRecords}
            page={activePage}
          />
        </UIModal>
      )}
      <ToastContainer />
    </>
  );
};
