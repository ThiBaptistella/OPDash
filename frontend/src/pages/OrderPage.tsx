// src/pages/OrderPage.tsx
import React from "react";
import { Container, Box, Tab, CssBaseline } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import Breadcrumb from "../components/Breadcrumb";
import OrderList from "../components/OrderList";
import { TabContext, TabList } from "@mui/lab";

const OrderPage: React.FC = () => {
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
          title="Order Management"
          paths={[
            { name: "Dashboard", link: "/dashboard" },
            { name: "Orders" },
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
                aria-label="Order Management Tabs"
              >
                <Tab label="Orders" value="1" />
                <Tab label="Another Tab" value="2" />
                <Tab label="Yet Another Tab" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ padding: 0 }}>
              <OrderList />
            </TabPanel>
            <TabPanel value="2" sx={{ padding: 0 }}>
              {/* Another Component */}
            </TabPanel>
            <TabPanel value="3" sx={{ padding: 0 }}>
              {/* Another Component */}
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Container>
  );
};

export default OrderPage;
