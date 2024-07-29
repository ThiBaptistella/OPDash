import React, { useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import Breadcrumb from "../components/Breadcrumb";
import LoyaltyProgramList from "../components/LoyaltyProgramList";

const LoyaltyProgram: React.FC = () => {
  return (
    <Container maxWidth={false} disableGutters>
      <CssBaseline />
      <Breadcrumb
        title="Loyalty Programs"
        paths={[
          { name: "Dashboard", link: "/dashboard/loyaltyPrograms" },
          { name: "LoyaltyPrograms" },
        ]}
      />

      <LoyaltyProgramList />
    </Container>
  );
};

export default LoyaltyProgram;
