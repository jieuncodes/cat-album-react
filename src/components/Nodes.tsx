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
    onDirChange,
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
            data-filepath={node.filePath}
            onClick={() =>
              handleNodeClick({
                id: node.id,
                type: node.type,
                name: node.name,
                filePath: node.filePath,
              })
            }
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
