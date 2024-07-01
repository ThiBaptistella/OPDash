import { useState, useEffect } from "react";
import supplierService from "../services/supplierService";
import { Supplier } from "../types";

const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      setLoading(true);
      try {
        const response = await supplierService.getSuppliers();
        setSuppliers(response.data);
      } catch (error) {
        setError((error as any).message);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const addSupplier = async (supplier: Supplier) => {
    try {
      const response = await supplierService.addSupplier(supplier);
      setSuppliers((prev) => [...prev, response.data]);
    } catch (error) {
      setError((error as any).message);
    }
  };

  const updateSupplier = async (id: string, supplier: Partial<Supplier>) => {
    try {
      const response = await supplierService.updateSupplier(id, supplier);
      setSuppliers((prevSuppliers) =>
        prevSuppliers.map((supplier) =>
          supplier._id === id ? response.data : supplier
        )
      );
    } catch (error) {
      setError((error as any).message);
    }
  };

  const deleteSupplier = async (id: string) => {
    try {
      await supplierService.deleteSupplier(id);
      setSuppliers((prevSuppliers) =>
        prevSuppliers.filter((supplier) => supplier._id !== id)
      );
    } catch (error) {
      setError((error as any).message);
    }
  };

  return {
    suppliers,
    loading,
    error,
    addSupplier,
    updateSupplier,
    deleteSupplier,
  };
};

export default useSuppliers;
