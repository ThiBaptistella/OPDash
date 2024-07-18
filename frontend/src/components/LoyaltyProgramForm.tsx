import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import useLoyaltyPrograms from "../hooks/useLoyaltyPrograms";
import { LoyaltyProgram } from "../types";

interface LoyaltyProgramFormProps {
  open: boolean;
  onClose: () => void;
  program: LoyaltyProgram | null;
}

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

  const handleSave = () => {
    if (program) {
      updateLoyaltyProgram(program._id, formState);
    } else {
      createLoyaltyProgram(formState);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {program ? "Edit Loyalty Program" : "Create Loyalty Program"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Program Name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={formState.description}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Points Per Purchase"
              name="pointsPerPurchase"
              type="number"
              value={formState.pointsPerPurchase}
              onChange={handleChange}
              fullWidth
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
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Eligibility Criteria"
              name="eligibilityCriteria"
              value={formState.eligibilityCriteria}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Earning Rules"
              name="earningRules"
              value={formState.earningRules}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Redemption Rules"
              name="redemptionRules"
              value={formState.redemptionRules}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Visibility"
              name="visibility"
              value={formState.visibility}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Display Locations"
              name="displayLocations"
              value={formState.displayLocations}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoyaltyProgramForm;
