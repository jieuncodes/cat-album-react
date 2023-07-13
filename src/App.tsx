import React, { useEffect, useState } from "react";
import "./App.css";
import { fetchData } from "./api";
import Nodes from "./components/Nodes";
import BreadCrumb from "./components/BreadCrumb";

export interface catProps {
  id: string;
  name: string;
  type: string;
  filePath: string;
  parent: string;
}

export interface pathProps {
  id: string;
  name: string;
}

function App() {
  const [data, setData] = useState<catProps[] | undefined>();
  const [path, setPath] = useState<pathProps[]>([{ id: "-1", name: "root" }]);

  useEffect(() => {
    const fetchNodes = async () => {
      const data = await fetchData();
      setData(data);
    };
    fetchNodes();
  }, []);

  return (
    <>
      <BreadCrumb path={path} setPath={setPath} setData={setData} />
      {data && (
        <Nodes data={data} setData={setData} path={path} setPath={setPath} />
      )}
    </>
  );
}

export default App;
