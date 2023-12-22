import { create } from "zustand";
import { Campaign } from "../types";

interface CampaignStore {
  campaigns: Campaign[];
  setCampaigns: (campaigns: Campaign[]) => void;
  addCampaign: (campaign: Campaign) => void;
  updateCampaign: (campaign: Campaign) => void;
  deleteCampaign: (campaignId: string) => void;
}

const useCampaignStore = create<CampaignStore>((set) => ({
  campaigns: [] as Campaign[],

  setCampaigns: (campaigns) => set({ campaigns }),

  addCampaign: (campaign) =>
    set((state) => ({ campaigns: [...state.campaigns, campaign] })),

  updateCampaign: (campaign) =>
    set((state) => ({
      campaigns: state.campaigns.map((c) =>
        c.id === campaign.id ? { ...c, ...campaign } : c
      ),
    })),

  deleteCampaign: (campaignId) =>
    set((state) => ({
      campaigns: state.campaigns.filter((c) => c.id !== campaignId),
    })),
}));

export default useCampaignStore;
