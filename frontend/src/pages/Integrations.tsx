import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import XeroLogo from "../assets/Xero_software_logo.png";
import MyobLogo from "../assets/myob-logo.png";
import SageLogo from "../assets/sage.png";

export default function Integrations() {
  const handleXeroConnect = async () => {
    const token = localStorage.getItem("token"); // Get the JWT token from local storage

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/xero/connect", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const consentUrl = data.consentUrl;
        window.location.href = consentUrl; // Redirect to the consent URL
      } else {
        console.error("Failed to connect to Xero:", response.statusText);
      }
    } catch (error) {
      console.error("Error connecting to Xero:", error);
    }
  };

  return (
    <Container maxWidth={false} disableGutters>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <img
            style={{ maxWidth: 50, cursor: "pointer" }}
            alt="xero"
            src={XeroLogo}
            onClick={handleXeroConnect}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <img
            style={{ maxWidth: 50, cursor: "pointer" }}
            alt="myob"
            src={MyobLogo}
            onClick={handleXeroConnect}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <img
            style={{ maxWidth: 50, cursor: "pointer" }}
            alt="sage"
            src={SageLogo}
            onClick={handleXeroConnect}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
