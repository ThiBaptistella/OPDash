// src/components/ProductsList.tsx
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
import { Product } from "../types/Product";

interface ProductsListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  onAdd: () => void;
}

const ProductsList: React.FC<ProductsListProps> = ({
  products,
  onEdit,
  onDelete,
  onAdd,
}) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const [items] = useState(products);
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

  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        item.productName.toLowerCase().includes(search.toLowerCase())
      ),
    [search, items]
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
          Products List
        </Typography>

        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          size="small"
        />
        <Button variant="contained" color="primary" onClick={onAdd}>
          Add Product
        </Button>
      </Box>
      <Paper>
        <TableContainer sx={{ maxHeight: 640 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 900 }}>Product Name</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Brand</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Supplier</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Created</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.supplier}</TableCell>
                  <TableCell>{product.retailPrice}</TableCell>
                  <TableCell>
                    {new Date(product.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => onEdit(product)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onDelete(product._id)}>
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
            count={Math.ceil(filteredItems.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
      </Paper>
    </>
  );
};

export default ProductsList;
