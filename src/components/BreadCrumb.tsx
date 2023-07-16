import { BreadCrumbProps } from "../types";

export default function BreadCrumb({
  path,
  setPath,
  onDirChange,
}: BreadCrumbProps) {
  const handleBreadCrumbClick = async (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const target = event.currentTarget;
    const id = target.id;

    const clickedIndex = path.findIndex((node) => node.id === id);
    if (clickedIndex === path.length - 1) return;

    setPath(path.slice(0, clickedIndex + 1));
    onDirChange && onDirChange(id);
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
