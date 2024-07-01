import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  DialogTitle,
  DialogContent,
  DialogActions,
  styled,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { Supplier } from "../types/Supplier";

interface SupplierFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (supplier: Supplier) => void;
  initialData: Partial<Supplier> | null;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    margin: 0,
    borderRadius: 0,
    maxWidth: "450px",
    maxHeight: "100%",
  },
}));

const SupplierForm: React.FC<SupplierFormProps> = ({
  open,
  onClose,
  onSave,
  initialData,
}) => {
  const [supplier, setSupplier] = useState<Partial<Supplier>>({
    supplierName: "",
    defaultMarkup: 0,
    description: "",
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    mobile: "",
    fax: "",
    website: "",
    twitter: "",
    street: "",
    suburb: "",
    zipCode: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    if (initialData) {
      setSupplier(initialData);
    } else {
      setSupplier({
        supplierName: "",
        defaultMarkup: 0,
        description: "",
        firstName: "",
        lastName: "",
        company: "",
        email: "",
        phone: "",
        mobile: "",
        fax: "",
        website: "",
        twitter: "",
        street: "",
        suburb: "",
        zipCode: "",
        state: "",
        country: "",
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSupplier((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(supplier as Supplier);
  };

  return (
    <BootstrapDialog
      open={open}
      onClose={onClose}
      sx={{
        justifyContent: "flex-end",
        height: "100%",
        outline: "0px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <DialogTitle>
        {initialData ? "Edit Supplier" : "Add Supplier"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Supplier Name"
              name="supplierName"
              value={supplier.supplierName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Default Markup"
              name="defaultMarkup"
              value={supplier.defaultMarkup}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={supplier.description}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="First Name"
              name="firstName"
              value={supplier.firstName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last Name"
              name="lastName"
              value={supplier.lastName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Company"
              name="company"
              value={supplier.company}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={supplier.email}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone"
              name="phone"
              value={supplier.phone}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mobile"
              name="mobile"
              value={supplier.mobile}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Fax"
              name="fax"
              value={supplier.fax}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Website"
              name="website"
              value={supplier.website}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Twitter"
              name="twitter"
              value={supplier.twitter}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Street"
              name="street"
              value={supplier.street}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Suburb"
              name="suburb"
              value={supplier.suburb}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="ZIP Code"
              name="zipCode"
              value={supplier.zipCode}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="State"
              name="state"
              value={supplier.state}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Country"
              name="country"
              value={supplier.country}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default SupplierForm;
