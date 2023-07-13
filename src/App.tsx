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
  const [loading, setLoading] = useState<boolean>(true);
  const [cache, setCache] = useState<{ [key: string]: catProps[] }>({});

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const data = await fetchData();
        setData(data);
      } catch (error) {
        console.log("error!!");
      } finally {
        setLoading(false);
      }
    };
    fetchNodes();
  }, []);

  return (
    <>
      {loading && (
        <div className="Modal Loading">
          <div className="content">
            <img src="./nyan-cat.gif" />
          </div>
        </div>
      )}
      <BreadCrumb path={path} setPath={setPath} setData={setData} />
      {data && (
        <Nodes
          data={data}
          setData={setData}
          path={path}
          setPath={setPath}
          cache={cache}
          setCache={setCache}
          setLoading={setLoading}
        />
      )}
    </>
  );
}

export default App;
