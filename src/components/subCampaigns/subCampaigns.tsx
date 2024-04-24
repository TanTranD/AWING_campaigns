import React from "react";
import "./subCampaigns.css";
import AddIcon from "@mui/icons-material/Add";
import {
  Checkbox,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AdsTable from "./components/adsTable/adsTable";
import { AdsType, SubCampaign } from "../../types/types";
import { SubCampaignField } from "../../constants/constants";

interface IAdsSubCampaignsProps {
  subCampaigns: SubCampaign[];
  setSubCampaigns: (data: SubCampaign[]) => void;
  isSubmit: boolean;
}

const SubCampaigns: React.FC<IAdsSubCampaignsProps> = ({
  subCampaigns,
  setSubCampaigns,
  isSubmit,
}: Readonly<IAdsSubCampaignsProps>) => {
  const [subCampaignSelected, setSubCampaignSelected] = React.useState(0);

  const addSubCampaign = () => {
    const updatedSubCampaigns = [...subCampaigns];

    updatedSubCampaigns.push({
      name: `Chiến dịch con ${subCampaigns.length + 1}`,
      status: true,
      ads: [
        {
          name: "Quảng cáo 1",
          quantity: 0,
          id: `sub${subCampaignSelected}_0`,
        },
      ],
    });

    setSubCampaigns(updatedSubCampaigns);
    setSubCampaignSelected(subCampaigns.length);
  };

  const calculateQuantitySubCampaign = (subCampaign: SubCampaign) => {
    return subCampaign.ads.reduce((totalQuantity: number, item: AdsType) => {
      return totalQuantity + item.quantity;
    }, 0);
  };

  const handleChangeSubCampaign = (field: string, value: string | boolean) => {
    const updatedSubCampaigns = [...subCampaigns];

    if (field === SubCampaignField.NAME) {
      updatedSubCampaigns[subCampaignSelected].name = value as string;
    } else {
      updatedSubCampaigns[subCampaignSelected].status = value as boolean;
    }

    setSubCampaigns([...updatedSubCampaigns]);
  };

  const handleCheckSubCampaignsInvalid = (subCampaign: SubCampaign) => {
    return (
      isSubmit &&
      (!subCampaign.name ||
        subCampaign.ads.some((item) => !item.name || !item.quantity))
    );
  };

  return (
    <div className="wrapper">
      <Grid container>
        <Grid item xs={12}>
          <div className="subCampaigns-list">
            <div>
              <IconButton
                color="secondary"
                className="add-btn"
                onClick={addSubCampaign}
              >
                <AddIcon />
              </IconButton>
            </div>
            {subCampaigns.map((subCampaign: SubCampaign, index: number) => (
              <div
                key={index}
                onClick={() => {
                  setSubCampaignSelected(index);
                }}
              >
                <Paper
                  sx={{
                    width: "210px",
                    height: "120px",
                    border:
                      subCampaignSelected === index
                        ? "2px solid rgb(33, 150, 243)"
                        : "2px solid rgb(250, 250, 250)",
                    marginLeft: "16px",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ padding: "8px 8px 4px" }}
                    color={
                      handleCheckSubCampaignsInvalid(subCampaign) ? "red" : ""
                    }
                  >
                    {subCampaign.name}
                    <CheckCircleIcon
                      sx={{ fontSize: "14px", paddingLeft: "8px" }}
                      color={subCampaign.status ? "success" : "action"}
                    />
                  </Typography>
                  <Typography variant="h5">
                    {calculateQuantitySubCampaign(subCampaign)}
                  </Typography>
                </Paper>
              </div>
            ))}
          </div>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: "16px" }}>
          <div className="subCampaign-info">
            <div className="subCampaign-info-name">
              <TextField
                fullWidth
                required
                label="Tên chiến dịch con"
                variant="standard"
                value={subCampaigns[subCampaignSelected].name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeSubCampaign(SubCampaignField.NAME, e.target.value)
                }
                error={isSubmit && !subCampaigns[subCampaignSelected].name}
                helperText={
                  isSubmit &&
                  !subCampaigns[subCampaignSelected].name &&
                  "Dữ liệu không hợp lệ"
                }
              />
            </div>
            <div className="subCampaign-info-status">
              <Checkbox
                onChange={(e) =>
                  handleChangeSubCampaign(
                    SubCampaignField.STATUS,
                    e.target.checked
                  )
                }
                color="primary"
                checked={subCampaigns[subCampaignSelected].status}
              />
              Đang hoạt động
            </div>
          </div>
          <AdsTable
            subCampaignSelected={subCampaignSelected}
            setSubCampaigns={setSubCampaigns}
            subCampaigns={subCampaigns}
            isSubmit={isSubmit}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default SubCampaigns;
