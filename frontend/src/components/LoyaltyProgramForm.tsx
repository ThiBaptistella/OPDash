import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import useLoyaltyPrograms from "../hooks/useLoyaltyPrograms";
import { LoyaltyProgram } from "../types";

interface LoyaltyProgramFormProps {
  open: boolean;
  onClose: () => void;
  program: LoyaltyProgram | null;
}

const steps = ["Basic Info", "Points Setup", "Rules Setup", "Review & Publish"];

const LoyaltyProgramForm: React.FC<LoyaltyProgramFormProps> = ({
  open,
  onClose,
  program,
}) => {
  const { createLoyaltyProgram, updateLoyaltyProgram } = useLoyaltyPrograms();
  const [formState, setFormState] = useState<Omit<LoyaltyProgram, "_id">>({
    name: "",
    description: "",
    type: "Points Program",
    pointsPerPurchase: 0,
    pointsRedemptionRatio: 0,
    rewardOptions: [],
    eligibilityCriteria: "",
    earningRules: "",
    redemptionRules: "",
    visibility: "Public",
    displayLocations: [],
  });
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (program) {
      setFormState(program);
    } else {
      setFormState({
        name: "",
        description: "",
        type: "Points Program",
        pointsPerPurchase: 0,
        pointsRedemptionRatio: 0,
        rewardOptions: [],
        eligibilityCriteria: "",
        earningRules: "",
        redemptionRules: "",
        visibility: "Public",
        displayLocations: [],
      });
    }
  }, [program]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSave = () => {
    if (program) {
      updateLoyaltyProgram(program._id, formState);
    } else {
      createLoyaltyProgram(formState);
    }
    onClose();
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Program Name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                fullWidth
                helperText="Enter the name of the loyalty program"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={formState.description}
                onChange={handleChange}
                fullWidth
                helperText="Provide a brief description of the program"
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Points Per Purchase"
                name="pointsPerPurchase"
                type="number"
                value={formState.pointsPerPurchase}
                onChange={handleChange}
                fullWidth
                helperText="Number of points awarded for each purchase"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Points Redemption Ratio"
                name="pointsRedemptionRatio"
                type="number"
                value={formState.pointsRedemptionRatio}
                onChange={handleChange}
                fullWidth
                helperText="Number of points needed to redeem a reward"
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Eligibility Criteria"
                name="eligibilityCriteria"
                value={formState.eligibilityCriteria}
                onChange={handleChange}
                fullWidth
                helperText="Define the criteria to be eligible for the program"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Earning Rules"
                name="earningRules"
                value={formState.earningRules}
                onChange={handleChange}
                fullWidth
                helperText="Specify the rules for earning points"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Redemption Rules"
                name="redemptionRules"
                value={formState.redemptionRules}
                onChange={handleChange}
                fullWidth
                helperText="Specify the rules for redeeming points"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Visibility"
                name="visibility"
                value={formState.visibility}
                onChange={handleChange}
                fullWidth
                helperText="Set the visibility of the program (Public/Private)"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Display Locations"
                name="displayLocations"
                value={formState.displayLocations}
                onChange={handleChange}
                fullWidth
                helperText="Enter locations where the program will be displayed"
              />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <div>
            <Typography variant="h6">Review & Publish</Typography>
            <p>
              <strong>Program Name:</strong> {formState.name}
            </p>
            <p>
              <strong>Description:</strong> {formState.description}
            </p>
            <p>
              <strong>Points Per Purchase:</strong>{" "}
              {formState.pointsPerPurchase}
            </p>
            <p>
              <strong>Points Redemption Ratio:</strong>{" "}
              {formState.pointsRedemptionRatio}
            </p>
            <p>
              <strong>Eligibility Criteria:</strong>{" "}
              {formState.eligibilityCriteria}
            </p>
            <p>
              <strong>Earning Rules:</strong> {formState.earningRules}
            </p>
            <p>
              <strong>Redemption Rules:</strong> {formState.redemptionRules}
            </p>
            <p>
              <strong>Visibility:</strong> {formState.visibility}
            </p>
            <p>
              <strong>Display Locations:</strong> {formState.displayLocations}
            </p>
          </div>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {program ? "Edit Loyalty Program" : "Create Loyalty Program"}
      </DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div style={{ marginTop: "20px" }}>{renderStepContent(activeStep)}</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {activeStep !== 0 && <Button onClick={handleBack}>Back</Button>}
        {activeStep === steps.length - 1 ? (
          <Button onClick={handleSave} color="primary">
            Publish
          </Button>
        ) : (
          <Button onClick={handleNext} color="primary">
            Next
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default LoyaltyProgramForm;
