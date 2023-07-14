import { useState } from "react";
import { catProps } from "../types";

export function useCache() {
  const [cache, setCache] = useState<{ [key: string]: catProps[] }>({});

  const addToCache = (id: string, data: catProps[]) => {
    setCache((prevCache) => ({ ...prevCache, [id]: data }));
  };

  return { cache, addToCache };
}
