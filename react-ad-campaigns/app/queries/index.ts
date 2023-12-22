import { Campaign, CampaignsQueryResponse } from "../types";

export const getCampaignsQuery = async (
  page: number
): Promise<CampaignsQueryResponse> => {
  const data = await fetch(`http://localhost:8080/campaigns?page=${page}`, {
    headers: {
      cache: "no-store",
    },
    method: "GET",
  });

  const campaigns = (await data.json()) as CampaignsQueryResponse;

  return campaigns;
};

export const addCampaignQuery = async (
  campaign: Partial<Campaign>
): Promise<Campaign> => {
  const data = await fetch(`http://localhost:8080/campaigns`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(campaign),
  });

  const addedCampaign = (await data.json()) as Campaign;

  return addedCampaign;
};

export const updateCampaignQuery = async (
  id: string,
  campaign: Partial<Campaign>
): Promise<Campaign> => {
  const data = await fetch(`http://localhost:8080/campaigns/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(campaign),
  });

  const updatedCampaign = (await data.json()) as Campaign;

  return updatedCampaign;
};

export const deleteCampaignQuery = async (
  id: string
): Promise<{ message: string }> => {
  const data = await fetch(`http://localhost:8080/campaigns/${id}`, {
    method: "DELETE",
  });

  const campaigns = (await data.json()) as { message: string };

  return campaigns;
};
