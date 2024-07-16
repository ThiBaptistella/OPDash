// src/hooks/useSales.ts
import { useState, useEffect } from "react";
import saleService from "../services/saleService";
import { Sale } from "../types";

const useSales = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSales = async () => {
      setLoading(true);
      try {
        const response = await saleService.getSales();
        setSales(response.data);
      } catch (error) {
        setError((error as any).message);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  const importSales = async (file: File) => {
    try {
      const response = await saleService.importSales(file);
      setSales((prev) => [...prev, response.data]);
    } catch (error) {
      setError((error as any).message);
    }
  };

  return {
    sales,
    loading,
    error,
    importSales,
  };
};

export default useSales;
