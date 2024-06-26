// src/hooks/useEODs.ts
import { useEffect, useState } from "react";
import eodService from "../services/eodService";
import { EOD } from "../types/EOD";

const useEODs = () => {
  const [eods, setEods] = useState<EOD[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEODs = async () => {
      try {
        const response = await eodService.getEODs();
        setEods(response.data);
      } catch (error) {
        setError((error as any).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEODs();
  }, []);

  const addEOD = async (file: File) => {
    try {
      const response = await eodService.uploadEOD(file);
      setEods((prev) => [...prev, response.data]);
    } catch (error) {
      setError((error as any).message);
    }
  };

  const updateEOD = async (id: string, updatedFields: Partial<EOD>) => {
    try {
      const response = await eodService.updateEOD(id, updatedFields);
      setEods((prevEODs) =>
        prevEODs.map((eod) => (eod._id === id ? response.data : eod))
      );
    } catch (error) {
      setError((error as any).message);
    }
  };

  return { eods, setEods, addEOD, updateEOD, loading, error };
};

export default useEODs;
