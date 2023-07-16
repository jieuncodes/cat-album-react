import { useState } from "react";
import { NodeInteractionProps, PathProps, CatProps } from "../types";

export const useNodeInteraction = ({
  appendToPath,
  setBackPath,
  onDirChange,
}: NodeInteractionProps) => {
  const [modalFilePath, setModalFilePath] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleNodeClick = ({ id, type, name, filePath }: CatProps) => {
    if (type === "DIRECTORY") {
      appendToPath({ id, name });
      onDirChange(id);
    } else if (type === "FILE") {
      setModalFilePath(filePath);
      setModalVisible(true);
    }
  };

  const handleGoBack = (path: PathProps[]) => async () => {
    const id = path[path.length - 2].id;
    onDirChange(id);
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
