import { useEffect, useState } from "react";
import "../App.css";
import BreadCrumb from "./BreadCrumb";
import Nodes from "./Nodes";
import { useFetch } from "../hooks/useFetch";
import { useCache } from "../hooks/useCache";
import { fetchNodeData } from "../api";
import { usePath } from "../hooks/usePath";

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
      setData(await fetchNodeData(id));
    }
  };

  useEffect(() => {
    const currentPathId = pathState.path[pathState.path.length - 1].id;
    if (data.length) {
      if (!cache[currentPathId]) {
        addToCache(currentPathId, data);
      }
    }
    if ((data && currentPathId in cache) || error) {
      setIsLoading(false);
    }
  }, [data, error, cache]);

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
