import { useEffect, useState } from "react";

function useFetching(url) {
  const [fetchingData, setFetchingData] = useState({
    data: null,
    errors: [],
  });
  useEffect(() => {
    async function fetchdata() {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to get data");
        const fetchingData = await res.json();
        setFetchingData((prev) => ({ ...prev, data: fetchingData }));
      } catch (error) {
        console.error(error);
        setFetchingData((prev) => ({
          ...prev,
          errors: [...prev.errors, error],
        }));
      }
    }
    fetchdata();
  }, [url]);
  return fetchingData;
}

export default useFetching;
