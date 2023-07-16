import { useEffect, useRef, useState } from "react";
import "./App.css";
import BreadCrumb from "./components/BreadCrumb";
import Nodes from "./components/Nodes";
import { useFetch } from "./hooks/useFetch";
import { useCache } from "./hooks/useCache";
import { fetchNodeData } from "./api";
import { usePath } from "./hooks/usePath";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchState = useFetch();
  const pathState = usePath([{ id: "-1", name: "root" }]);
  const cacheState = useCache();

  const { data, setData, error } = fetchState;
  const { cache, addToCache } = cacheState;

  const onDirChange = async (id: string) => {
    let cachedData = cache[id];
    if (cachedData) {
      setData(cachedData);
    } else {
      setIsLoading(true);
      const newData = await fetchNodeData(id);
      setData(newData);
      addToCache(id, newData);
    }
  };

  useEffect(() => {
    if (data.length || error) {
      setIsLoading(false);
    }
  }, [data, error]);

  return (
    <>
      {isLoading && (
        <div className="Modal Loading">
          <div className="content">
            <img src="./nyan-cat.gif" />
          </div>
        </div>
      )}
      <BreadCrumb {...pathState} onDirChange={onDirChange} />

      {data && (
        <Nodes
          setIsLoading={setIsLoading}
          onDirChange={onDirChange}
          {...fetchState}
          {...pathState}
          {...cacheState}
        />
      )}
    </>
  );
}

export default App;
