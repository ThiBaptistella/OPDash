// src/components/OrderList.tsx
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
  useTheme,
  Button,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useOrders from "../hooks/useOrders";
import { Order } from "../types";
import { useNavigate } from "react-router-dom";

const OrderList: React.FC = () => {
  const { orders, loading, error, deleteOrder } = useOrders();
  const [page, setPage] = useState<number>(1);
  const rowsPerPage = 7;
  const [search, setSearch] = useState<string>("");
  const theme = useTheme();
  const navigate = useNavigate();

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

  const handleAddClick = () => {
    navigate("/dashboard/orders/new");
  };

  const handleEditClick = (order: Order) => {
    navigate(`/dashboard/orders/edit/${order._id}`);
  };

  const handleDeleteClick = (id: string) => {
    deleteOrder(id);
  };

  const filteredOrders = useMemo(
    () =>
      orders.filter((order) => {
        const supplierNames = order.products
          .map((product) => product.product.supplier || "")
          .join(" ");
        return supplierNames.toLowerCase().includes(search.toLowerCase());
      }),
    [search, orders]
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading orders</div>;

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
            Orders Management
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid item xs={6} sm={6} sx={{ mr: 3 }}>
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              value={search}
              onChange={handleSearchChange}
              size="small"
              sx={{ mr: 3 }}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddClick}
              sx={{ mr: 2 }}
            >
              Add Order
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 900 }}>Supplier</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Order Date</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Total Amount</TableCell>
                <TableCell sx={{ fontWeight: 900 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((order) => (
                  <TableRow key={order._id} hover>
                    <TableCell>
                      {order.products
                        .map((product) => product.product.supplier)
                        .join(", ")}
                    </TableCell>
                    <TableCell>
                      {new Date(order.orderDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        style={{
                          color: theme.palette.grey[900],
                        }}
                      />
                    </TableCell>
                    <TableCell>{order.totalAmount}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditClick(order)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(order._id!)}>
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
            count={Math.ceil(filteredOrders.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderList;
