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
} from "@mui/material";
import useLoyaltyProgramDetails from "../hooks/useLoyaltyProgramDetails";
import QrCodeScanner from "./QrCodeScanner";

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
      {program && (
        <div>
          <Typography variant="h4">{program.name}</Typography>
          <Typography variant="body1">{program.description}</Typography>
          <Typography variant="body1">Type: {program.type}</Typography>

          <Typography variant="h6" style={{ marginTop: "20px" }}>
            Subscribed Users
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell>QR Code</TableCell>
                  <TableCell>Usage Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subscriptions.map((subscription) => (
                  <TableRow key={subscription._id}>
                    {/* <TableCell>{subscription.userId}</TableCell> */}
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
