import Modal from "./Modal";
import { NodesProps } from "../types";
import { useNodeInteraction } from "../hooks/useNodeInteractions";
import Node from "./Node";

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
          <Node key={node.id} node={node} handleNodeClick={handleNodeClick} />
        ))}
      </div>
    </>
  );
}
