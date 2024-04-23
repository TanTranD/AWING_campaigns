import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Checkbox,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import "./index.css";
import { initialSubCampaigns } from "../../constants/constants";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AdsTable from "./components/adsTable";
import { AdsType } from "../../types/types";

interface IAdsSubCampaignsProps {
  onSubmit: any;
}

function SubCampaigns({ onSubmit }: IAdsSubCampaignsProps) {
  const [subCampaigns, setSubCampaigns] = React.useState(initialSubCampaigns);
  const [subCampaignSelected, setSubCampaignSelected] = React.useState(0);

  const addSubCampaign = () => {
    setSubCampaigns([
      ...subCampaigns,
      {
        name: `Chiến dịch con ${subCampaigns.length + 1}`,
        status: true,
        ads: [
          {
            name: "Quảng cáo 1",
            quantity: 0,
          },
        ],
      },
    ]);
    setSubCampaignSelected(subCampaigns.length);
  };

  const calculateQuantitySubCampaign = (subCampaign: any) => {
    return subCampaign.ads.reduce((totalQuantity: number, item: AdsType) => {
      return totalQuantity + item.quantity;
    }, 0);
  };

  const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedSubCampaigns = [...subCampaigns];
    updatedSubCampaigns[subCampaignSelected].status = event.target.checked;

    setSubCampaigns([...updatedSubCampaigns]);
  };

  const handleChangeSubCampaignName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedSubCampaigns = [...subCampaigns];
    updatedSubCampaigns[subCampaignSelected].name = event.target.value;

    setSubCampaigns([...updatedSubCampaigns]);
  };
  console.log(subCampaigns[subCampaignSelected].name);
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
            {subCampaigns.map((subCampaign, index) => (
              <div
                key={index}
                onClick={() => {
                  setSubCampaignSelected(index);
                }}
                className="1"
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
                  <Typography variant="h6" sx={{ padding: "8px 8px 4px" }}>
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
                onChange={handleChangeSubCampaignName}
              />
            </div>
            <div className="subCampaign-info-status">
              <Checkbox
                onChange={handleChangeStatus}
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
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default SubCampaigns;
