// src/components/LoyaltyProgramDetails.tsx
import React from "react";
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
} from "@mui/material";
import useLoyaltyProgramDetails from "../hooks/useLoyaltyProgramDetails";
import QrCodeScanner from "./QrCodeScanner";

const LoyaltyProgramDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Ensure id is defined
  if (!id) {
    return <Typography color="error">Invalid loyalty program ID.</Typography>;
  }

  const { program, subscriptions, loading, error, trackUsage } =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLoyaltyProgramDetails(id);

  const handleScan = async (qrCode: string) => {
    try {
      await trackUsage(qrCode);
      // Optionally, you can add more logic here if needed
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
                    <TableCell>{subscription.userId}</TableCell>
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
        </div>
      )}
    </div>
  );
};

export default LoyaltyProgramDetails;
