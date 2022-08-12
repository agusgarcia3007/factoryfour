import axios from "axios";
import { useEffect, useState } from "react";
import { Response } from "../types";

const useFetch = (endpoints: string[]) => {
  const [data, setData] = useState<Record<string, Response>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Record<string, string | null>>({});

  const fetching = async () => {
    setLoading(true);
    await Promise.all(
      endpoints.map(async (endpoint) => {
        return await axios
          .get(endpoint)
          .then((res) => {
            setData((prev) => ({ ...prev, [endpoint]: res.data }));
          })
          .catch((err) => {
            setError((prev) => ({ ...prev, [endpoint]: err.message }));
          });
      })
    );
    setLoading(false);
  };

  useEffect((): any => {
    let timer: number | null = null;
    const intervalFetch = async () => {
      await fetching();
      timer = window.setTimeout(async () => {
        setError({});
        setData({});
        intervalFetch();
      }, 15000);
    };

    intervalFetch();

    return () => timer !== null && clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { data, error, loading };
};

export default useFetch;
