import { useState, useEffect } from "react";
import productService from "../services/productService";
import { Product } from "../types";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productService.getProducts();
        setProducts(response.data);
      } catch (error) {
        setError((error as any).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = async (product: Product) => {
    try {
      const response = await productService.addProduct(product);
      setProducts((prev) => [...prev, response.data]);
    } catch (error) {
      setError((error as any).message);
    }
  };

  const updateProduct = async (id: string, product: Partial<Product>) => {
    try {
      const response = await productService.updateProduct(id, product);
      setProducts((prevProducts) =>
        prevProducts.map((prod) => (prod._id === id ? response.data : prod))
      );
    } catch (error) {
      setError((error as any).message);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await productService.deleteProduct(id);
      setProducts((prevProducts) =>
        prevProducts.filter((prod) => prod._id !== id)
      );
    } catch (error) {
      setError((error as any).message);
    }
  };

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProducts;
