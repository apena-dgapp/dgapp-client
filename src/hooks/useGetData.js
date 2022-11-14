import axios from "axios";
import { useEffect, useState } from "react";

const useGetData = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const getData = async () => {
      await axios
        .get(url, {
          signal: controller.signal,
        })
        .then((res) => {
          setData(res.data)
        })
        .catch((error) => {
          if (error.message !== 'canceled') {
            console.error(error)
          }
        })
    }
    getData()

    return () => {
      controller.abort()
    }
  }, [url]);

  return {
    data
  };
};

export default useGetData;
