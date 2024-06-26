// src/hooks/useInvoices.ts
import { useState, useEffect } from "react";
import invoiceService from "../services/invoiceService";
import { Invoice } from "../types";

const useInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      try {
        const response = await invoiceService.getInvoices();
        setInvoices(response.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const addInvoice = async (file: File) => {
    try {
      const response = await invoiceService.uploadInvoice(file);
      setInvoices((prev) => [...prev, response.data]);
    } catch (error) {
      setError(error as Error);
    }
  };

  const updateInvoice = async (id: string, updatedFields: Partial<Invoice>) => {
    try {
      const response = await invoiceService.updateInvoice(id, updatedFields);
      setInvoices((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice._id === id ? response.data : invoice
        )
      );
    } catch (error) {
      setError(error as Error);
    }
  };

  return { invoices, setInvoices, addInvoice, updateInvoice, loading, error };
};

export default useInvoices;
