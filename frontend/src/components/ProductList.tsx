// src/components/ProductsList.tsx
import React, { useEffect, useMemo, useState } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Product } from "../types/Product";
import BarcodeReader from "./BarcodeReader"; // Import the BarcodeReader component

interface ProductsListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  onAdd: () => void;
  onUpload: (file: File) => void;
}

const ProductsList: React.FC<ProductsListProps> = ({
  products,
  onEdit,
  onDelete,
  onAdd,
  onUpload,
}) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [search, setSearch] = useState("");
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const theme = useTheme();

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

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const productName = product.productName || "";
        return productName.toLowerCase().includes(search.toLowerCase());
      }),
    [search, products]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onUpload(event.target.files[0]);
    }
  };

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
        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={onAdd}
            sx={{ mr: 2 }}
          >
            Add Product
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsScannerOpen(true)}
            sx={{ mr: 2 }}
          >
            Scan Barcode
          </Button>
          <input
            accept=".xlsx, .xls"
            style={{ display: "none" }}
            id="contained-button-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span">
              Upload Products
            </Button>
          </label>
        </div>
      </Box>
      <Paper>
        <TableContainer sx={{ maxHeight: 640 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 900 }}>Product Name</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Brand</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Supplier</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Barcode</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Created</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product.productName}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>
                      {typeof product.supplier === "object" &&
                      product.supplier !== null
                        ? product.supplier.supplierName
                        : product.supplier}
                    </TableCell>
                    <TableCell>
                      {product.barcode && (
                        <img
                          src={`data:image/png;base64,${product.barcode}`}
                          alt="Barcode"
                          style={{ width: "150px", height: "50px" }}
                        />
                      )}
                    </TableCell>
                    <TableCell>{product.retailPrice}</TableCell>
                    <TableCell>
                      {product.createdAt
                        ? new Date(product.createdAt).toLocaleDateString()
                        : "N/A"}
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
            count={Math.ceil(filteredProducts.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
      </Paper>
      <Dialog
        open={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Scan Barcode</DialogTitle>
        <DialogContent>
          <BarcodeReader onClose={() => setIsScannerOpen(false)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsScannerOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductsList;
