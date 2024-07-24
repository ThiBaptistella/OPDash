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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useLoyaltyPrograms from "../hooks/useLoyaltyPrograms";
import LoyaltyProgramForm from "./LoyaltyProgramForm";
import { LoyaltyProgram } from "../types/LoyaltyProgram";
import { useNavigate } from "react-router-dom";

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
    navigate(`/dashboard/marketing/loyaltyPrograms/${id}`);
  };

  console.log("loyaltyPrograms", loyaltyPrograms);

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsFormOpen(true)}
      >
        Create New Program
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
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
