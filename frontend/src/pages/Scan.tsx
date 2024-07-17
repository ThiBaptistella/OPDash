import React from "react";
import { Container, Typography, Box, CssBaseline } from "@mui/material";

import NFCReader from "../components/NFCReader";
import BarcodeReader from "../components/BarcodeReader";

const Scan: React.FC = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Scan
        </Typography>

        <NFCReader />
        {/* <BarcodeReader /> */}
      </Box>
    </Container>
  );
};

export default Scan;
