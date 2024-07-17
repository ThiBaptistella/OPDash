// src/pages/Sales.tsx
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
  Button,
} from "@mui/material";
import Breadcrumb from "../components/Breadcrumb";
import useSales from "../hooks/useSales";
import { Sale } from "../types";

const Sales: React.FC = () => {
  const theme = useTheme();
  const { sales, importSales } = useSales();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [file, setFile] = useState<File | null>(null);
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
  };

  const handleImportSales = async () => {
    if (!file) return;
    await importSales(file);
  };

  const filteredSales = useMemo(
    () =>
      sales.filter((sale: Sale) =>
        (sale.customerName || "").toLowerCase().includes(search.toLowerCase())
      ),
    [search, sales]
  );
  return (
    <Container maxWidth={false} disableGutters>
      <CssBaseline />
      <Breadcrumb
        title="Sales"
        paths={[{ name: "Dashboard", link: "/dashboard" }, { name: "Sales" }]}
      />
      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Sales</Typography>
              <Typography variant="h4">{sales.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Revenue</Typography>
              <Typography variant="h4">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "AUD",
                }).format(sales.reduce((acc, sale) => acc + sale.total, 0))}
              </Typography>
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
        <Grid item xs={12} sm={12}>
          {" "}
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            Sales List
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <input
            accept=".xlsx, .xls, .csv"
            style={{ display: "none" }}
            id="contained-button-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span" sx={{ mr: 2 }}>
              Import Sales File
            </Button>
          </label>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleImportSales}
            disabled={!file}
          >
            Import Sales
          </Button>
        </Grid>

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
                <TableCell sx={{ fontWeight: 900 }}>Receipt Number</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Customer Name</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Details</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Quantity</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Subtotal</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Sales Tax</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Total</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Sale Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSales
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((sale: Sale) => (
                  <TableRow key={sale._id} hover>
                    <TableCell>{sale.receiptNumber || "Unknown"}</TableCell>
                    <TableCell>{sale.customerName || "Unknown"}</TableCell>
                    <TableCell>{sale.details}</TableCell>
                    <TableCell>{sale.quantity}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "AUD",
                      }).format(sale.subtotal)}
                    </TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "AUD",
                      }).format(sale.salesTax)}
                    </TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "AUD",
                      }).format(sale.total)}
                    </TableCell>
                    <TableCell>
                      {new Date(sale.saleDate).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="center" mb={2} p={2}>
          <Pagination
            count={Math.ceil(filteredSales.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default Sales;
