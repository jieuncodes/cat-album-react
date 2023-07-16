export interface CatProps {
  id: string;
  name: string;
  type: string;
  filePath: string;
  parent: string;
}

export interface PathProps {
  id: string;
  name: string;
}

export interface CacheProps {
  cache: { [key: string]: CatProps[] };
  addToCache: (id: string, data: CatProps[]) => void;
}

export interface DataProps {
  data: CatProps[];
  setData: (data: CatProps[]) => void;
}

export interface LoadingProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export interface FetchProps {
  setData: DataProps["setData"];
  setIsLoading: LoadingProps["setIsLoading"];
}

export interface NodeInteractionProps {
  appendToPath: (path: PathProps) => void;
  setBackPath: () => void;
  onDirChange?: (id: string) => void;
}

export interface NodesProps extends NodeInteractionProps, FetchProps {
  path: PathProps[];
  data: CatProps[];
}

export interface BreadCrumbProps extends NodeInteractionProps {
  path: PathProps[];
}
