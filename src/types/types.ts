export type AdsType = {
  name: string;
  quantity: number;
  id: string;
};

export type CampaignsInfo = {
  name: string;
  description: string;
};

export type SubCampaign = {
  name: string;
  status: boolean;
  ads: AdsType[];
};

export type AdsTableHeader = {
  id: string;
  label?: string;
  type?: string;
  align?: "right" | "left" | "center" | "inherit" | "justify" | undefined;
};
