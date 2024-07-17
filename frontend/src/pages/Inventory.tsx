// src/pages/Inventory.tsx
import React, { useState, useMemo } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  Pagination,
  CssBaseline,
} from "@mui/material";
import Breadcrumb from "../components/Breadcrumb";
import useInventoryItems from "../hooks/useInventoryItems";

const Inventory: React.FC = () => {
  const theme = useTheme();
  const { inventoryItems } = useInventoryItems();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
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
      inventoryItems.filter(
        (item) =>
          (item.product?.productName || "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          (item.product?.productCategory || "")
            .toLowerCase()
            .includes(search.toLowerCase())
      ),
    [search, inventoryItems]
  );

  const totalValue = inventoryItems.reduce(
    (acc, item) => acc + (item.product?.retailPrice || 0) * (item.stock || 0),
    0
  );

  const formattedTotalValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "AUD",
  }).format(totalValue);

  return (
    <Container maxWidth={false} disableGutters>
      <CssBaseline />
      <Breadcrumb
        title="Inventory"
        paths={[
          { name: "Dashboard", link: "/dashboard" },
          { name: "Inventory" },
        ]}
      />
      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Items</Typography>
              <Typography variant="h4">{inventoryItems.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Value</Typography>
              <Typography variant="h4">{formattedTotalValue}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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
          Inventory List
        </Typography>

        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          size="small"
        />
      </Box>

      <Paper>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 900 }}>Product</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Stock</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((item) => (
                  <TableRow key={item._id} hover>
                    <TableCell>
                      {item.product?.productName || "Unknown"}
                    </TableCell>
                    <TableCell>
                      {item.product?.productCategory || "Unknown"}
                    </TableCell>
                    <TableCell>{item.stock}</TableCell>
                    <TableCell>{item.product?.retailPrice || 0}</TableCell>
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
    </Container>
  );
};

export default Inventory;
