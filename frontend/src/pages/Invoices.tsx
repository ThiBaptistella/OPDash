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
  Tab,
  CssBaseline,
  useTheme,
  Checkbox,
  Button,
} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import Breadcrumb from "../components/Breadcrumb";
import ChartCard from "../components/charts/ChartCard";
import useInvoices, { Invoice, Status } from "../hooks/useInvoices";
import { TabContext, TabList } from "@mui/lab";
import EODComponent from "../components/EOD";

const Invoices: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [tab, setTab] = React.useState("1");
  const [search, setSearch] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const rowsPerPage = 10;
  const theme = useTheme();
  const { invoices, setInvoices, loading, error } = useInvoices();

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

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
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

  const handleUpdateInvoice = async (
    id: string,
    updatedFields: Partial<Invoice>
  ) => {
    try {
      const response = await fetch(
        `http://localhost:5002/api/invoices/invoices/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFields),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update invoice");
      }
      const updatedInvoice = await response.json();
      setInvoices((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice._id === id ? updatedInvoice : invoice
        )
      );
    } catch (error) {
      console.error("Error updating invoice:", error);
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
            subtitle="Uall."
            amount={`$${invoices.reduce(
              (sum, invoice) =>
                sum + parseFloat(invoice.balance.replace("$", "")),
              0
            )}`}
            chartData={[100, 200, 300]}
            status=""
            color="#5e35b121"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <ChartCard
            title="Paid"
            subtitle="Fuck yeah!!"
            amount={`$${invoices
              .filter((invoice) => invoice.status === "Paid")
              .reduce(
                (sum, invoice) =>
                  sum + parseFloat(invoice.balance.replace("$", "")),
                0
              )}`}
            chartData={[50, 100, 50, 150]}
            status="Paid"
            color="#2dc76e30"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <ChartCard
            title="Pending"
            subtitle="We are good."
            amount={`$${invoices
              .filter((invoice) => invoice.status === "Pending")
              .reduce(
                (sum, invoice) =>
                  sum + parseFloat(invoice.balance.replace("$", "")),
                0
              )}`}
            chartData={[30, 60, 100, 200, 150]}
            status="Pending"
            color="#f1c40f29"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <ChartCard
            title="Overdue"
            subtitle="Pay me."
            amount={`$${invoices
              .filter((invoice) => invoice.status === "Overdue")
              .reduce(
                (sum, invoice) =>
                  sum + parseFloat(invoice.balance.replace("$", "")),
                0
              )}`}
            chartData={[20, 40, 60, 10, 5, 2]}
            status="Overdue"
            color="#e74c3c26" // Your desired color
          />
        </Grid>
      </Grid>

      <Box sx={{ width: "100%" }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleTabChange}
              aria-label="lab API tabs example"
            >
              <Tab label="Invoices" value="1" />
              <Tab label="EOD" value="2" />
              <Tab label="Item Three" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ borderBottom: 1, padding: 0 }}>
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
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  Invoices Tracker
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  label="Search"
                  variant="outlined"
                  fullWidth
                  value={search}
                  onChange={handleSearchChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
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
            </Box>
            <Paper
              sx={{ width: "100%", overflow: "hidden", boxShadow: "none" }}
            >
              <TableContainer sx={{ maxHeight: 640 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 900 }}>Receipt ID</TableCell>
                      <TableCell sx={{ fontWeight: 900 }}>Issue Date</TableCell>
                      <TableCell sx={{ fontWeight: 900 }}>
                        Account Name
                      </TableCell>
                      <TableCell sx={{ fontWeight: 900 }}>
                        Date of Payment
                      </TableCell>
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
                        <TableRow key={invoice._id} hover>
                          <TableCell>
                            {editingId === invoice._id &&
                            editingField === "receiptId" ? (
                              <TextField
                                size="small"
                                value={invoice.receiptId}
                                onChange={(e) =>
                                  handleUpdateInvoice(invoice._id, {
                                    receiptId: e.target.value,
                                  })
                                }
                                onBlur={() => {
                                  setEditingId(null);
                                  setEditingField(null);
                                }}
                                autoFocus
                              />
                            ) : (
                              <span
                                onClick={() => {
                                  setEditingId(invoice._id);
                                  setEditingField("receiptId");
                                }}
                              >
                                {invoice.receiptId}
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            {editingId === invoice._id &&
                            editingField === "issueDate" ? (
                              <TextField
                                size="small"
                                value={invoice.issueDate}
                                onChange={(e) =>
                                  handleUpdateInvoice(invoice._id, {
                                    issueDate: e.target.value,
                                  })
                                }
                                onBlur={() => {
                                  setEditingId(null);
                                  setEditingField(null);
                                }}
                                autoFocus
                              />
                            ) : (
                              <span
                                onClick={() => {
                                  setEditingId(invoice._id);
                                  setEditingField("issueDate");
                                }}
                              >
                                {invoice.issueDate}
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            {editingId === invoice._id &&
                            editingField === "accountName" ? (
                              <TextField
                                size="small"
                                value={invoice.accountName}
                                onChange={(e) =>
                                  handleUpdateInvoice(invoice._id, {
                                    accountName: e.target.value,
                                  })
                                }
                                onBlur={() => {
                                  setEditingId(null);
                                  setEditingField(null);
                                }}
                                autoFocus
                              />
                            ) : (
                              <span
                                onClick={() => {
                                  setEditingId(invoice._id);
                                  setEditingField("accountName");
                                }}
                              >
                                {invoice.accountName}
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            {editingId === invoice._id &&
                            editingField === "paymentDate" ? (
                              <TextField
                                size="small"
                                value={invoice.paymentDate}
                                onChange={(e) =>
                                  handleUpdateInvoice(invoice._id, {
                                    paymentDate: e.target.value,
                                  })
                                }
                                onBlur={() => {
                                  setEditingId(null);
                                  setEditingField(null);
                                }}
                                autoFocus
                              />
                            ) : (
                              <span
                                onClick={() => {
                                  setEditingId(invoice._id);
                                  setEditingField("paymentDate");
                                }}
                              >
                                {invoice.paymentDate}
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            {editingId === invoice._id &&
                            editingField === "dueDate" ? (
                              <TextField
                                size="small"
                                value={invoice.dueDate}
                                onChange={(e) =>
                                  handleUpdateInvoice(invoice._id, {
                                    dueDate: e.target.value,
                                  })
                                }
                                onBlur={() => {
                                  setEditingId(null);
                                  setEditingField(null);
                                }}
                                autoFocus
                              />
                            ) : (
                              <span
                                onClick={() => {
                                  setEditingId(invoice._id);
                                  setEditingField("dueDate");
                                }}
                              >
                                {invoice.dueDate}
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            {editingId === invoice._id &&
                            editingField === "tax" ? (
                              <TextField
                                size="small"
                                value={invoice.tax}
                                onChange={(e) =>
                                  handleUpdateInvoice(invoice._id, {
                                    tax: e.target.value,
                                  })
                                }
                                onBlur={() => {
                                  setEditingId(null);
                                  setEditingField(null);
                                }}
                                autoFocus
                              />
                            ) : (
                              <span
                                onClick={() => {
                                  setEditingId(invoice._id);
                                  setEditingField("tax");
                                }}
                              >
                                {invoice.tax}
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            {editingId === invoice._id &&
                            editingField === "balance" ? (
                              <TextField
                                size="small"
                                value={invoice.balance}
                                onChange={(e) =>
                                  handleUpdateInvoice(invoice._id, {
                                    balance: e.target.value,
                                  })
                                }
                                onBlur={() => {
                                  setEditingId(null);
                                  setEditingField(null);
                                }}
                                autoFocus
                              />
                            ) : (
                              <span
                                onClick={() => {
                                  setEditingId(invoice._id);
                                  setEditingField("balance");
                                }}
                              >
                                {invoice.balance}
                              </span>
                            )}
                          </TableCell>
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
                                    inv._id === invoice._id
                                      ? {
                                          ...inv,
                                          status:
                                            inv.status === "Paid"
                                              ? "Pending"
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
          </TabPanel>
          <TabPanel value="2" sx={{ borderBottom: 1, padding: 0 }}>
            <EODComponent />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};

export default Invoices;
