export type Campaign = {
  id: string;
  name: string;
  status: StatusEnum;
  created_at: string;
};

export type PromptType = {
  prompt: string;
  data: { id: string; payload?: Campaign };
  type: PromptActionType;
};

export type CampaignsQueryResponse = {
  data: Campaign[];
  pages: number;
  records: number;
  limit: number;
};

export type ErrorQueryResponse = {
  error: string;
};

export enum StatusEnum {
  ACTIVE = "active",
  PAUSED = "paused",
}

export enum PromptActionType {
  UPDATE = "update",
  DELETE = "delete",
}
