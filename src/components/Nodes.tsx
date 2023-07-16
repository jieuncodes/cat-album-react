import Modal from "./Modal";
import { NodesProps } from "../types";
import { useNodeInteraction } from "../hooks/useNodeInteractions";

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
  setIsLoading,
  path,
  appendToPath,
  setBackPath,
  onDirChange,
}: NodesProps) {
  const {
    handleNodeClick,
    handleGoBack,
    modalFilePath,
    modalVisible,
    setModalVisible,
  } = useNodeInteraction({
    appendToPath,
    setBackPath,
    setIsLoading,
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
            className="Node"
            key={node.id}
            id={node.id}
            data-name={node.name}
            data-type={node.type}
            data-filepath={node.filePath}
            onClick={onDirChange && handleNodeClick(onDirChange)}
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
