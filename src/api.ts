export const fetchData = async (id?: string) => {
  try {
    const res = await fetch(
      `https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/${
        id ? (id === "-1" ? "" : id) : ""
      }`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error");
  }
};
