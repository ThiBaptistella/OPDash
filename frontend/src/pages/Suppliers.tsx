import React, { useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import SuppliersList from "../components/SuppliersList";
import SupplierForm from "../components/SupplierForm";
import useSuppliers from "../hooks/useSuppliers";
import { Supplier } from "../types";
import Breadcrumb from "../components/Breadcrumb";

const Suppliers: React.FC = () => {
  const {
    suppliers,
    loading,
    error,
    addSupplier,
    updateSupplier,
    deleteSupplier,
  } = useSuppliers();

  const [open, setOpen] = useState<boolean>(false);
  const [selectedSupplier, setSelectedSupplier] =
    useState<Partial<Supplier> | null>(null);

  const handleAddClick = () => {
    setSelectedSupplier(null);
    setOpen(true);
  };

  const handleEditClick = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (supplier: Supplier) => {
    if (selectedSupplier && selectedSupplier._id) {
      updateSupplier(selectedSupplier._id, supplier);
    } else {
      addSupplier(supplier);
    }
    setOpen(false);
    setSelectedSupplier(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container maxWidth={false} disableGutters>
      <CssBaseline />
      <Breadcrumb
        title="Suppliers"
        paths={[
          { name: "Dashboard", link: "/dashboard" },
          { name: "Suppliers" },
        ]}
      />

      <SuppliersList
        suppliers={suppliers}
        onEdit={handleEditClick}
        onDelete={deleteSupplier}
        onAdd={handleAddClick}
      />
      <SupplierForm
        open={open}
        onClose={handleClose}
        onSave={handleSave}
        initialData={selectedSupplier}
      />
    </Container>
  );
};

export default Suppliers;
