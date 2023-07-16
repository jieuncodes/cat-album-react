import { useState } from "react";
import { CatProps } from "../types";

export function useCache() {
  const [cache, setCache] = useState<{ [key: string]: CatProps[] }>({});

  const addToCache = (id: string, data: CatProps[]) => {
    setCache((prevCache) => ({ ...prevCache, [id]: data }));
  };

  return { cache, addToCache };
}
