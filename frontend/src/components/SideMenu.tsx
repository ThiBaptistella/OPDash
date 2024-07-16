import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  IconButton,
  Divider,
  useTheme,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import logo from "../assets/Elite_Supplements_Logo_White.png";
import smallLogo from "../assets/Elite Supplements_EliteIcon_White.png"; // Assuming you have a small logo in the assets folder

interface SideMenuProps {
  drawerWidth: number;
  toggleDrawer: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ drawerWidth, toggleDrawer }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          transition: "width 0.3s ease",
        },
      }}
    >
      <Toolbar
        sx={{
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <img
            src={drawerWidth === 240 ? logo : smallLogo}
            alt="Logo"
            style={{ height: 50, margin: "0 auto", cursor: "pointer" }}
            onClick={toggleDrawer}
          />
        </Box>
      </Toolbar>
      <Divider />
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/users">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/invoices">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Invoices" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/sales">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Sales" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/inventory">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Inventory" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/integrations">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Integrations" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/suppliers">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Suppliers" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/products">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/orders">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideMenu;
