import React from "react";
import { Container, Box, Tab, CssBaseline } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import Breadcrumb from "../components/Breadcrumb";

import EODComponent from "../components/EOD";
import Invoices from "../components/Invoices";
import { TabContext, TabList } from "@mui/lab";

const InvoicesPage: React.FC = () => {
  const [tab, setTab] = React.useState("1");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <Container maxWidth={false} disableGutters>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Breadcrumb
          title="Invoice Management"
          paths={[
            { name: "Dashboard", link: "/dashboard" },
            { name: "Invoices" },
          ]}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Invoices" value="1" />
                <Tab label="EOD" value="2" />
                <Tab label="Item Three" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ padding: 0 }}>
              <Invoices />
            </TabPanel>
            <TabPanel value="2" sx={{ padding: 0 }}>
              <EODComponent />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Container>
  );
};

export default InvoicesPage;
