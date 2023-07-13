import { catProps, pathProps } from "../App";
import { fetchData } from "../api";

type nodeId = string;

interface NodesProps {
  data: catProps[];
  setData: (data: catProps[]) => void;
  path: pathProps[];
  setPath: (path: pathProps[]) => void;
}
export default function Nodes({ data, setData, path, setPath }: NodesProps) {
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
    const newData = await fetchData(id);
    console.log("newd", newData);
    setData(newData);

    setPath([...path, { id, name: target.dataset.name as string }]);
    console.log("path", path);
  };
  const handleGoBack = async () => {
    const id = path[path.length - 1].id;
    const newData = await fetchData(id);
    setData(newData);
    setPath(path.slice(0, path.length - 1));
  };
  return (
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
  );
}
