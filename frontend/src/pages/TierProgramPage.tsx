import React from "react";
import TierBasedProgramForm from "../components/TierBasedProgramForm";
import { useNavigate } from "react-router-dom";
import { LoyaltyProgram } from "../types";

const TierProgramPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/dashboard/loyaltyPrograms");
  };

  return (
    <TierBasedProgramForm open={true} onClose={handleClose} program={null} />
  );
};

export default TierProgramPage;
