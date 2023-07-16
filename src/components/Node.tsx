import { CatProps } from "../types";

interface NodeProps {
  node: CatProps;
  handleNodeClick: (node: CatProps) => void;
}

const Node = ({ node, handleNodeClick }: NodeProps) => {
  const iconType = (type: string) => {
    if (type === "DIRECTORY") {
      return "./directory.png";
    } else {
      return "./file.png";
    }
  };

  return (
    <div
      className="Node"
      key={node.id}
      data-filepath={node.filePath}
      onClick={() => handleNodeClick(node)}
    >
      <img src={iconType(node.type)} alt={`${node.type.toLowerCase()}-icon`} />
      <div>{node.name}</div>
    </div>
  );
};

export default Node;
