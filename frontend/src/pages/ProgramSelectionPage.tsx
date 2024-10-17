import React from "react";
import { Box, Grid, Typography, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProgramSelectionPage: React.FC = () => {
  const navigate = useNavigate();

  const handleProgramSelection = (programType: string) => {
    if (programType === "Points Program") {
      navigate("/dashboard/select-program/points");
    } else if (programType === "Tier Based Program") {
      navigate("/dashboard/select-program/tier");
    }
    // Add more conditions if you have more program types
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Select Loyalty Program Type
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{ padding: 3, textAlign: "center", cursor: "pointer" }}
          >
            <Button
              onClick={() => handleProgramSelection("Points Program")}
              sx={{ width: "100%" }}
            >
              <Box sx={{ mb: 2 }}>
                {/* You can replace this with an icon */}
                <img
                  src="/icons/points-program-icon.png"
                  alt="Points Program"
                />
              </Box>
              <Typography variant="h6">Points Program</Typography>
              <Typography variant="body2" color="textSecondary">
                Description of the Points Program goes here.
              </Typography>
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{ padding: 3, textAlign: "center", cursor: "pointer" }}
          >
            <Button
              onClick={() => handleProgramSelection("Tier Based Program")}
              sx={{ width: "100%" }}
            >
              <Box sx={{ mb: 2 }}>
                {/* You can replace this with an icon */}
                <img
                  src="/icons/tier-based-program-icon.png"
                  alt="Tier Based Program"
                />
              </Box>
              <Typography variant="h6">Tier Based Program</Typography>
              <Typography variant="body2" color="textSecondary">
                Description of the Tier Based Program goes here.
              </Typography>
            </Button>
          </Paper>
        </Grid>
        {/* Add more program types as needed */}
      </Grid>
    </Box>
  );
};

export default ProgramSelectionPage;
