// src/hooks/useInvoices.ts
import { useState, useEffect } from "react";
import axios from "axios";

export type Status = "Paid" | "Pending" | "Overdue";

export interface Invoice {
  receiptId: string;
  issueDate: string;
  accountName: string;
  accountCity: string;
  paymentDate: string;
  dueDate: string;
  tax: string;
  balance: string;
  status: Status;
}

const useInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get<Invoice[]>(
          "http://localhost:5001/api/invoices/invoices"
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
