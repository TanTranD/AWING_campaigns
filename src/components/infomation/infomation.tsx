import React from "react";
import { TextField } from "@mui/material";
import { CampaignsInfo } from "../../types/types";

interface IInfomationProps {
  campaignInfo: CampaignsInfo;
  setCampaignInfo: (data: CampaignsInfo) => void;
  isSubmit: boolean;
}

const Infomation: React.FC<IInfomationProps> = ({
  campaignInfo,
  setCampaignInfo,
  isSubmit,
}: IInfomationProps) => {
  return (
    <>
      <TextField
        sx={{ margin: "8px" }}
        fullWidth
        required
        label="Tên chiến dịch"
        variant="standard"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setCampaignInfo({ ...campaignInfo, name: e.target.value });
        }}
        error={isSubmit && !campaignInfo?.name}
        helperText={isSubmit && !campaignInfo?.name && "Dữ liệu không hợp lệ"}
        value={campaignInfo?.name}
      />
      <TextField
        sx={{ margin: "8px" }}
        fullWidth
        label="Mô tả"
        variant="standard"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setCampaignInfo({ ...campaignInfo, description: e.target.value });
        }}
        value={campaignInfo?.description}
      />
    </>
  );
};

export default Infomation;
