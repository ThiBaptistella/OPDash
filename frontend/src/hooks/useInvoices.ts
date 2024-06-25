// src/hooks/useInvoices.ts
import { useState, useEffect } from "react";
import axios from "axios";
import { Invoice } from "../types";

const useInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get<Invoice[]>(
          "http://localhost:5002/api/invoices/invoices"
        );
        setInvoices(response.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  return { invoices, setInvoices, loading, error };
};

export default useInvoices;
