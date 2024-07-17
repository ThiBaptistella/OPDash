import { useState, useEffect } from "react";
import inventoryService from "../services/inventoryService";
import { InventoryItem } from "../types";

const useInventoryItems = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventoryItems = async () => {
      setLoading(true);
      try {
        const response = await inventoryService.getInventoryItems();
        setInventoryItems(response.data);
      } catch (error) {
        setError((error as any).message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryItems();
  }, []);

  const addInventoryItem = async (item: InventoryItem) => {
    try {
      const response = await inventoryService.addInventoryItem(item);
      setInventoryItems((prev) => [...prev, response.data]);
    } catch (error) {
      setError((error as any).message);
    }
  };

  const updateInventoryItem = async (
    id: string,
    item: Partial<InventoryItem>
  ) => {
    try {
      const response = await inventoryService.updateInventoryItem(id, item);
      setInventoryItems((prevItems) =>
        prevItems.map((invItem) =>
          invItem._id === id ? response.data : invItem
        )
      );
    } catch (error) {
      setError((error as any).message);
    }
  };

  const deleteInventoryItem = async (id: string) => {
    try {
      await inventoryService.deleteInventoryItem(id);
      setInventoryItems((prevItems) =>
        prevItems.filter((invItem) => invItem._id !== id)
      );
    } catch (error) {
      setError((error as any).message);
    }
  };

  return {
    inventoryItems,
    loading,
    error,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
  };
};

export default useInventoryItems;
