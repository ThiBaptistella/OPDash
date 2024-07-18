import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Pagination,
  useTheme,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Supplier } from "../types";

interface SuppliersListProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (supplierId: string) => void;
  onAdd: () => void;
}

const SuppliersList: React.FC<SuppliersListProps> = ({
  suppliers,
  onEdit,
  onDelete,
  onAdd,
}) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const rowsPerPage = 10;

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const filteredSuppliers = useMemo(
    () =>
      suppliers.filter((supplier) => {
        const supplierName = supplier.supplierName || "";
        return supplierName.toLowerCase().includes(search.toLowerCase());
      }),
    [search, suppliers]
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          mb: 3,
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          Suppliers List
        </Typography>

        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          size="small"
        />
        <Button variant="contained" color="primary" onClick={onAdd}>
          Add Supplier
        </Button>
      </Box>
      <Paper>
        <TableContainer sx={{ maxHeight: 640 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 900 }}>Supplier Name</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Default Markup</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Contact Info</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSuppliers
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((supplier) => (
                  <TableRow key={supplier._id}>
                    <TableCell>{supplier.supplierName}</TableCell>
                    <TableCell>{supplier.defaultMarkup}%</TableCell>
                    <TableCell>{supplier.description}</TableCell>
                    <TableCell>{`${supplier.firstName} ${supplier.lastName}`}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => onEdit(supplier)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => onDelete(supplier._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="center" mb={2} p={2}>
          <Pagination
            count={Math.ceil(filteredSuppliers.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
      </Paper>
    </>
  );
};

export default SuppliersList;
