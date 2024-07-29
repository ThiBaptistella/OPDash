import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Snackbar,
  Box,
  Grid,
  CssBaseline,
} from "@mui/material";
import useLoyaltyProgramDetails from "../hooks/useLoyaltyProgramDetails";
import QrCodeScanner from "./QrCodeScanner";
import theme from "../utils/theme";
import Breadcrumb from "./Breadcrumb";

const LoyaltyProgramDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [rewardMessage, setRewardMessage] = useState<string | null>(null);

  if (!id) {
    return <Typography color="error">Invalid loyalty program ID.</Typography>;
  }

  const { program, subscriptions, loading, error, trackUsage } =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLoyaltyProgramDetails(id);

  const handleScan = async (qrCode: string) => {
    try {
      const response = await trackUsage(qrCode);
      if (response.rewardEarned) {
        setRewardMessage("Reward Earned!");
      }
    } catch (error) {
      console.error("Failed to track usage:", error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div>
      <CssBaseline />
      <Breadcrumb
        title="Subscribed Users"
        paths={[
          { name: "Dashboard", link: "/dashboard/loyaltyPrograms" },
          { name: "Loyalty Programs", link: "/dashboard/loyaltyPrograms" },
          { name: "Subscribed Users" },
        ]}
      />

      {program && (
        <div>
          <Box
            sx={{
              padding: 2,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              mb: 2,
              mt: 3,
            }}
          >
            <Typography variant="h4">{program.name}</Typography>
            <Typography variant="body1">{program.description}</Typography>
            <Typography variant="body1">Type: {program.type}</Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 900 }}>User ID</TableCell>
                  <TableCell sx={{ fontWeight: 900 }}>QR Code</TableCell>
                  <TableCell sx={{ fontWeight: 900 }}>Usage Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subscriptions.map((subscription) => (
                  <TableRow key={subscription._id}>
                    <TableCell>
                      {subscription.userId &&
                      typeof subscription.userId === "object"
                        ? subscription.userId.email
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <img
                        src={subscription.qrCodeImage}
                        alt="QR Code"
                        width={50}
                        height={50}
                      />
                    </TableCell>
                    <TableCell>{subscription.usageCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" style={{ marginTop: "20px" }}>
            Scan User QR Code
          </Typography>
          <QrCodeScanner onScan={handleScan} />

          <Snackbar
            open={!!rewardMessage}
            autoHideDuration={6000}
            onClose={() => setRewardMessage(null)}
            message={rewardMessage}
          />
        </div>
      )}
    </div>
  );
};

export default LoyaltyProgramDetails;
