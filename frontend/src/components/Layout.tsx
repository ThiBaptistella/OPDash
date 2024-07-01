import React, { useState } from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideMenu from "./SideMenu";

const expandedDrawerWidth = 240;
const collapsedDrawerWidth = 72;

const Layout: React.FC = () => {
  const [drawerWidth, setDrawerWidth] = useState(expandedDrawerWidth);

  const toggleDrawer = () => {
    setDrawerWidth((prevWidth) =>
      prevWidth === expandedDrawerWidth
        ? collapsedDrawerWidth
        : expandedDrawerWidth
    );
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "auto" }}>
      <CssBaseline />
      <Header drawerWidth={drawerWidth} toggleDrawer={toggleDrawer} />
      <SideMenu drawerWidth={drawerWidth} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 2,
          transition: "margin-left 0.3s ease",
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
