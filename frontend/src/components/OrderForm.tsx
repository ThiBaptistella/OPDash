import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
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
import ProductDetailModal from "../components/ProductDetailModal";
import Cart from "../components/Cart";
import Placeholder from "../assets/whey.png";
import Checkout from "../pages/Checkout";

const OrderForm: React.FC = () => {
  const { addOrder, updateOrder, orders } = useOrders();
  const { products } = useProducts();
  const { suppliers } = useSuppliers();
  const [order, setOrder] = useState<Order>({
    products: [],
    status: "Pending",
    orderDate: new Date(),
    totalAmount: 0,
    supplier: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState(1);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [showMoreSuppliers, setShowMoreSuppliers] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [checkout, setCheckout] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const PRICE_RANGES = [
    { label: "Below $10", value: "below-10" },
    { label: "10 - $50", value: "10-50" },
    { label: "50 - $100", value: "50-100" },
    { label: "100 - $150", value: "100-150" },
    { label: "Above $150", value: "above-150" },
  ];

  useEffect(() => {
    if (id) {
      const orderToEdit = orders.find((order) => order._id === id);
      if (orderToEdit) {
        setOrder(orderToEdit);
        setIsEditing(true);
        setCartItems(
          orderToEdit.products.map((p) => ({
            product: p.product,
            quantity: p.quantity,
            selectedVariants: {}, // Adjust as per your variant logic
          }))
        );
      }
    }
  }, [id, orders]);

  useEffect(() => {
    const totalAmount = cartItems.reduce(
      (total, item) => total + item.product.retailPrice * item.quantity,
      0
    );
    setOrder((prevOrder) => ({
      ...prevOrder,
      totalAmount,
    }));
  }, [cartItems]);

  const handleAddProduct = (product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product._id === product._id
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      }

      return [
        ...prevItems,
        {
          product,
          quantity,
          selectedVariants: {}, // Adjust as per your variant logic
        },
      ];
    });

    setNotificationOpen(true);
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) => (i === index ? { ...item, quantity } : item))
    );
  };

  const handleCheckout = () => {
    setCheckout(true);
  };

  const handlePlaceOrder = async () => {
    if (isEditing) {
      await updateOrder(order._id!, {
        ...order,
        products: cartItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.retailPrice,
        })),
      });
    } else {
      await addOrder({
        ...order,
        products: cartItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.retailPrice,
        })),
      });
    }
    navigate("/dashboard/orders");
  };

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) => {
        const productName = product.productName || "";
        return productName.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    if (selectedSuppliers.length > 0) {
      filtered = filtered.filter((product) => {
        const supplierId =
          typeof product.supplier === "string"
            ? product.supplier
            : product.supplier?._id;
        return selectedSuppliers.includes(supplierId ?? "");
      });
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

  const loadMoreProducts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleOpenProductDetail = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductDetail = () => {
    setSelectedProduct(null);
  };

  if (checkout) {
    return <Checkout cartItems={cartItems} onPlaceOrder={handlePlaceOrder} />;
  }

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
        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={6}
            sm={6}
            sx={{
              mr: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Badge
              badgeContent={cartItems.length}
              color="primary"
              sx={{
                mr: 3,
              }}
            >
              <ShoppingCartIcon />
            </Badge>
            <Typography variant="h6">
              Balance:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "AUD",
              }).format(order.totalAmount)}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} sx={{ mr: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
            >
              {isEditing ? "Update Order" : "Checkout"}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} md={2}>
              <Typography variant="h6">Filters</Typography>
              <Divider sx={{ my: 1 }} />
              <TextField
                fullWidth
                label="Search by Product Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                margin="normal"
              />
              <Typography variant="h6">Suppliers</Typography>
              <FormGroup>
                {suppliers
                  .slice(0, showMoreSuppliers ? suppliers.length : 5)
                  .map((supplier) => (
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
              {suppliers.length > 5 && (
                <Button
                  variant="text"
                  onClick={() => setShowMoreSuppliers((prev) => !prev)}
                >
                  {showMoreSuppliers ? "Show Less" : "Show More"}
                </Button>
              )}
              <Divider sx={{ my: 1 }} />
              <Typography variant="h6">Categories</Typography>
              <FormGroup>
                {Array.from(
                  new Set(
                    products.map((product) => product.productCategory ?? "")
                  )
                )
                  .filter(Boolean)
                  .slice(0, showMoreCategories ? undefined : 5)
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
              {products.filter((product) => product.productCategory).length >
                5 && (
                <Button
                  variant="text"
                  onClick={() => setShowMoreCategories((prev) => !prev)}
                >
                  {showMoreCategories ? "Show Less" : "Show More"}
                </Button>
              )}
              <Divider sx={{ my: 1 }} />
              <Typography variant="h6">Price Ranges</Typography>
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
            <Grid item xs={12} md={10}>
              <Grid container spacing={2}>
                {filteredProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                    <Card
                      sx={{
                        minHeight: 325,
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "column",
                      }}
                    >
                      <CardMedia>
                        <LazyLoadImage
                          alt={product.productName}
                          height={140}
                          width={"100%"}
                          src={
                            product.imageUrl ? product.imageUrl : Placeholder
                          }
                          effect="blur"
                          onClick={() => handleOpenProductDetail(product)}
                          style={{ cursor: "pointer" }}
                        />
                      </CardMedia>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {product.productName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {typeof product.supplier === "string"
                            ? product.supplier
                            : product.supplier?.supplierName || ""}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${product.retailPrice}
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<AddShoppingCartIcon />}
                          onClick={() => handleOpenProductDetail(product)}
                          sx={{ mt: 1 }}
                        >
                          Add to Order
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="text" onClick={loadMoreProducts}>
                  Load More
                </Button>
              </Box>
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
      <ProductDetailModal
        open={!!selectedProduct}
        onClose={handleCloseProductDetail}
        product={selectedProduct}
        onAddProduct={handleAddProduct}
      />
    </Container>
  );
};

export default OrderForm;
