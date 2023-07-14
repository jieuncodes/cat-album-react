import { useState } from "react";
import { catProps, pathProps } from "../App";
import { fetchNodeData } from "../api";
import Modal from "./Modal";

interface NodesProps {
  data: catProps[];
  setData: (data: catProps[]) => void;
  path: pathProps[];
  setPath: (path: pathProps[]) => void;
  cache: { [key: string]: catProps[] };
  setCache: (cache: { [key: string]: catProps[] }) => void;
  setLoading: (loading: boolean) => void;
}

export default function Nodes({
  data,
  setData,
  path,
  setPath,
  cache,
  setCache,
  setLoading,
}: NodesProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalFilePath, setModalFilePath] = useState<string>("");

  const iconType = (type: string) => {
    if (type === "DIRECTORY") {
      return "./directory.png";
    } else {
      return "./file.png";
    }
  };

  const handleNodeClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    console.log("target", target);

    const id = target.id;
    const type = target.dataset.type as string;

    let newData;
    if (cache[id]) {
      newData = cache[id];
    } else {
      try {
        setLoading(true);
        newData = await fetchNodeData(id);
        setCache({ ...cache, [id]: newData });
      } catch (error) {
        console.log("error");
      } finally {
        setLoading(false);
      }
    }

    setData(newData);

    if (type === "DIRECTORY") {
      setPath([...path, { id, name: target.dataset.name as string }]);
    } else if (type === "FILE") {
      const filePath = target.dataset.filepath as string;
      setModalFilePath(filePath);
      setModalVisible(true);
    } else {
      return;
    }
  };

  const handleGoBack = async () => {
    const id = path[path.length - 2].id;
    setLoading(true);
    const newData = await fetchNodeData(id);
    setData(newData);
    setPath(path.slice(0, path.length - 1));
  };

  return (
    <>
      {modalVisible && (
        <Modal filePath={modalFilePath} setModalVisible={setModalVisible} />
      )}
      <div className="Nodes">
        {path.length > 1 && (
          <div className="Node" onClick={handleGoBack}>
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
            onClick={handleNodeClick}
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
