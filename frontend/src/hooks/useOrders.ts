// src/hooks/useOrders.ts
import { useState, useEffect } from "react";
import orderService from "../services/orderService";
import { Order } from "../types";

const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getOrders();
        setOrders(response.data);
      } catch (error) {
        setError((error as any).message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const addOrder = async (order: Order) => {
    try {
      const response = await orderService.addOrder(order);
      setOrders((prev) => [...prev, response.data]);
    } catch (error) {
      setError((error as any).message);
    }
  };

  const updateOrder = async (id: string, order: Partial<Order>) => {
    try {
      const response = await orderService.updateOrder(id, order);
      setOrders((prevOrders) =>
        prevOrders.map((ord) => (ord._id === id ? response.data : ord))
      );
    } catch (error) {
      setError((error as any).message);
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      await orderService.deleteOrder(id);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
    } catch (error) {
      setError((error as any).message);
    }
  };

  return { orders, loading, error, addOrder, updateOrder, deleteOrder };
};

export default useOrders;
