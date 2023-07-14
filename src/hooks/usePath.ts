import { useState } from "react";
import { pathProps } from "../types";

export function usePath(initialPath: pathProps[]) {
  const [path, setPath] = useState<pathProps[]>(initialPath);

  const appendToPath = (newPath: pathProps) => {
    setPath((prevPath) => [...prevPath, newPath]);
  };

  const setBackPath = () => {
    setPath((prevPath) => prevPath.slice(0, prevPath.length - 1));
  };

  return { path, setPath, appendToPath, setBackPath };
}
