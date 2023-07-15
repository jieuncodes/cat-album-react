import { useState } from "react";
import { fetchNodeData } from "../api";
import { catProps, pathProps } from "../types";

export interface NodeInteractionProps {
  appendToPath: (newpath: pathProps) => void;
  setBackPath: () => void;
  setLoading: (loading: boolean) => void;
  setData: (data: catProps[]) => void;
}

export const useNodeInteraction = ({
  appendToPath,
  setBackPath,
  setLoading,
  setData,
}: NodeInteractionProps) => {
  const [modalFilePath, setModalFilePath] = useState<string>("");

  // made higher-order function to create closure
  const handleNodeClick =
    (onDirChange: (id: string) => void) =>
    (event: React.MouseEvent<HTMLDivElement>) => {
      const target = event.currentTarget;
      const id = target.id;
      const type = target.dataset.type as string;

      onDirChange(id);

      if (type === "DIRECTORY") {
        appendToPath({ id, name: target.dataset.name as string });
      } else if (type === "FILE") {
        setModalFilePath(target.dataset.filepath as string);
      } else {
        return;
      }
    };

  const fetchAndSetData = async (id: string) => {
    setLoading(true);
    const newData = await fetchNodeData(id);
    setData(newData);
  };

  const handleGoBack = (path: pathProps[]) => async () => {
    const id = path[path.length - 2].id;
    await fetchAndSetData(id);
    setBackPath();
  };

  return { handleNodeClick, handleGoBack, modalFilePath };
};
