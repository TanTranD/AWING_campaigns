import { AdsTableHeader } from "../types/types";

export const ListTabs = {
  INFO: "infomation",
  SUB_CAMPAIGNS: "subCampaigns",
};

export const CampaignInfoField = {
  NAME: "name",
  DESCRIPTION: "description",
};

export const SubCampaignField = {
  NAME: "name",
  STATUS: "status",
};

export const AdsField = {
  NAME: "name",
  QUANTITY: "quantity",
};

export const initialAds = [
  {
    name: "Quảng cáo 1",
    quantity: 0,
    id: "sub0_0",
  },
];

export const initialSubCampaigns = [
  {
    name: "Chiến dịch con 1",
    status: true,
    ads: [...initialAds],
  },
];

export const AdsTableHeaderCells: AdsTableHeader[] = [
  {
    id: "ads_name",
    label: "Tên quảng cáo*",
  },
  {
    id: "ads_quantity",
    label: "Số lượng*",
  },
  {
    id: "tools",
    type: "button",
    align: "right",
  },
];
