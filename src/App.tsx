import "./App.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import { ListTabs } from "./constants/constants";
import Infomation from "./components/infomation";
import SubCampaigns from "./components/subCampaigns";
import { Button, Grid, Paper } from "@mui/material";

function App() {
  const [tab, setTab] = useState(ListTabs.INFO);

  const handleTabChange = (event: React.SyntheticEvent, newTab: string) => {
    setTab(newTab);
  };

  const handleSubmit = () => {
    // Thực hiện xử lý submit ở đây với dữ liệu subCampaigns
    console.log("Submitted");
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
                <Infomation onSubmit={handleSubmit} />
              </div>
            </TabPanel>
            <TabPanel value={ListTabs.SUB_CAMPAIGNS}>
              <div>
                <SubCampaigns onSubmit={handleSubmit} />
              </div>
            </TabPanel>
          </TabContext>
        </Paper>
      </Grid>
    </Box>
  );
}

export default App;
