import React, { useState } from "react";
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
  const { eods, addEOD, updateEOD, loading, error } = useEODs();
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
    await updateEOD(id, updatedFields);
  };

  const handleUploadEODs = async () => {
    if (!file) return;
    await addEOD(file);
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
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            EOD Management
          </Typography>
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
                <TableCell sx={{ fontWeight: 900 }}>Register</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Opened</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Closed</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Gift Card Amount</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Cash Amount</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>
                  Eftpos / New Afterpay Amount
                </TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {eods
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((eod) => (
                  <TableRow key={eod._id}>
                    <TableCell>
                      {editingId === eod._id && editingField === "register" ? (
                        <TextField
                          size="small"
                          value={eod.register}
                          onChange={(e) =>
                            handleUpdateEOD(eod._id, {
                              register: e.target.value,
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
                            setEditingField("register");
                          }}
                        >
                          {eod.register}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === eod._id && editingField === "opened" ? (
                        <TextField
                          size="small"
                          value={new Date(eod.opened).toLocaleString()}
                          onChange={(e) =>
                            handleUpdateEOD(eod._id, {
                              opened: new Date(e.target.value),
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
                            setEditingField("opened");
                          }}
                        >
                          {new Date(eod.opened).toLocaleString()}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === eod._id && editingField === "closed" ? (
                        <TextField
                          size="small"
                          value={new Date(eod.closed).toLocaleString()}
                          onChange={(e) =>
                            handleUpdateEOD(eod._id, {
                              closed: new Date(e.target.value),
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
                            setEditingField("closed");
                          }}
                        >
                          {new Date(eod.closed).toLocaleString()}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === eod._id &&
                      editingField === "giftCardAmount" ? (
                        <TextField
                          size="small"
                          value={eod.giftCardAmount}
                          onChange={(e) =>
                            handleUpdateEOD(eod._id, {
                              giftCardAmount: parseFloat(e.target.value),
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
                            setEditingField("giftCardAmount");
                          }}
                        >
                          {eod.giftCardAmount}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === eod._id &&
                      editingField === "cashAmount" ? (
                        <TextField
                          size="small"
                          value={eod.cashAmount}
                          onChange={(e) =>
                            handleUpdateEOD(eod._id, {
                              cashAmount: parseFloat(e.target.value),
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
                            setEditingField("cashAmount");
                          }}
                        >
                          {eod.cashAmount}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === eod._id &&
                      editingField === "eftposNewAfterpayAmount" ? (
                        <TextField
                          size="small"
                          value={eod.eftposNewAfterpayAmount}
                          onChange={(e) =>
                            handleUpdateEOD(eod._id, {
                              eftposNewAfterpayAmount: parseFloat(
                                e.target.value
                              ),
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
                            setEditingField("eftposNewAfterpayAmount");
                          }}
                        >
                          {eod.eftposNewAfterpayAmount}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === eod._id && editingField === "total" ? (
                        <TextField
                          size="small"
                          value={eod.total}
                          onChange={(e) =>
                            handleUpdateEOD(eod._id, {
                              total: parseFloat(e.target.value),
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
                            setEditingField("total");
                          }}
                        >
                          {eod.total}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="center" mb={2} p={2}>
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
