import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Box,
  Grid,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  Pagination,
} from "@mui/material";
import useEODs from "../hooks/useEODs";
import { EOD } from "../types/EOD";

const EODComponent: React.FC = () => {
  const { eods, setEods, loading, error } = useEODs();
  const [page, setPage] = useState<number>(1);
  const rowsPerPage = 7;
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const theme = useTheme();

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpdateEOD = async (id: string, updatedFields: Partial<EOD>) => {
    try {
      const response = await fetch(`http://localhost:5002/api/eod/eod/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });
      const updatedEOD = await response.json();
      setEods((prev) => prev.map((eod) => (eod._id === id ? updatedEOD : eod)));
    } catch (error) {
      console.error("Error updating EOD:", error);
    }
  };

  const handleUploadEODs = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5002/api/eod/uploadEod", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to upload EOD file");
      }
      const data = await response.json();
      setEods((prev) => [...prev, ...data]);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload and process EOD file. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading EOD entries</div>;

  return (
    <Container maxWidth={false} disableGutters>
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
          <Typography variant="h4">EOD Management</Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <input
            accept=".xlsx, .xls"
            style={{ display: "none" }}
            id="contained-button-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span" sx={{ mr: 2 }}>
              Upload EOD File
            </Button>
          </label>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleUploadEODs}
            disabled={!file}
          >
            Upload EOD
          </Button>
        </Grid>
      </Box>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Opening Till Amount</TableCell>
                <TableCell>Closing Till Amount</TableCell>
                <TableCell>Cash Takings Amount</TableCell>
                <TableCell>EFTPOS/Afterpay</TableCell>
                <TableCell>Staff</TableCell>
                <TableCell>Date Banked</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {eods
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((eod) => (
                  <TableRow key={eod._id}>
                    <TableCell>
                      {editingId === eod._id && editingField === "date" ? (
                        <TextField
                          size="small"
                          value={eod.date}
                          onChange={(e) =>
                            handleUpdateEOD(eod._id, { date: e.target.value })
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
                            setEditingId(eod._id);
                            setEditingField("date");
                          }}
                        >
                          {eod.date}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === eod._id &&
                      editingField === "openingTillAmount" ? (
                        <TextField
                          size="small"
                          value={eod.openingTillAmount}
                          onChange={(e) =>
                            handleUpdateEOD(eod._id, {
                              openingTillAmount: parseFloat(e.target.value),
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
                            setEditingId(eod._id);
                            setEditingField("openingTillAmount");
                          }}
                        >
                          {eod.openingTillAmount}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === eod._id &&
                      editingField === "closingTillAmount" ? (
                        <TextField
                          size="small"
                          value={eod.closingTillAmount}
                          onChange={(e) =>
                            handleUpdateEOD(eod._id, {
                              closingTillAmount: parseFloat(e.target.value),
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
                            setEditingId(eod._id);
                            setEditingField("closingTillAmount");
                          }}
                        >
                          {eod.closingTillAmount}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === eod._id &&
                      editingField === "cashTakingsAmount" ? (
                        <TextField
                          size="small"
                          value={eod.cashTakingsAmount}
                          onChange={(e) =>
                            handleUpdateEOD(eod._id, {
                              cashTakingsAmount: parseFloat(e.target.value),
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
                            setEditingId(eod._id);
                            setEditingField("cashTakingsAmount");
                          }}
                        >
                          {eod.cashTakingsAmount}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === eod._id &&
                      editingField === "eftposAfterpay" ? (
                        <TextField
                          size="small"
                          value={eod.eftposAfterpay}
                          onChange={(e) =>
                            handleUpdateEOD(eod._id, {
                              eftposAfterpay: parseFloat(e.target.value),
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
                            setEditingId(eod._id);
                            setEditingField("eftposAfterpay");
                          }}
                        >
                          {eod.eftposAfterpay}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === eod._id && editingField === "staff" ? (
                        <TextField
                          size="small"
                          value={eod.staff}
                          onChange={(e) =>
                            handleUpdateEOD(eod._id, { staff: e.target.value })
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
                            setEditingId(eod._id);
                            setEditingField("staff");
                          }}
                        >
                          {eod.staff}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === eod._id &&
                      editingField === "dateBanked" ? (
                        <TextField
                          size="small"
                          value={eod.dateBanked}
                          onChange={(e) =>
                            handleUpdateEOD(eod._id, {
                              dateBanked: e.target.value,
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
                            setEditingId(eod._id);
                            setEditingField("dateBanked");
                          }}
                        >
                          {eod.dateBanked}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="center" my={2}>
          <Pagination
            count={Math.ceil(eods.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default EODComponent;
