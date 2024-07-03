// src/pages/OrderDetails.tsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Breadcrumb from "../components/Breadcrumb";
import { useParams } from "react-router-dom";
import useOrders from "../hooks/useOrders";
import { Order } from "../types";

const OrderDetails: React.FC = () => {
  const { orders } = useOrders();
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (id) {
      const orderToView = orders.find((order) => order._id === id);
      if (orderToView) {
        setOrder(orderToView);
      }
    }
  }, [id, orders]);

  if (!order) return <div>Loading...</div>;

  return (
    <Container maxWidth={false} disableGutters>
      <Breadcrumb
        title="Order Details"
        paths={[
          { name: "Dashboard", link: "/dashboard/orders" },
          { name: "Orders" },
        ]}
      />
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          Order Details
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1">
            Order Date: {new Date(order.orderDate).toLocaleDateString()}
          </Typography>
          <Typography variant="subtitle1">Status: {order.status}</Typography>
          <Typography variant="subtitle1">
            Total Amount:{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "AUD",
            }).format(order.totalAmount)}
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Products</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 900 }}>Product</TableCell>
                  <TableCell sx={{ fontWeight: 900 }}>Quantity</TableCell>
                  <TableCell sx={{ fontWeight: 900 }}>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.products.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.product.productName}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderDetails;
