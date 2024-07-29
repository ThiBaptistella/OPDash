import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useLoyaltyPrograms from "../hooks/useLoyaltyPrograms";
import LoyaltyProgramForm from "./LoyaltyProgramForm";
import { LoyaltyProgram } from "../types/LoyaltyProgram";
import { useNavigate } from "react-router-dom";
import theme from "../utils/theme";

const LoyaltyProgramList: React.FC = () => {
  const { loyaltyPrograms, deleteLoyaltyProgram } = useLoyaltyPrograms();
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [selectedProgram, setSelectedProgram] =
    React.useState<LoyaltyProgram | null>(null);
  const navigate = useNavigate();

  const handleEdit = (program: LoyaltyProgram) => {
    setSelectedProgram(program);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteLoyaltyProgram(id);
  };

  const handleViewDetails = (id: string) => {
    navigate(`/dashboard/loyaltyPrograms/${id}`);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          mb: 2,
          mt: 3,
        }}
      >
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            Loyalt Programs Management
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid item xs={6} sm={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsFormOpen(true)}
            >
              Create New Program
            </Button>
          </Grid>
        </Grid>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 900 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 900 }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 900 }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 900 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loyaltyPrograms.map((program: LoyaltyProgram) => (
              <TableRow key={program._id}>
                <TableCell>{program.name}</TableCell>
                <TableCell>{program.description}</TableCell>
                <TableCell>{program.type}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(program)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(program._id)}>
                    <DeleteIcon />
                  </IconButton>
                  <Button
                    variant="contained"
                    onClick={() => handleViewDetails(program._id)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isFormOpen && (
        <LoyaltyProgramForm
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          program={selectedProgram}
        />
      )}
    </div>
  );
};

export default LoyaltyProgramList;
