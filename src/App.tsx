import "./App.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import { ListTabs, initialSubCampaigns } from "./constants/constants";
import Infomation from "./components/infomation/infomation";
import SubCampaigns from "./components/subCampaigns/subCampaigns";
import { Button, Grid, Paper } from "@mui/material";
import { CampaignsInfo, SubCampaign } from "./types/types";

function App() {
  const [tab, setTab] = useState<string>(ListTabs.INFO);
  const [campaignInfo, setCampaignInfo] = useState<CampaignsInfo>();
  const [subCampaigns, setSubCampaigns] =
    useState<SubCampaign[]>(initialSubCampaigns);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const handleTabChange = (event: React.SyntheticEvent, newTab: string) => {
    setTab(newTab);
  };

  const handleSubmit = () => {
    if (
      !campaignInfo?.name ||
      subCampaigns.some(
        (subCampaign) =>
          !subCampaign.name ||
          subCampaign.ads.some((item) => !item.name || !item.quantity)
      )
    ) {
      alert("Vui lòng điền đúng và đầy đủ thông tin");
    } else {
      alert(`Thêm thành công chiến dịch
      {"campaign": ${JSON.stringify(
        campaignInfo
      )}, "subCampaigns": ${JSON.stringify(subCampaigns)} }
      `);
    }
    setIsSubmit(true);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <div className="wrapper-header">
        <header className="header">Campaigns</header>
        <div className="submit-btn">
          <Button variant="contained" onClick={() => handleSubmit()}>
            Submit
          </Button>
        </div>
      </div>
      <Grid className="pd-24">
        <Paper>
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleTabChange}>
                <Tab label="Thông tin" value={ListTabs.INFO} />
                <Tab label="Chiến dịch con" value={ListTabs.SUB_CAMPAIGNS} />
              </TabList>
            </Box>
            <TabPanel value={ListTabs.INFO}>
              <div className="infomation">
                <Infomation
                  campaignInfo={campaignInfo as CampaignsInfo}
                  setCampaignInfo={setCampaignInfo}
                  isSubmit={isSubmit}
                />
              </div>
            </TabPanel>
            <TabPanel value={ListTabs.SUB_CAMPAIGNS}>
              <div>
                <SubCampaigns
                  subCampaigns={subCampaigns}
                  setSubCampaigns={setSubCampaigns}
                  isSubmit={isSubmit}
                />
              </div>
            </TabPanel>
          </TabContext>
        </Paper>
      </Grid>
    </Box>
  );
}

export default App;
