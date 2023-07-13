import { catProps, pathProps } from "../App";
import { fetchData } from "../api";

interface BreadCrumbProps {
  path: pathProps[];
  setPath: (path: pathProps[]) => void;
  setData: (data: catProps[]) => void;
}

export default function BreadCrumb({
  path,
  setPath,
  setData,
}: BreadCrumbProps) {
  const handleBreadCrumbClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const id = target.id;
    const newData = await fetchData(id);
    setData(newData);

    setPath(path.slice(0, path.findIndex((node) => node.id === id) + 1));
  };
  return (
    <nav className="Breadcrumb">
      {path.map((node) => (
        <div key={node.id} id={node.id} onClick={handleBreadCrumbClick}>
          {node.name}
        </div>
      ))}
    </nav>
  );
}
