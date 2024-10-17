import React from "react";
import PointsProgramForm from "../components/PointsProgramForm";
import { useNavigate } from "react-router-dom";
import { LoyaltyProgram } from "../types";

const PointsProgramPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/dashboard/loyaltyPrograms");
  };

  return <PointsProgramForm open={true} onClose={handleClose} program={null} />;
};

export default PointsProgramPage;
