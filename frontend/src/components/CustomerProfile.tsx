// src/components/CustomerProfile.tsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Users } from "../types";

interface CustomerProfileProps {
  user: Users;
}

const CustomerProfile: React.FC<CustomerProfileProps> = ({ user }) => {
  return (
    <Card sx={{ padding: 2, borderRadius: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Avatar
              src="/static/images/avatar/1.jpg"
              sx={{ width: 56, height: 56 }}
            />
            <Box ml={2}>
              <Typography variant="h5" component="div">
                {user.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Fitness Enthusiast
              </Typography>
            </Box>
          </Box>
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        </Box>
        <Box mt={2}>
          <Typography variant="h6" component="div">
            Cashback Balance: $42.47
          </Typography>
          <Box mt={1} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary">
              Redeem In-Store
            </Button>
            <Button variant="contained" color="secondary">
              Redeem Online
            </Button>
          </Box>
        </Box>
        <Box mt={2}>
          <Typography variant="body2">
            Last Transaction: $3.50 Cashback Added on 07 June 2024 at Elite
            Supps Belmont
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CustomerProfile;
