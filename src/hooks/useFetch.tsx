import { useEffect, useState } from "react";
import { catProps } from "../App";
import { fetchNodeData } from "../api";

export function useFetch(id?: string) {
  const [data, setData] = useState<catProps[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchNodeData(id);
        setData(data);
      } catch (error) {
        setError(error as string);
      }
    };
    fetchData();
  }, [id]);

  return { data, setData, error };
}
