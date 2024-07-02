import React, { useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import ProductsList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import useProducts from "../hooks/useProducts";
import { Product } from "../types";
import Breadcrumb from "../components/Breadcrumb";

const Products: React.FC = () => {
  const {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    uploadProductFile,
  } = useProducts();

  const [open, setOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddClick = () => {
    setSelectedProduct(null);
    setOpen(true);
  };

  const handleUpload = async (file: File) => {
    await uploadProductFile(file);
  };

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (product: Product) => {
    if (selectedProduct && selectedProduct._id) {
      updateProduct(selectedProduct._id, product);
    } else {
      addProduct(product);
    }
    setOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container maxWidth={false} disableGutters>
      <CssBaseline />
      <Breadcrumb
        title="Products"
        paths={[
          { name: "Dashboard", link: "/dashboard" },
          { name: "Products" },
        ]}
      />

      <ProductsList
        products={products}
        onEdit={handleEditClick}
        onDelete={deleteProduct}
        onUpload={handleUpload}
        onAdd={handleAddClick}
      />
      <ProductForm
        open={open}
        onClose={handleClose}
        onSave={handleSave}
        initialData={selectedProduct}
      />
    </Container>
  );
};

export default Products;
