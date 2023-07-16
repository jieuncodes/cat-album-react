import { useState } from "react";
import { fetchNodeData } from "../api";
import {
  NodeInteractionProps,
  PathProps,
  DataProps,
  LoadingProps,
  FetchProps,
} from "../types";

export const useNodeInteraction = ({
  appendToPath,
  setBackPath,
  setIsLoading,
  setData,
}: NodeInteractionProps & FetchProps) => {
  const [modalFilePath, setModalFilePath] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleNodeClick =
    (onDirChange: (id: string) => void) =>
    (event: React.MouseEvent<HTMLDivElement>) => {
      const target = event.currentTarget;
      const id = target.id;
      const type = target.dataset.type as string;

      if (type === "DIRECTORY") {
        appendToPath({ id, name: target.dataset.name as string });
        onDirChange(id);
      } else if (type === "FILE") {
        setModalFilePath(target.dataset.filepath as string);
        setModalVisible(true);
      }
    };

  const fetchAndSetData = async (id: string) => {
    setIsLoading(true);
    const newData = await fetchNodeData(id);
    setData(newData);
    setIsLoading(false);
  };

  const handleGoBack = (path: PathProps[]) => async () => {
    const id = path[path.length - 2].id;
    await fetchAndSetData(id);
    setBackPath();
  };

  return {
    handleNodeClick,
    handleGoBack,
    modalFilePath,
    modalVisible,
    setModalVisible,
  };
};
