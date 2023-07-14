import { useEffect, useState } from "react";
import "./App.css";
import BreadCrumb from "./components/BreadCrumb";
import Nodes from "./components/Nodes";
import { useFetch } from "./hooks/useFetch";

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
  const fetchState = useFetch();
  const [isLoading, setIsLoading] = useState(true);
  const [path, setPath] = useState<pathProps[]>([{ id: "-1", name: "root" }]);

  const [cache, setCache] = useState<{ [key: string]: catProps[] }>({});

  useEffect(() => {
    if (fetchState.data || fetchState.error) {
      setIsLoading(false);
    }
  }, [fetchState.data, fetchState.error]);

  const onPathChange = async (id: string) => {
    if (cache[id]) {
      fetchState.setData(cache[id]);
    } else {
      fetchState.setData([]);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="Modal Loading">
          <div className="content">
            <img src="./nyan-cat.gif" />
          </div>
        </div>
      )}
      <BreadCrumb path={path} setPath={setPath} onPathChange={onPathChange} />
      {fetchState.data && (
        <Nodes
          {...fetchState}
          path={path}
          setPath={setPath}
          cache={cache}
          setCache={setCache}
          setLoading={setIsLoading}
        />
      )}
    </>
  );
}
