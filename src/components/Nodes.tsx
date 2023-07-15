import { useState } from "react";
import Modal from "./Modal";
import { catProps, pathProps } from "../types";
import { useNodeInteraction } from "../hooks/useNodeInteractions";

interface NodesProps {
  data: catProps[];
  setData: (data: catProps[]) => void;
  path: pathProps[];
  appendToPath: (newpath: pathProps) => void;
  setBackPath: () => void;
  cache: { [key: string]: catProps[] };
  addToCache: (id: string, data: catProps[]) => void;
  setLoading: (loading: boolean) => void;
  onDirChange: (id: string) => void;
}

const iconType = (type: string) => {
  if (type === "DIRECTORY") {
    return "./directory.png";
  } else {
    return "./file.png";
  }
};

export default function Nodes({
  data,
  setData,
  path,
  appendToPath,
  setBackPath,
  setLoading,
  onDirChange,
}: NodesProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const { handleNodeClick, handleGoBack, modalFilePath } = useNodeInteraction({
    appendToPath,
    setBackPath,
    setLoading,
    setData,
  });

  return (
    <>
      {modalVisible && (
        <Modal filePath={modalFilePath} setModalVisible={setModalVisible} />
      )}
      <div className="Nodes">
        {path.length > 1 && (
          <div className="Node" onClick={handleGoBack(path)}>
            <img src="./prev.png" alt="prev-icon" />
          </div>
        )}
        {data?.map((node) => (
          <div
            key={node.id}
            id={node.id}
            data-name={node.name}
            data-type={node.type}
            data-filepath={node.filePath}
            className="Node"
            onClick={handleNodeClick(onDirChange)}
          >
            <img
              src={iconType(node.type)}
              alt={`${node.type.toLowerCase()}-icon`}
            />
            <div>{node.name}</div>
          </div>
        ))}
      </div>
    </>
  );
}
