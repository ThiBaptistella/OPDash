// src/pages/Invoices.tsx
import React, { useState, useMemo } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Typography,
  TextField,
  Box,
  Grid,
  Chip,
  Card,
  CardContent,
  CssBaseline,
  useTheme,
  Checkbox,
  Button,
} from "@mui/material";
import Breadcrumb from "../components/Breadcrumb"; // Adjust the path as necessary
import ChartCard from "../components/charts/ChartCard"; // Adjust the path as necessary
import useInvoices, { Invoice, Status } from "../hooks/useInvoices";

const Invoices: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const rowsPerPage = 10;
  const theme = useTheme();
  const { invoices, setInvoices, loading, error } = useInvoices();

  const determineOriginalStatus = (invoice: Invoice): Status => {
    const dueDate = new Date(invoice.dueDate);
    const currentDate = new Date();
    return currentDate > dueDate ? "Overdue" : "Pending";
  };

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
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleAddInvoice = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://localhost:5002/api/invoices/uploadInvoices",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to upload invoice");
      }
      const data = await response.json();
      setInvoices((prev) => [...prev, data]); // Update invoices list
    } catch (error) {
      console.error("Error uploading file:", error);
      // Display error message to user
      alert("Failed to upload and process invoice. Please try again.");
    }
  };

  const filteredInvoices = useMemo(
    () =>
      invoices.filter(
        (invoice) =>
          invoice.accountName.toLowerCase().includes(search.toLowerCase()) ||
          invoice.receiptId.includes(search)
      ),
    [search, invoices]
  );

  const getStatusColor = (status: Status) => {
    switch (status) {
      case "Overdue":
        return theme.palette.error.main;
      case "Paid":
        return theme.palette.success.main;
      case "Pending":
        return theme.palette.warning.main;
      default:
        return theme.palette.secondary.main;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading invoices</div>;

  return (
    <Container maxWidth={false} disableGutters>
      <CssBaseline />
      <Breadcrumb
        title="Invoice Management"
        paths={[
          { name: "Dashboard", link: "/dashboard" },
          { name: "Invoices" },
        ]}
      />

      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} sm={3}>
          <ChartCard
            title="Total Invoices"
            subtitle="10% Profit"
            amount={`$${invoices.reduce(
              (sum, invoice) =>
                sum + parseFloat(invoice.balance.replace("$", "")),
              0
            )}`}
            chartData={[100, 200, 300]}
            status=""
            color="#8e44ad" // Your desired color
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <ChartCard
            title="Paid"
            subtitle="15% Profit"
            amount={`$${invoices
              .filter((invoice) => invoice.status === "Paid")
              .reduce(
                (sum, invoice) =>
                  sum + parseFloat(invoice.balance.replace("$", "")),
                0
              )}`}
            chartData={[50, 100, 150]}
            status="Paid"
            color="#27ae60" // Your desired color
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <ChartCard
            title="Pending"
            subtitle="5% Loss"
            amount={`$${invoices
              .filter((invoice) => invoice.status === "Pending")
              .reduce(
                (sum, invoice) =>
                  sum + parseFloat(invoice.balance.replace("$", "")),
                0
              )}`}
            chartData={[30, 60, 90]}
            status="Pending"
            color="#f1c40f" // Your desired color
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <ChartCard
            title="Overdue"
            subtitle="8% Loss"
            amount={`$${invoices
              .filter((invoice) => invoice.status === "Overdue")
              .reduce(
                (sum, invoice) =>
                  sum + parseFloat(invoice.balance.replace("$", "")),
                0
              )}`}
            chartData={[20, 40, 60]}
            status="Overdue"
            color="#e74c3c" // Your desired color
          />
        </Grid>
      </Grid>

      <Card elevation={0} sx={{ boxShadow: "none" }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={3}>
              <Typography
                variant="h6"
                component="div"
                color={theme.palette.grey[900]}
                sx={{ fontWeight: "bold" }}
              >
                List
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={search}
                onChange={handleSearchChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <input
                accept="application/pdf"
                style={{ display: "none" }}
                id="contained-button-file"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  sx={{ mr: 2 }}
                >
                  Upload Invoice
                </Button>
              </label>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAddInvoice}
                disabled={!file}
              >
                Add Invoice
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: "none" }}>
        <TableContainer sx={{ maxHeight: 640 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 900 }}>Receipt ID</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Issue Date</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Account Name</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Date of Payment</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Due Date</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Tax</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Balance</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredInvoices
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((invoice) => (
                  <TableRow key={invoice.receiptId} hover>
                    <TableCell>{invoice.receiptId}</TableCell>
                    <TableCell>{invoice.issueDate}</TableCell>
                    <TableCell>{invoice.accountName}</TableCell>
                    <TableCell>{invoice.paymentDate}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell>{invoice.tax}</TableCell>
                    <TableCell>{invoice.balance}</TableCell>
                    <TableCell>
                      <Chip
                        label={invoice.status}
                        style={{
                          backgroundColor: `${getStatusColor(
                            invoice.status
                          )}22`,
                          border: `1px solid ${getStatusColor(
                            invoice.status
                          )}40`,
                          color: theme.palette.grey[900],
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={invoice.status === "Paid"}
                        onChange={() => {
                          setInvoices((prevInvoices) =>
                            prevInvoices.map((inv) =>
                              inv.receiptId === invoice.receiptId
                                ? {
                                    ...inv,
                                    status:
                                      inv.status === "Paid"
                                        ? determineOriginalStatus(inv)
                                        : "Paid",
                                  }
                                : inv
                            )
                          );
                        }}
                        sx={{
                          color: theme.palette.primary.dark,
                          "&.Mui-checked": {
                            color: theme.palette.primary.dark,
                          },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="center" my={2}>
          <Pagination
            count={Math.ceil(filteredInvoices.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default Invoices;
