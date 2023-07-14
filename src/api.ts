const API_ROOT =
  "https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/";

export const fetchNodeData = async (id?: string) => {
  const response = await fetch(`${API_ROOT}${id ?? ""}`);
  const data = await response.json();
  return data;
};
