"use client";
import { deleteCampaignQuery, updateCampaignQuery } from "@/app/queries";
import useCampaignStore from "@/app/store";
import { Campaign, PromptType, ErrorQueryResponse } from "@/app/types";
import { UIButton } from "@/app/ui-kit/ui-button";
import { UIModal } from "@/app/ui-kit/ui-modal";
import { UIFormContent } from "@/app/ui-kit/ui-modal/ui-form-content";
import { UIPromptContent } from "@/app/ui-kit/ui-modal/ui-prompt-content";
import { UIPagination } from "@/app/ui-kit/ui-pagination";
import UISpinner from "@/app/ui-kit/ui-spinner";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UICampaign } from "../ui-campaign";
import { NoCampaigns } from "./components/noCampaigns";
import styles from "./ui-campaign-listing.module.css";
import { notifyError, notifySuccess } from "@/app/utils/notifications";

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
    type: "delete",
  });

  useEffect(() => {
    setCampaigns(listing);
    setIsLoading(false);
  }, [listing, setCampaigns]);

  const executePrompt = async (
    type: "delete" | "update",
    data: { id: string; payload?: Campaign }
  ) => {
    setPromptDisabled(true);
    switch (type) {
      case "delete":
        const resp = await deleteCampaignQuery(data.id);
        if (!('error' in resp)) {
          notifySuccess();
          deleteCampaign(data.id);
        } else notifyError();
        setPromptDisabled(false);
        setIsPromptModalOpen(false);
      case "update":
        if (data.payload) {
          const resp = await updateCampaignQuery(data.id, data.payload);
          if (!('error' in resp)) {
            notifySuccess();
            updateCampaign(resp);
          } else notifyError();
          setPromptDisabled(false);
        }
        setIsPromptModalOpen(false);
    }
  };

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
          <>
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
          </>
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
            accept={() => executePrompt(modalPrompt.type, modalPrompt.data)}
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
