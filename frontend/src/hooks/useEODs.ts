// src/hooks/useEODs.ts
import { useEffect, useState } from "react";
import { EOD } from "../types/EOD";

const useEODs = () => {
  const [eods, setEods] = useState<EOD[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEODs = async () => {
      try {
        const response = await fetch("http://localhost:5002/api/eod/eod");
        if (!response.ok) {
          throw new Error("Failed to fetch EODs");
        }
        const data = await response.json();
        setEods(data);
        setLoading(false);
      } catch (error) {
        setError((error as any).message);
        setLoading(false);
      }
    };

    fetchEODs();
  }, []);

  return { eods, setEods, loading, error };
};

export default useEODs;
