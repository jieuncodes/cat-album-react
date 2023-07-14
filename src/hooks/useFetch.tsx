import { useEffect, useState } from "react";
import { catProps } from "../App";

const API_ROOT =
  "https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/";

export function useFetch(id?: string) {
  const [data, setData] = useState<catProps[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_ROOT}${id ?? ""}`);
        const data = await res.json();
        setData(data);
      } catch (error) {
        setError(error as string);
      }
    };
    fetchData();
  }, [id]);

  return { data, setData, error };
}
