import { useState } from "react";
import { PathProps } from "../types";

export function usePath(initialPath: PathProps[]) {
  const [path, setPath] = useState<PathProps[]>(initialPath);

  const appendToPath = (newPath: PathProps) => {
    setPath((prevPath) => [...prevPath, newPath]);
  };

  const setBackPath = () => {
    setPath((prevPath) => prevPath.slice(0, prevPath.length - 1));
  };

  return { path, setPath, appendToPath, setBackPath };
}
