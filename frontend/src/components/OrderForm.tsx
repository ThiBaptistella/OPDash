// src/pages/OrderForm.tsx
import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Divider,
  CssBaseline,
  Snackbar,
  IconButton,
  Badge,
} from "@mui/material";
import Breadcrumb from "../components/Breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import useOrders from "../hooks/useOrders";
import useProducts from "../hooks/useProducts";
import useSuppliers from "../hooks/useSuppliers";
import { Order, Product } from "../types";
import theme from "../utils/theme";

const OrderForm: React.FC = () => {
  const { addOrder, updateOrder, orders } = useOrders();
  const { products } = useProducts();
  const { suppliers } = useSuppliers();
  const [order, setOrder] = useState<Order>({
    products: [],
    status: "Pending",
    orderDate: new Date(),
    totalAmount: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState(1);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const PRICE_RANGES = [
    { label: "Below $10", value: "below-10" },
    { label: "$10 - $50", value: "10-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "$100 - $150", value: "100-150" },
    { label: "Above $150", value: "above-150" },
  ];

  useEffect(() => {
    if (id) {
      const orderToEdit = orders.find((order) => order._id === id);
      if (orderToEdit) {
        setOrder(orderToEdit);
        setIsEditing(true);
      }
    }
  }, [id, orders]);

  const handleAddProduct = (product: Product) => {
    setOrder((prevOrder) => {
      const existingProduct = prevOrder.products.find(
        (item) => item.product._id === product._id
      );
      let newProducts;
      if (existingProduct) {
        newProducts = prevOrder.products.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newProducts = [
          ...prevOrder.products,
          { product, quantity: 1, price: product.retailPrice ?? 0 },
        ];
      }
      return {
        ...prevOrder,
        products: newProducts,
      };
    });
    setNotificationOpen(true);
  };

  const handleSubmit = async () => {
    if (isEditing) {
      await updateOrder(order._id!, order);
    } else {
      await addOrder(order);
    }
    navigate("/dashboard/orders");
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) => {
        const productName = product.productName || "";
        return productName.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    if (selectedSuppliers.length > 0) {
      filtered = filtered.filter(
        (product) =>
          product.supplier && selectedSuppliers.includes(product.supplier)
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.productCategory ?? "")
      );
    }

    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((product) => {
        const price = product.retailPrice ?? 0;
        if (selectedPriceRanges.includes("below-10") && price < 10) return true;
        if (selectedPriceRanges.includes("10-50") && price >= 10 && price <= 50)
          return true;
        if (
          selectedPriceRanges.includes("50-100") &&
          price >= 50 &&
          price <= 100
        )
          return true;
        if (
          selectedPriceRanges.includes("100-150") &&
          price >= 100 &&
          price <= 150
        )
          return true;
        if (selectedPriceRanges.includes("above-150") && price > 150)
          return true;
        return false;
      });
    }

    return filtered.slice(0, page * 20);
  }, [
    products,
    selectedSuppliers,
    selectedCategories,
    selectedPriceRanges,
    searchTerm,
    page,
  ]);

  const handleNotificationClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationOpen(false);
  };

  return (
    <Container maxWidth={false} disableGutters>
      <CssBaseline />
      <Breadcrumb
        title="Order Management"
        paths={[
          { name: "Dashboard", link: "/dashboard/orders" },
          { name: "Orders" },
        ]}
      />
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
            {isEditing ? "Edit Order" : "New Order"}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Badge badgeContent={order.products.length} color="primary">
            <ShoppingCartIcon />
          </Badge>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ ml: 2 }}
          >
            {isEditing ? "Update Order" : "Create Order"}
          </Button>
        </Grid>
      </Box>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Typography variant="h6">Filters</Typography>
              <Divider sx={{ my: 1 }} />
              <TextField
                fullWidth
                label="Search by Product Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                margin="normal"
              />
              <Typography variant="subtitle1">Suppliers</Typography>
              <FormGroup>
                {suppliers.map((supplier) => (
                  <FormControlLabel
                    key={supplier._id}
                    control={
                      <Checkbox
                        checked={selectedSuppliers.includes(supplier._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSuppliers([
                              ...selectedSuppliers,
                              supplier._id,
                            ]);
                          } else {
                            setSelectedSuppliers(
                              selectedSuppliers.filter(
                                (id) => id !== supplier._id
                              )
                            );
                          }
                        }}
                      />
                    }
                    label={supplier.supplierName}
                  />
                ))}
              </FormGroup>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle1">Categories</Typography>
              <FormGroup>
                {Array.from(
                  new Set(
                    products.map((product) => product.productCategory ?? "")
                  )
                )
                  .filter(Boolean)
                  .map((category) => (
                    <FormControlLabel
                      key={category}
                      control={
                        <Checkbox
                          checked={selectedCategories.includes(category)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCategories([
                                ...selectedCategories,
                                category,
                              ]);
                            } else {
                              setSelectedCategories(
                                selectedCategories.filter((c) => c !== category)
                              );
                            }
                          }}
                        />
                      }
                      label={category}
                    />
                  ))}
              </FormGroup>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle1">Price Ranges</Typography>
              <FormGroup>
                {PRICE_RANGES.map((range) => (
                  <FormControlLabel
                    key={range.value}
                    control={
                      <Checkbox
                        checked={selectedPriceRanges.includes(range.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPriceRanges([
                              ...selectedPriceRanges,
                              range.value,
                            ]);
                          } else {
                            setSelectedPriceRanges(
                              selectedPriceRanges.filter(
                                (r) => r !== range.value
                              )
                            );
                          }
                        }}
                      />
                    }
                    label={range.label}
                  />
                ))}
              </FormGroup>
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid container spacing={2}>
                {filteredProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                    <Card>
                      <CardMedia>
                        <LazyLoadImage
                          alt={product.productName}
                          height={140}
                          src={product.imageUrl} // Assuming product has an imageUrl property
                          effect="blur"
                        />
                      </CardMedia>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {product.productName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {product.brand}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {product.supplier}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${product.retailPrice}
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<AddShoppingCartIcon />}
                          onClick={() => handleAddProduct(product)}
                          sx={{ mt: 1 }}
                        >
                          Add to Order
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={notificationOpen}
        autoHideDuration={3000}
        onClose={handleNotificationClose}
        message="Product added to order"
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleNotificationClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </Container>
  );
};

export default OrderForm;
